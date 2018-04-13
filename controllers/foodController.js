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
