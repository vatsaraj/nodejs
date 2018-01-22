var express    = require('express'),
    path       = require('path'),
    handlebars = require('express3-handlebars').create({defaultLayout: 'main'}),
    os         = require('os'),
    fortunes   = require('./myfortunes'),
    port       = 8080;

var app        = express();

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.set('port', port);
app.set('host', os.hostname());

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

app.use(express.static(path.join(__dirname, 'img')));

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

app.listen(app.get('port'), () => {
  console.log('Navigate to http://' + app.get('host') + ':' + app.get('port'));
});

