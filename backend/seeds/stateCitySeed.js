const mongoose = require('mongoose');
const State = require('../models/State');
const City = require('../models/City');
require('dotenv').config();

const states = [
  { name: 'Punjab' },
  { name: 'Sindh' },
  { name: 'Khyber Pakhtunkhwa' },
  { name: 'Balochistan' }
];

const cities = [
  { name: 'Lahore', state: 'Punjab' },
  { name: 'Faisalabad', state: 'Punjab' },
  { name: 'Karachi', state: 'Sindh' },
  { name: 'Hyderabad', state: 'Sindh' },
  { name: 'Peshawar', state: 'Khyber Pakhtunkhwa' },
  { name: 'Abbottabad', state: 'Khyber Pakhtunkhwa' },
  { name: 'Quetta', state: 'Balochistan' },
  { name: 'Gwadar', state: 'Balochistan' }
];

const seedDatabase = async () => {
  try {
    await mongoose.connect("mongodb+srv://sunnyshoukat:dbUserPassword@cluster0.1r1xdal.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    // Clear existing data
    await State.deleteMany({});
    await City.deleteMany({});

    // Insert states
    const stateDocs = await State.insertMany(states);

    // Map cities to state IDs
    const stateMap = stateDocs.reduce((map, state) => {
      map[state.name] = state._id;
      return map;
    }, {});

    // Insert cities with state IDs
    const cityDocs = cities.map(city => ({
      name: city.name,
      state_id: stateMap[city.state]
    }));

    await City.insertMany(cityDocs);

    console.log('Database seeded successfully');
    mongoose.connection.close();
  } catch (err) {
    console.error(err);
    mongoose.connection.close();
  }
};

seedDatabase();
