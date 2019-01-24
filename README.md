# LIRI
<<<<<<< HEAD

This is a terminal version of Siri, called Liri.

#### Installation these dependencies
```javascript
    "dependencies": {
        "node-spotify-api": "^1.0.7",
        "request": "^2.88.0"
    }
```
> Then type one of the following into the terminal

```console
    $ node liri concert-this [artist's name]
```
> This brings back a short list of upcoming concerts
---
```console
    $ node liri spotify-this-song [song's name] or [song's artist]
```
> This brings back the song you request or the most popular song by the artist if no song is specified
---
```console
    $ node liri venue [venue name]
```
> This brings back a short list of upcoming concerts specific to the typed venue
---
```console
    $ node liri movie-this [movie name]
```
> This brings back information regarding the specified movie
---
```console
    $ node liri do-what-it-says
```
> This brings back call from Spotify, requesting information regarding "I Want It That Way" by the Backstreet Boys
=======
LIRI is the console log version of Siri, LIRI will search Spotify for songs, Bands in Town for concerts, and OMDB for movies.
If you type in the word "how to do" into the terminal while using "node liri.js . . .", the terminal will tell you the syntax for this app.
alternatively, you can use concert-this 'artist', spotify-this-song 'song' or 'song artist', movie-this 'movie title', do-what-it-says. also if you dont input anything into the "...-this" then it will return a default parm. 
>>>>>>> 6e6541d4660b6ab8242e2e7234a7dbd2de781971
