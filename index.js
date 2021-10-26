const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors');
require('dotenv').config()

const { MongoClient } = require('mongodb');

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send(`<h1  style="text-align: center; margin-top:100px;  font-weight: 900; font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif; color: blue">Welcome To Social Workers Website</h1>`);
})

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.qyw7u.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

client.connect(err => {
    const eventsCollection = client.db("SocialEvents").collection("Events");
    
    app.get('/events', async (req, res) => {
            res.send(`<h1  style="text-align: center; margin-top:100px;  font-weight: 900;">All Events</h1>`)
    });

    // client.close();
  });


app.listen(port,  ()=>{console.log("Port Running ",port)})