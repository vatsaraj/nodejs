var theFortunes   = ['How much deeper would the oceans be, without sponges?',
                  'Pigeon poop burns the retina for 13 hours. You will learn this the hard way.',
                  'Little toe : A device to geo-locate furniture under low light conditions.',
                  'Between two evils, always pick the one you never tried before.',
                  'Two things are infinite: the universe and human stupidity; and I\'m not sure about the universe',
                  'Wine is constant proof that God loves us and loves to see us happy.',
                  'Distrust camels and anyone else who can go a week without a drink.',
                  'TV is chewing gum for the eyes.',
                  'Time Flies Like An Arrow. Fruit Flies Like Bananas',
                 ];

exports.getTheFortunes = () => {
  var ixx = Math.floor(Math.random() * theFortunes.length);
  return theFortunes[ixx];
};

