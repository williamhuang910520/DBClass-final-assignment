import axios from 'axios'

const API_ROOT = 'http://127.0.0.1:5000';

const createApi = (baseURL) => {
  const instance = axios.create({
    baseURL,
  });

  const get = (url) => {
    return instance.get(url)
      .then(response => response.data);
  };

  const post = (url, data) => {
    return instance.post(url, data)
      .then(response => response.data);
  };
  
  const put = (url, data) => {
    return instance.put(url, data)
      .then(response => response.data);
  };

  const del = (url) => {
    return instance.delete(url)
      .then(response => response.data);
  };

  return {
    get,
    post,
    del,
    put,
  };
};

const api = createApi(API_ROOT);

export const movieAPI = {
  getAllMovies: () => 
    api.get('api/movies'), 
      

  getMovieByID: () =>
    api.get('api/movie'), 

  addMovie: (movieInfo) => {
    const data = {
      "title": movieInfo.title,
      "genre": movieInfo.genre,
      "actor": movieInfo.actor,
      "release_date": movieInfo.release_date,
      "rental_price": movieInfo.rental_price,
      "cover_url": movieInfo.cover_url,
      "discription": movieInfo.discription
    }
    return api.post('api/movie', data)
  },
    
  updateMovie: () =>
    api.put('api/movie'), 
      
  deleteMovie: () =>
    api.post('api/movie'), 
}

export const customerAPI = {
  registCustomer: (loginName, loginPassword) => {
    const data = {
      "login_name": loginName,
      "password": loginPassword
    }
    return api.post('api/customer/register', data)
  },
   
  loginCustomer: (loginName, loginPassword) => {
    const data = {
      "login_name": loginName,
      "password": loginPassword
    }
    return api.post('api/customer/login', data)
  },

  getCustomerByID: (customerID) => {
    return api.get('api/customer/?customer_id=' + customerID)
  },
    
  updateCustomer: () =>
    api.put('api/customer/'), 
      
  deleteCustomer: () =>
    api.del('api/customer/'), 
}

export const rentalAPI = {
  getRental: (customerID, isHistory) => {
    if(isHistory)
      return api.get('api/rental/?customer_id=' + customerID + '&rental_state=history')
    else
      return api.get('api/rental/?customer_id=' + customerID)
  },
      
  addRental: () => 
    api.post('api/rental/'), 
    
  updateRental: (rentalID, returnDate, rentalStatus) => {
    const data = {
      "rental_id": rentalID, 
      "return_date": returnDate, 
      "rental_status": rentalStatus 
  }
    return api.put('api/rental/', data)
  },
      
  deleteRental: () =>
    api.del('api/rental/'), 
}

