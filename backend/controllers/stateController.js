const State = require('../models/State');
const City = require('../models/City');

// Fetch all states with their cities
exports.getStatesWithCities = async (req, res) => {
  try {
    const statesWithCities = await State.aggregate([
      {
        $lookup: {
          from: 'cities',
          localField: '_id',
          foreignField: 'state_id',
          as: 'cities'
        }
      }
    ]);

    res.json(statesWithCities);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
