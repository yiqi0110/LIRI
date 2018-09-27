// Variable declarations ======================================
var dotenv = require("dotenv").config();
var spotifyKeys = require("./keys.js");
var Spotify = require("node-spotify-api");
var moment = require('moment');
var request = require('request');
var fs = require("fs");
var api = process.argv[2];
var apiCommands = '';
var spotify = new Spotify({
    id: spotifyKeys.spotify.id,
    secret: spotifyKeys.spotify.secret
});

// taking in one or several apiCommands
for (var i = 3; i < process.argv.length; i++) {
    if (i > 3) {
        apiCommands = apiCommands + '+' + process.argv[i];
    } else {
        apiCommands += process.argv[i];
    }
};

// Mains ======================================================

if (api === "concert-this") {
    // concert stuff
    concertAPI(apiCommands);
} else if (api === "spotify-this-song") {
    // spotify stuff
    if (!apiCommands) {
        spotifyAPI("The Sign Ace of Base");
    } else {
        spotifyAPI(apiCommands);
    }
} else if (api === "movie-this") {
    // movie stuff
    if (!apiCommands) {
        omdbAPI("Mr.Nobody");
    } else {
        omdbAPI(apiCommands);
    }
} else if (api === "do-what-it-says") {
    // other stuff?
    whatEverNotAPI();
} else {
    console.log("Sorry, you didn't type the correct thing. Try: concert-this 'artist', spotify-this-song 'song' or 'song artist', movie-this 'movie title', do-what-it-says");
};

// Functions ==================================================
function concertAPI(apiCommands) {
    var artist = apiCommands;
    var bandsInTownURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
    request(bandsInTownURL, function (err, response, body) {
        if (!err && response.statusCode === 200) {
            for (var i = 0; i < 5; i++) {
                var venue = JSON.parse(body)[i].venue;
                var split = JSON.parse(body)[i].datetime.split("T");
                var dateSplit = split[0].split('-');
                var dateFinal = dateSplit[1] + "-" + dateSplit[2] + "-" + dateSplit[0] + ", " + split[1];
                var time = moment(dateFinal).format("MMMM Do YYYY, h:mm:ss a"); // moment().format()
                var venueFinal = "=====================\nVenue: " + venue.name + "\nLocation: " + venue.city + ", " + venue.region + "; " + venue.country + "\nTime: " + time;
                console.log(venueFinal);
                writeToTxt(venueFinal, api);
            };

        } else {
            console.log("Sorry no aritist or band by that name.");
            console.log(err);
        }
    })
};

function spotifyAPI(apiCommands) {
    var song = apiCommands;
    spotify.search({
        type: "track",
        query: song
    }, function (err, data) {
        if (err) {
            console.log("No song by that name in the API.");
            console.log(err);
        }
        var artist = data.tracks.items[0].artists[0].name;
        var songName = data.tracks.items[0].name;
        var link4Spotify = data.tracks.items[0].external_urls.spotify;
        var album = data.tracks.items[0].album.name;
        var songFinal = "Song: " + songName + "\nArtist: " + artist + "\nLink For A Preview To " + songName + ": " + link4Spotify + "\nAlbum for " + songName + ": " + album;
        console.log(songFinal);
        writeToTxt(songFinal, api);
    })
};

function omdbAPI(apiCommands) {
    var movie = apiCommands;
    request("http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy", function (error, response, body) {

        // If the request is successful (i.e. if the response status code is 200)
        if (!error && response.statusCode === 200) {
            var title = JSON.parse(body).Title;
            var year = JSON.parse(body).Year;
            var rating = JSON.parse(body).imdbRating;
            var tomatoRating = JSON.parse(body).Ratings[1].Source + ": " + JSON.parse(body).Ratings[1].Value;
            var country = JSON.parse(body).Country;
            var language = JSON.parse(body).Language;
            var plot = JSON.parse(body).Plot;
            var actors = JSON.parse(body).Actors;
            var movieSTUFF = "Title: " + title + "\nYear: " + year + "\nRating From IMDB: " + rating + "\n" + tomatoRating + "\nCountry of Production: " + country + "\nLanguages: " + language + "\nPlot: " + plot + "\nActors: " + actors;
            console.log(movieSTUFF);
            writeToTxt(movieSTUFF, api);
        }
    });
};

function whatEverNotAPI() {
    fs.readFile("random.txt", "utf8", function (err, data) {
        if (err) {
            return console.log(err);
        }
        // console.log(data);
        var dataArr = data.split(", ");

        // console.log(dataArr);

        for (var i = 0; i < dataArr.length; i++) {
            console.log(dataArr[i]);
            writeToTxt(dataArr[i], api);
        }
    });
};

// functin for outputing the info to log.txt
function writeToTxt(results, command){
    var resultsFinal = "\n"+command + "\n=====================\n"+results+"\n";
    fs.appendFile("log.txt", resultsFinal, function(err){
        if (err) {
            console.log(err);
        } else {
            console.log("content added to log");
        }
    
    });
};