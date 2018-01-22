var express    = require('express'),
    path       = require('path'),
    handlebars = require('express3-handlebars').create({defaultLayout: 'main'}),
    os         = require('os'),
    fortunes   = require('./myfortunes'),
    port       = 8080;

var app        = express();

// Let it be known that 'handlebars' is the stipulated template engine
// that'll be used in this application.
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

// Initialize some convenience parameters, that we might look into either from
// time to time, or just once. In the case of latter, we'll call it 'doing due
// diligence' or 'following the norm'.
app.set('port', port);
app.set('host', os.hostname());

// ::BEGIN:: Define routes to particular webpages.
app.get('/', (req, res) => {
  res.type('text/html');
  res.render('home');
});
app.get('/about*', (req, res) => {
  res.type('text/html');
  res.render('about');
});
app.get('/contact', (req, res) => {
  res.type('text/html');
  res.render('gargoyles');
});
app.get('/fortune', (req, res) => {
  res.render('fortune', {yourFortune: fortunes.getTheFortunes()});
});
app.get('/help', (req, res) => {
  res.type('text/html');
  res.render('help');
});
app.get('/headers', (req, res) => {
  // This page displays the HTTP headers that are sent to the webserver
  // by a client.
  res.type('text/html');
  var headers = '';
  //for(var name in req.headers) headers.push(name + ' : ' + req.headers[name] + '\n');
  for(var name in req.headers) headers += name + ' : ' + req.headers[name] + ', ';
  res.render('headers', {dataBlock: headers});
});
// ::END:: Define routes to particular webpages.

// Specify a path which will be looked into, by default, when the browser
// wants to render images that we've referred to in the HTML code.
app.use(express.static(path.join(__dirname, 'img')));

// These two code fragments determine how we'll handle 404 and 500 errors.
// When these errors occur, we'll open up error specific HTML pages.
app.use((req, res) => {
  res.type('text/html');
  res.status(404);
  res.render('404');
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.type('text/html');
  res.status(500);
  res.render('500');
});

// Application has been launched. Now listen for incoming connections.
app.listen(app.get('port'), () => {
  console.log('Navigate to http://' + app.get('host') + ':' + app.get('port'));
});

