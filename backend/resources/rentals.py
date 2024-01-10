from flask import jsonify, request
from flask_restful import Resource, reqparse
from model.db import get_db_connection

class RentalsResource(Resource):
    # 取得使用者的所有借閱
    def get(self):
        connection = get_db_connection()
        cursor = connection.cursor(dictionary=True)

        customer_id = request.args.get('customer_id', type=str)
        rental_state = request.args.get('rental_state', type=str)
        if customer_id is None:
            return {'error': 'Customer ID is required in query parameter'}, 400
        # if rental_state is None:
        #     return {'error': 'Rental State is required in query parameter'}, 400

        try:
            if(rental_state == "history"):
                cursor.execute("""
                    SELECT * 
                    FROM Rentals LEFT JOIN Movies 
                    ON Rentals.MovieID = Movies.MovieID 
                    WHERE Rentals.CustomerID = %s AND NOT Rentals.RentalStatus='Borrowing'"""
                    , (customer_id, )
                )
            else:
                cursor.execute("""
                    SELECT * 
                    FROM Rentals LEFT JOIN Movies 
                    ON Rentals.MovieID = Movies.MovieID 
                    WHERE Rentals.CustomerID = %s AND Rentals.RentalStatus='Borrowing'"""
                    , (customer_id, )
                )
            data = cursor.fetchall()
            print(data)
            return jsonify(data)
        except Exception as e:
            return {'error': f"Error get rentals: {e}"}, 500
        finally:
            cursor.close()
            connection.close()
        
    # 新增借閱
    def post(self):
        connection = get_db_connection()
        cursor = connection.cursor(dictionary=True)
        
        parser = reqparse.RequestParser()
        parser.add_argument('customer_id', type=str, required=True, help='customer_id cannot be blank')
        parser.add_argument('movie_id', type=str, required=True, help='movie_id cannot be blank')
        parser.add_argument('rental_date', type=str, required=True, help='rental_date cannot be blank')
        parser.add_argument('return_date', type=str, required=True, help='return_date cannot be blank')
        parser.add_argument('rental_status', type=str, required=True, help='rental_status cannot be blank')
        args = parser.parse_args()
        
        try:
            cursor.execute("""
                SELECT MovieID, RentalDate, RentalStatus 
                FROM Rentals 
                WHERE CustomerID=%s AND MovieID=%s AND RentalStatus='Borrowing'
            """, (args['customer_id'], args['movie_id']))
            rentaled_data = cursor.fetchall()
            if rentaled_data:
                connection.commit()
                return {'error': f"Error rentaling movies: Borrowing"}, 409
            
            cursor.execute("""
                INSERT INTO Rentals (CustomerID, MovieID, RentalDate, ReturnDate, RentalStatus)
                VALUES (%s, %s, %s, %s, %s)
            """, (args['customer_id'], args['movie_id'], args['rental_date'], args['return_date'], args['rental_status']))
            connection.commit()
            
            return {'message': 'Add Rental Successfully'}
        
        except Exception as e:
            return {'error': f"Error rentaling movies: {e}"}, 500
        finally:
            cursor.close()
            connection.close()
    
    # 修改借閱
    def put(self):
        connection = get_db_connection()
        cursor = connection.cursor(dictionary=True)
        
        parser = reqparse.RequestParser()
        parser.add_argument('rental_id', type=str, required=True, help='rental_id cannot be blank')
        parser.add_argument('return_date', type=str, required=False, help='return_date cannot be blank')
        parser.add_argument('rental_status', type=str, required=False, help='rental_status cannot be blank')
        
        args = parser.parse_args()
        
        try:
            cursor.execute("""
                UPDATE Rentals 
                SET ReturnDate=%s, RentalStatus=%s 
                WHERE RentalID=%s
            """, (args['return_date'], args['rental_status'], args['rental_id']))
            connection.commit()
            
            return {'message': 'Update Rental Successfully'}
        
        except Exception as e:
            return {'error': f"Error update movie: {e}"}, 500
        finally:
            cursor.close()
            connection.close()
    
    # 刪除借閱
    def delete(self):
        connection = get_db_connection()
        cursor = connection.cursor(dictionary=True)
        
        parser = reqparse.RequestParser()
        parser.add_argument('customer_id', type=str, required=True, help='NickName cannot be blank')
        parser.add_argument('movie_id', type=str, required=True, help='movie_id cannot be blank')
        args = parser.parse_args()
        
        try:
            cursor.execute("""
                DELETE FROM Rentals WHERE CustomerID = %s
            """, (args['customer_id'],))
            connection.commit()
            
            return {'message': 'Delete Rental Successfully'}
        
        except Exception as e:
            return {'error': f"Error delete movie: {e}"}, 500
        finally:
            cursor.close()
            connection.close()
