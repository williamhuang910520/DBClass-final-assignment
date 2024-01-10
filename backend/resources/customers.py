from flask import jsonify, request
from flask_restful import Resource, reqparse
from mysql.connector.errors import IntegrityError
from model.db import get_db_connection
import bcrypt

class CustomersRegisterResource(Resource):
    # 註冊新顧客
    def post(self):
        connection = get_db_connection()
        cursor = connection.cursor(dictionary=True)
        
        parser = reqparse.RequestParser()
        parser.add_argument('login_name', type=str, required=True, help='LoginName cannot be blank')
        parser.add_argument('password', type=str, required=True, help='Password cannot be blank')
        parser.add_argument('nick_name', type=str, required=False, help='NickName')

        args = parser.parse_args()

        # 密碼加密和鹽值生成的邏輯需要根據實際情況進行實作
        # 這裡僅為示例，實際應用中需要使用安全的加密方法
        salt = bcrypt.gensalt()
        password_hash = bcrypt.hashpw(args['password'].encode('utf-8'), salt)


        try:
            cursor.execute("""
                INSERT INTO Customers (LoginName, PasswordHash, PasswordSalt, NickName)
                VALUES (%s, %s, %s, %s)
            """, (args['login_name'], password_hash, salt, args['nick_name']))

            connection.commit()
            cursor.execute("SELECT * FROM Customers WHERE LoginName = %s", (args['login_name'],))
            user_data = cursor.fetchone()
            return {'message': 'Customer registered successfully', 'user data': user_data}
        except IntegrityError as e:
            return {'error': f"Error registering customer: {e}"}, 400
        except Exception as e:
            return {'error': f"Error registering customer: {e}"}, 500
        finally:
            cursor.close()
            connection.close()

class CustomerResource(Resource):
    # 取得特定顧客資訊
    def get(self):
        connection = get_db_connection()
        cursor = connection.cursor(dictionary=True)
        
        customer_id = request.args.get('customer_id', type=str)
        if customer_id is None:
            return {'error': 'Customer ID is required in query parameter'}, 400
        
        # parser = reqparse.RequestParser()
        # parser.add_argument('customer_id', type=str, required=True, help='NickName cannot be blank')
        # args = parser.parse_args()
        
        try:
            cursor.execute("SELECT NickName, MembershipLevel, About, Avatar FROM Customers WHERE CustomerID = %s", (customer_id, ))
            customer = cursor.fetchone()
            cursor.close()
            if customer:
                return customer
            else:
                return {'error': 'Customer not found'}, 404
        except Exception as e:
            return {'error': f"Error getting customer: {e}"}, 500
        finally:
            cursor.close()
            connection.close()
            
            
    # 修改特定顧客資訊
    def put(self):
        connection = get_db_connection()
        cursor = connection.cursor(dictionary=True)
        
        parser = reqparse.RequestParser()
        parser.add_argument('customer_id', type=str, required=True, help='NickName cannot be blank')
        parser.add_argument('nick_name', type=str, required=True, help='NickName cannot be blank')
        parser.add_argument('about', type=str, required=False, help='About can be blank')
        args = parser.parse_args()

        try:
            cursor.execute("SELECT * FROM Customers WHERE CustomerID = %s", (args['customer_id'],))
            customer = cursor.fetchone()
            if customer == None:
                return {'error': 'Customer not found'}, 404
        
            cursor.execute("""
                UPDATE Customers
                SET NickName=%s, About=%s
                WHERE CustomerID=%s
            """, (args['nick_name'], args['about'], args['customer_id']))

            connection.commit()
            return {'message': 'Customer information updated successfully'}
        except Exception as e:
            return {'error': f"Error retrieving movie: {e}"}, 500
        finally:
            cursor.close()
            connection.close()

    def delete(self):
        # 刪除特定顧客
        connection = get_db_connection()
        cursor = connection.cursor(dictionary=True)
        
        parser = reqparse.RequestParser()
        parser.add_argument('customer_id', type=str, required=True, help='NickName cannot be blank')

        args = parser.parse_args()
        
        try:
            cursor.execute("DELETE FROM Customers WHERE CustomerID = %s", (args['customer_id'],))
            connection.commit()
            return {'message': 'Customer deleted successfully'}
        except Exception as e:
            return {'error': f"Error delete customer: {e}"}, 500
        finally:
            cursor.close()
            connection.close()
            
class CustomerLoginResource(Resource):
    def post(self):
        connection = get_db_connection()
        cursor = connection.cursor(dictionary=True)
        
        def verify_password(password, salt, hashed_password):
            input_password_hashed = bcrypt.hashpw(password.encode('utf-8'), bytes(salt, 'utf-8'))
            return input_password_hashed == hashed_password.encode('utf-8')

        parser = reqparse.RequestParser()
        parser.add_argument('login_name', type=str, required=True, help='LoginName cannot be blank')
        parser.add_argument('password', type=str, required=True, help='Password cannot be blank')

        args = parser.parse_args()

        try:
            cursor.execute("SELECT * FROM Customers WHERE LoginName = %s", (args['login_name'],))
            user_data = cursor.fetchone()
            if user_data and verify_password(args['password'], user_data['PasswordSalt'], user_data['PasswordHash']):
                return {'message': 'Login successful', 'user data': user_data}
            else:
                return {'error': 'Invalid login credentials'}, 401
        except Exception as e:
            return {'error': f"Error registering customer: {e}"}, 500
        finally:
            cursor.close()
            connection.close()