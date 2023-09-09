const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = 4000; // set the local port you want to use
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
// connect to your MongoDB Atlas database
const username = "charlesb32"
const password = "GTnPX7g8bV44xU0p"
const database = "FinalProjectData"

mongoose.connect(`mongodb+srv://${username}:${password}@firstcluster.sjcxaeq.mongodb.net/${database}?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log('Connected 2 database');
    })
    .catch((err) => {
        console.log('Error connecting to database:', err);
    });


app.use(express.json()); // parse JSON data from requests
app.use(cors()); // enable CORS for all routes


// const { Schema } = mongoose;

const tableSchema = new mongoose.Schema({
    title: String,
    data: {
        type: Array,
        items: {
            type: Object,
            properties: {
                Week: String,
                javascript: Number,
                python: Number,
                java: Number,
            }
        }
    }
});

const MyModel = mongoose.model('tableSchema', tableSchema, 'FinalProjectCollection');
//const MyModel = mongoose.model('MyModel', mySchema);
// console.log(MyModel)
// retrieve all documents from the collection
app.get('/db', async (req, res) => {
    try {
        // Use the Mongoose model to retrieve all documents from the collection
        const data = await MyModel.find({});
        console.log(data)
        // Return the data as a JSON response
        res.json(data);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});


