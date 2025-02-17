const MarkingScheme = require('../models/MarkingScheme');

exports.createMarkingScheme = async (req, res) => {
  try {
    const markingScheme = new MarkingScheme(req.body);

    await markingScheme.save();
    
    res.status(201).json(markingScheme); 
  } catch (error) {
    console.error('Error saving marking scheme:', error); // Log the error if something goes wrong
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getAllMarkingSchemes = async (req, res) => {
  try {
    const markingSchemes = await MarkingScheme.find(); // Get all documents from the collection
    res.status(200).json(markingSchemes); // Respond with the data
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving marking schemes" });
  }
};

exports.updateMarkingScheme = async (req, res) => {
  const { id } = req.params; // Get the ID from URL params
  try {
    const updatedMarkingScheme = await MarkingScheme.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedMarkingScheme) {
      return res.status(404).json({ message: 'Marking Scheme not found' });
    }
    res.status(200).json(updatedMarkingScheme);
  } catch (error) {
    res.status(400).json({ message: 'Error updating marking scheme', error });
  }
};

exports.deleteMarkingScheme = async (req, res) => {
  const { id } = req.params; // Get the ID from URL params
  try {
    const deletedMarkingScheme = await MarkingScheme.findByIdAndDelete(id);
    if (!deletedMarkingScheme) {
      return res.status(404).json({ message: 'Marking Scheme not found' });
    }
    res.status(200).json({ message: 'Marking Scheme deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Error deleting marking scheme', error });
  }
};
