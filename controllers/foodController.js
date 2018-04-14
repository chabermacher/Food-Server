const axios = require("axios");
const db = require("../models");

// Defining methods for the nytController

// findAll searches the NYT API and returns only the entries we haven't already saved
module.exports = {
  getRestaurants: function(req, res) {
    const yelpAxios = axios.create();
    yelpAxios.defaults.headers.common['Authorization'] = 'Bearer 09d3ziJRW5ic9ScQvqSN0MjMb1TSKT_CaDvuKMjfSOEQWaFrzaD5AjuUVtU84zYUavtgTmxBOF6tm-uM1n_gANMrmPohgLn7LbcrC9iQiGqOP7O6PXwENG-7hHw0WnYx';
    const params = Object.assign(
      { 
        latitude: '30.214619', 
        longitude: '-97.7683972'
      },
      req.query
    );
    yelpAxios
      .get("https://api.yelp.com/v3/businesses/search", {
        params
      })
      .then(response => {
        res.json(response.data);
      });
  },
  
  getRestaurantById: function(req, res) {
    let restaurantId = req.params.id;

    // Make a call to the db to grab all the info for the restaurant with that ID

    // Then:
    let responseObject = {
      id: req.params.id,
      message: `Here is the info for restaurant with id ${restaurantId}`
    };

    res.json(responseObject);
  },

  storeLike: function(req, res) {
    let restaurantId = req.params.id;
    // make a call to the db to mark the "liked" or "swiped" (or whatever field is storing the "liked" status)
    // of the restaurants from 0 to 1

    // Then:
    let responseObject = {
      id: req.params.id,
      message: `You have 'liked' restaurant with id ${restaurantId}`
    };

    res.json(responseObject);
  },

  getAllLikedRestaurants: function(req, res) {
    // make a call to the db to retrieve all the user's restaurants with "liked" values of 1

    // Then, return the data
    
    let responseObject = {
      id: req.params.id,
      message: `Here are all of your liked restaurants`
    };

    res.json(responseObject);

  },

  findAll: function(req, res) {
    const params = Object.assign(
      { api_key: "9b3adf57854f4a19b7b5782cdd6e427a" },
      req.query
    );
    axios
      .get("https://api.nytimes.com/svc/search/v2/articlesearch.json", {
        params
      })
      .then(response => {
        db.Article
          .find()
          .then(dbArticles =>
            response.data.response.docs.filter(article =>
              dbArticles.every(
                dbArticle => dbArticle._id.toString() !== article._id
              )
            )
          )
          .then(articles => res.json(articles))
          .catch(err => res.status(422).json(err));
      });
  }
};
