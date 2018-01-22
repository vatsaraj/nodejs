var express    = require('express'),
    path       = require('path'),
    handlebars = require('express3-handlebars').create({defaultLayout: 'main'}),
    port       = 8080;

var app        = express();
var fortunes   = ['How much deeper would the oceans be, without sponges?',
                  'Pigeon poop burns the retina for 13 hours. You will learn this the hard way.',
                  'Little toe : A device to geo-locate furniture under low light conditions.',
                  ' Between two evils, always pick the one you never tried before.',
                  ' Two things are infinite: the universe and human stupidity; and I\'m not sure about the universe',
                  'Wine is constant proof that God loves us and loves to see us happy.',
                  'Distrust camels, and anyone else who can go a week without a drink.',
                  'TV is chewing gum for the eyes.',
                 ];



app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.set('port', port);

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
  var ixx  = Math.floor(Math.random() * fortunes.length);
  res.type('text/html');
  res.render('fortune', {yourFortune: fortunes[ixx]});
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
  console.log(':' + app.get('port'));
});

