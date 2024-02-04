const MarkingScheme = require('../models/MarkingScheme');

exports.createMarkingScheme = async (req, res) => {
  try {
    const markingScheme = new MarkingScheme(req.body);
    // You may generate markingSchemeId dynamically here
    // Save marking scheme to the database
    await markingScheme.save();
    res.status(201).json(markingScheme);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
