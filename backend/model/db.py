import mysql.connector

def get_db_connection():
    return mysql.connector.connect(
        user="root",
        password="root_pw",
        host="database", # localhost database
        port=3306,
        database="MovieRentalDB"
    )
