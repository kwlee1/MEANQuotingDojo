var express = require('express');
var app = express();
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/quotingDojo');
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
var path = require('path');
// Setting our Static Folder Directory
app.use(express.static(path.join(__dirname, './static')));
// Setting our Views Folder Directory
app.set('views', path.join(__dirname, './views'));
// Setting our View Engine set to EJS
app.set('view engine', 'ejs');
// Routes
// Root Request
app.get('/', function(req, res) {
    res.render('index');
})

var quoteSchema = new mongoose.Schema({
    name: String,
    quote: String
})
var Quote = mongoose.model('quotes',quoteSchema);

app.get('/quotes', function(req, res) {
    Quote.find({}, function(err, quotes) {
        if (err) { console.log(err); }
        res.render('quotes', { quotes: quotes });
    });
})
// Add User Request 
app.post('/quotes', function(req, res) {
    Quote.create(req.body, function(err) {
      if (err) { console.log(err); }
      res.redirect('/quotes');
    });
});


// Setting our Server to Listen on Port: 8000
app.listen(8000, function() {
    console.log("listening on port 8000");
})