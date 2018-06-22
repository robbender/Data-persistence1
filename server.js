const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const handlebars = require('express-handlebars').create({ defaultlayout: 'main' });
const sqlite3 = require('sqlite3').verbose();

// Use your own db path here:
const db = new sqlite3.Database("Chinook_Sqlite_AutoIncrementPKs.sqlite3", (err) => console.log(err));

app.engine('handlebars', handlebars.engine)
app.set('view engine', 'handlebars')

app.use(express.static(__dirname))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// ROUTING
app.get('/', (req, res) => {
  res.render('home')
})

// app.get("/success", (request, response) => {
//   response.render("success");
// });

// API
// app.get('/artist', (req, res) =>{
//     console.log('working')
//     // console.log(results)
//     res.send('hello')
// })

// app.get("/albums", (request, response) => {
//   const query = `SELECT artist.Name as Artist, albums.Title as Album from artist JOIN albums USING (artistId)`;
//   let resultsArray = [];
//   db.each(query, (err, row) => {
//     if (err) throw err;
//     // console.log(row);
//     resultsArray.push(row);
//   });
//   response.render("albums", { results: resultsArray });
// });

//
// app.post('/artist', (req, res) =>{
//     messages.push(req.body)
//     res.sendStatus(200)
// })

app.post('/', (req, res) => {
    const sql = req.body.sql;
    db.all('SELECT trackid, track.name AS Track, album.title AS Album, artist.name AS Artist FROM track INNER JOIN album ON album.albumid = track.albumid INNER JOIN artist ON artist.artistid = album.artistid;',
      (err, results) => {
        if (err) throw err;
        console.log(results);
        console.log(err);
        res.render('home', { sql, results: results, error: err });
        // res.status(200).json(results);
        // db.close();
        // res.redirect(303, "/success");
  })
})

// app.post("/form", (request, response) => {
//   db.run(`INSERT into Artists(ArtistId, Name) VALUES(${request.body.artistId}, '${request.body.name}')`,
//     (err, row) => {
//       if (err) throw err;
//       db.close();
//       response.redirect(303, "/success");
//     }
//   );
// });

// app.post('/', (req, res) => {
//   db.run(`INSERT into Artist(ArtistId, Name) VALUES(${req.body.artistID}, ${req.body.name})`, (err, row) => {
//     if (err) throw err;
//     res.redirect(303, '/success');
//   });
// });

var server = app.listen(3000, () => {
    console.log('server is listening on port', server.address().port)
})
