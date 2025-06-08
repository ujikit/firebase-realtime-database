const express = require('express');
const app = express();
const db = require('./firebase'); // Import the Firebase DB
const bodyParser = require('body-parser');

// Middleware to parse JSON request bodies
app.use(bodyParser.json());

// 1. Create (POST)
app.post('/addData', async (req, res) => {
  try {
    const id = new Date().getTime();
    const { name, age } = req.body;
    const ref = db.ref('users').child(id); // Creating a new node with `id`
    await ref.set({
      name: name,
      age: age
    });
    res.status(201).send('Data added successfully!');
  } catch (error) {
    res.status(500).send('Error adding data: ' + error.message);
  }
});

// 2. Read (GET)
app.get('/getData/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const ref = db.ref('users').child(id);
    const snapshot = await ref.once('value');
    if (snapshot.exists()) {
      res.json(snapshot.val());
    } else {
      res.status(404).send('Data not found!');
    }
  } catch (error) {
    res.status(500).send('Error reading data: ' + error.message);
  }
});

// 3. Update (PUT)
app.put('/updateData/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, age } = req.body;
    const ref = db.ref('users').child(id);
    await ref.update({
      name: name,
      age: age
    });
    res.status(200).send('Data updated successfully!');
  } catch (error) {
    res.status(500).send('Error updating data: ' + error.message);
  }
});

// 4. Delete (DELETE)
app.delete('/deleteData/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const ref = db.ref('users').child(id);
    await ref.remove();
    res.status(200).send('Data deleted successfully!');
  } catch (error) {
    res.status(500).send('Error deleting data: ' + error.message);
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
