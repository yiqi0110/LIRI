# LIRI

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