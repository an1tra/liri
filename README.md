# liri
Liri is a command line application that takes in arguments and returns data based on one of four commands: concert-this, spotify-this-song, movie-this, do-what-it-says

<strong>What Each Command Does:</strong>

<strong>concert-this</strong>
Retrieves the top 20 closest concert dates for a searched artist.

```bash
node liri.js concert-this
```

<strong>spotify-this-song</strong>
Retrieves song information for a searched track.

```bash
node liri.js spotify-this-song <song name>
```

<strong>movie-this</strong>
Retrieves movie information for a movie. If no argument is passed, movie defaults to "Mr. Nobody".

```bash
node liri.js movie-this <movie name>
```

<strong>do-what-it-says</strong>
Takes info from random.txt (a song) and performs spotify-this-song:

```bash
node liri.js do-what-it-says
```

<h3>Technologies Used:<h3>
  <ul>
    <li>JavaScript</li>
    <li>Node</li>
    <li>Axios</li>
    <li>Moment</li>
  </ul>
