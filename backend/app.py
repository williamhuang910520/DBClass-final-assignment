from flask import Flask
from flask_restful import Api
from flask_cors import CORS
from flask.json.provider import DefaultJSONProvider
from datetime import datetime, date

from resources.movies import MoviesResource, MovieResource
from resources.customers import CustomersRegisterResource, CustomerResource, CustomerLoginResource
from resources.rentals import RentalsResource

class CustomJSONEncoder(DefaultJSONProvider):
    def default(self, obj):
        if isinstance(obj, datetime) or isinstance(obj, date):
            return obj.strftime('%Y-%m-%d')
        return super().default(obj)
        

app = Flask(__name__)
app.json = CustomJSONEncoder(app)
cors = CORS(app, resources={r"/api/*": {"origins": "*"}})
api = Api(app)


api.add_resource(MoviesResource, '/api/movies')
api.add_resource(MovieResource, '/api/movie', '/api/movie/')

api.add_resource(CustomersRegisterResource, '/api/customer/register')
api.add_resource(CustomerLoginResource, '/api/customer/login')
api.add_resource(CustomerResource, '/api/customer', '/api/customer/')

api.add_resource(RentalsResource, '/api/rental', '/api/rental/')


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
