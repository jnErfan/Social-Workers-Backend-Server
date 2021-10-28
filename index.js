const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors');
require('dotenv').config()

const { MongoClient } = require('mongodb');
const ObjectId = require("mongodb").ObjectId;
// https://soacial-workers-server.herokuapp.com/
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send(`<h1  style="text-align: center; margin-top:100px;  font-weight: 900; font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif; color: blue">Welcome To Social Workers Backend Server</h1>`);
})

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.qyw7u.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

client.connect(err => {
    const dataBase = client.db("SocialEvents")
    const eventsCollection = dataBase.collection("Events");
    const workersCollection = dataBase.collection("registerList");
    const bookingEventCollection = dataBase.collection("eventBooking");
    
  app.get('/events/:id', async (req, res) => {
    const useParams = req.params.id;
    const query = {_id:ObjectId(useParams)}
    const result = await eventsCollection.find(query).toArray();
    res.send(result);
  })
  //61790c912091f7b8f0af7bcf
    app.get('/events', async (req, res) => {
            const result = await eventsCollection.find({}).toArray();
            res.send(result);
    });

    app.post('/events', async (req, res) => {
      const event = req.body;
      const result = await eventsCollection.insertOne(event)
      res.json(result);
    })

    app.post('/workRegister', async (req, res) => {
      const register = req.body;
      const result = await workersCollection.insertOne(register);
      res.json(result);
      console.log(result);
    })
   
    app.get('/workRegister', async (req, res) => {
      const result = await workersCollection.find({}).toArray();
      res.send(result);
    });


    app.delete('/registerList/:id', async (req, res) => {
      const params = req.params.id;
      const query = {_id:ObjectId(params)}
      const result = await  workersCollection.deleteOne(query)
      res.send(result);
      console.log(result);
    })

    app.post('/booking', async (req, res) => {
      const bookingEvent = req.body;
      const result = await bookingEventCollection.insertOne(bookingEvent);
      res.json(result);
    })

    app.get('/matchEvents/:email', async (req, res) => {
      const emailMatchEvents =  req.params.email;
    const result = await bookingEventCollection.find({email: emailMatchEvents}).toArray();
    res.send(result)
    });


    
    app.delete('/deleteBookingEvent/:id', async (req, res) => {
      const params = req.params.id;
      console.log(params);
      const query = {_id: params}
      const result = await bookingEventCollection.deleteOne(query)
      console.log(result);
      res.json(result);
      /* bookingEventCollection.deleteOne({_id:ObjectId(req.params.id)}).then(result => {
      res.send(result);
      console.log(result);
     }) */
    })

    // client.close();
  });


app.listen(port,  ()=>{console.log("Port Running ",port)})