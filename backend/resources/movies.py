from flask import jsonify, request
from flask_restful import Resource, reqparse
from model.db import get_db_connection

class MoviesResource(Resource):
    # 取得所有影片資料
    def get(self):
        connection = get_db_connection()
        cursor = connection.cursor(dictionary=True)
        try:
            cursor.execute("SELECT * FROM Movies")
            movies_data = cursor.fetchall()
            print(movies_data)
            return jsonify(movies_data)
        except Exception as e:
            return {'error': f"Error retrieving movies: {e}"}, 500
        finally:
            cursor.close()
            connection.close()




class MovieResource(Resource):
    
    # 查詢單一影片
    def get(self):
        connection = get_db_connection()
        cursor = connection.cursor(dictionary=True)
        
        movie_id = request.args.get('movie_id', type=str)
        if movie_id is None:
            return {'error': 'Movie ID is required in query parameter'}, 400

        try:
            print(movie_id)
            cursor.execute("SELECT * FROM Movies WHERE MovieID = %s", (movie_id,))
            movie = cursor.fetchone()
            if movie:
                return jsonify(movie)
            else:
                return {'error': 'Movie not found'}, 404
        except Exception as e:
            return {'error': f"Error retrieving movie: {e}"}, 500
        finally:
            cursor.close()
            connection.close()
            
            
    
    # 新增影片
    def post(self):
        connection = get_db_connection()
        cursor = connection.cursor(dictionary=True)
        
        parser = reqparse.RequestParser()
        parser.add_argument('title', type=str, required=True, help='Title cannot be blank')
        parser.add_argument('genre', type=str, required=False, help='Genre cannot be blank')
        parser.add_argument('actor', type=str, required=False, help='Actor cannot be blank')
        parser.add_argument('release_date', type=str, required=True, help='Release date cannot be blank')
        parser.add_argument('rental_price', type=float, required=True, help='Rental price cannot be blank')
        parser.add_argument('cover_url', type=str, required=True, help='Cover url cannot be blank')
        parser.add_argument('discription', type=str, required=True, help='Discription cannot be blank')
        args = parser.parse_args()

        try:
            cursor.execute(
                "INSERT INTO Movies (Title, Genre, Actor, ReleaseDate, RentalPrice, CoverUrl, Discription) VALUES (%s, %s, %s, %s, %s, %s, %s)",
                (args['title'], args['genre'], args['actor'], args['release_date'], args['rental_price'], args['cover_url'], args['discription'])
            )
            connection.commit()

            return {'message': 'Movie information added successfully'}
        except Exception as e:
            return {'error': f"Error adding movie: {e}"}, 500
        finally:
            cursor.close()
            connection.close()


    # 更新影片
    def put(self):
        connection = get_db_connection()
        cursor = connection.cursor(dictionary=True)
        
        movie_id = request.args.get('movie_id', type=str)
        if movie_id is None:
            return {'error': 'Movie ID is required in query parameter'}, 400
        
        parser = reqparse.RequestParser()
        parser.add_argument('title', type=str, required=True, help='Title cannot be blank')
        parser.add_argument('genre', type=str, required=True, help='Genre cannot be blank')
        parser.add_argument('actor', type=str, required=True, help='Actor cannot be blank')
        parser.add_argument('release_date', type=str, required=True, help='Release date cannot be blank')
        parser.add_argument('rental_price', type=float, required=True, help='Rental price cannot be blank')
        parser.add_argument('cover_url', type=str, required=True, help='Cover Url cannot be blank')
        parser.add_argument('discription', type=str, required=True, help='Discription cannot be blank')
        args = parser.parse_args()

        try:
            cursor.execute("""
                UPDATE Movies 
                SET Title=%s, Genre=%s, Actor=%s, ReleaseDate=%s, RentalPrice=%s, CoverUrl=%s, Discription=%s 
                WHERE MovieID=%s
            """,
                (args['title'], args['genre'], args['actor'], args['release_date'], args['rental_price'], args['cover_url'], args['discription'], movie_id)
            )
            connection.commit()
            return {'message': 'Movie updated successfully'}, 200
        except Exception as e:
            return {'error': f"Error updating movie: {e}"}, 500
        finally:
            cursor.close()
            connection.close()


    # 刪除影片
    def delete(self):
        connection = get_db_connection()
        cursor = connection.cursor(dictionary=True)
        
        movie_id = request.args.get('movie_id', type=str)
        if movie_id is None:
            return {'error': 'Movie ID is required in query parameter'}, 400

        try:
            cursor.execute("DELETE FROM Movies WHERE MovieID = %s", (movie_id,))
            connection.commit()
            return {'message': 'Movie deleted successfully'}, 200
        except Exception as e:
            return {'error': f"Error deleting movie: {e}"}, 500
        finally:
            cursor.close()
            connection.close()

