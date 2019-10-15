require("dotenv").config();
var axios = require("axios");
var moment = require('moment');

var keys = require("./keys.js");
//var spotify = new Spotify(keys.spotify);


var command = process.argv[2];

switch(command) {
    case "concert-this":
        concertThis();
    break;
    case "spotify-this-song":
        spotifyThisSong();
    break;
    case "movie-this":
        movieThis();
    break;
    case "do-what-it-says":
        doWhatItSays();
    break;
}

function concertThis() {

    var artist = process.argv[3];
    console.log(artist);
    axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp&market=US").then(
      function(response) {
        //console.log(response.data);

        for(var i=0; i < response.data.length; i++){
          var date = response.data[i].datetime;
          console.log("Venue: "+response.data[i].venue.name);
          console.log("Location: "+response.data[i].venue.city);
          console.log("Date: "+moment(date).format("MM/DD/YYYY"));
          console.log("-----------------------------------------");

        }

    
      })
         .catch(function(error) {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log("---------------Data---------------");
          console.log(error.response.data);
          console.log("---------------Status---------------");
          console.log(error.response.status);
          console.log("---------------Status---------------");
          console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an object that comes back with details pertaining to the error that occurred.
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error", error.message);
        }
        console.log(error.config);
      });
}



function spotifyThisSong() {
var Spotify = require('node-spotify-api');
 
var spotify = new Spotify({
  id: "78b3a768a6b0482eae546ef0cbf02748",
  secret: "a5f3a0deb8c74a479e7d5f10f165ddef"
});

let track = process.argv[3];
 
spotify
  .search({ type: 'track', query: "'"+track+"'"})
  .then(function(response) {
    //console.log(response.tracks.items[0].external_urls.spotify);
    for(var i = 0; i < 20; i++){

      var showData = [
        "Artist(s): "+response.tracks.items[i].artists[0].name,
        "Song Name: "+ response.tracks.items[i].name,
        "Spotify URL: "+ response.tracks.items[i].external_urls.spotify,
        "-----------------------------------------------------"
      ].join("\n\n");
      console.log(showData);
      /*
      console.log("Artist(s): "+response.tracks.items[i].artists[0].name);
      console.log("Song Name: "+ response.tracks.items[i].name);
      console.log("Spotify URL: "+ response.tracks.items[i].external_urls.spotify);
      console.log("-----------------------------------------------------");*/
    }
  })
  .catch(function(err) {
    console.log(err);
  });
}


function movieThis() {
    var movie = process.argv[3];
    axios.get("http://www.omdbapi.com/?t="+movie+"&y=&plot=short&apikey=trilogy").then(
  function(response) {
    console.log(response.data.Title);
    console.log(response.data.Year);
    console.log(response.data.imdbRating);
    console.log(response.data.Ratings[1]);
    console.log(response.data.Country);
    console.log(response.data.Language);
    console.log(response.data.Plot);
    console.log(response.data.Actors);
  })
  .catch(function(error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log("---------------Data---------------");
      console.log(error.response.data);
      console.log("---------------Status---------------");
      console.log(error.response.status);
      console.log("---------------Status---------------");
      console.log(error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an object that comes back with details pertaining to the error that occurred.
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log("Error", error.message);
    }
    console.log(error.config);
  });
}





function doWhatItSays() {
    var fs = require("fs");

    var text = fs.readFile("random.txt", "utf8", function(err, data) {
        if (err) {
          return console.log(err);
        }
        //console.log(data);
        var dataArr = data.split(',');
        //console.log(dataArr);
        process.argv[2] = dataArr[0];
        process.argv[3] = dataArr[1];
        
       

        var command = process.argv[2];
        switch(command) {
          case "concert-this":
              concertThis();
          break;
          case "spotify-this-song":
              spotifyThisSong();
          break;
          case "movie-this":
              movieThis();
          break;
        }



    })

    fs.appendFile("log.txt", text, function(err) {

    // If an error was experienced we will log it.
        if (err) {
            console.log(err);
            }

  // If no error is experienced, we'll log the phrase "Content Added" to our node console.
        else {
            console.log("Content Added");
            }


        });
    }