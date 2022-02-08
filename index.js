const express = require('express')

const exphbs = require('express-handlebars');
// this is called Destructuring in JS and it basically on grabs the 
// MongoClient from the mongodb module 
// https://stackoverflow.com/questions/25187903/what-do-curly-braces-around-javascript-variable-name-mean
const { MongoClient } = require('mongodb');
const mongoUtil = require(__dirname + '/db/mongoUtil.js')
var path = require('path');
const app = express()
app.engine('handlebars', exphbs())
app.set('view engine', 'handlebars')
app.use(express.static(__dirname + '/public'))
app.use(express.urlencoded({ extended: true }))

app.get(['/','/home'], (req, res) => {
    res.render('home', { view: 'home'})
})

app.get('/log_entry', async (req, res) => {
    
   const results = await db.collection('rivers')
  .find({})
  .project({river:1, _id:0})
  .toArray()
  let arr_results = results.map(x => x.river)

    res.render('log_entry', { view: 'log_entry', river:arr_results})
})

app.get('/river_entry',async (req, res) => {
    res.render('river_entry', {view: 'river_entry'})
 })

app.get('/feed', (req, res) => {
    res.render('feed')
})

app.get('/profile', (req, res) => {
    res.render('profile')
})

app.get('/test', (req, res) => {
    res.write('I am listening...')
    res.send()
})

app.post('/log_entry', async (req, res) => {
    let document = {
        // TODO convert these to the correct data types
        difficulty: Number.parseFloat(req.body.difficulty).toFixed(1),
        river: req.body.river,
        date: new Date(req.body.date),
        flow: Number(req.body.flow),
        flowFeel: req.body.flowFeel,
        time: req.body.time,
        groupSize: req.body.groupSize ? Number(req.body.groupSize):'',
        members: req.body.members,
        notes: req.body.notes,
        accident: req.body.accident
    }
    // insert(client, entry)
    console.log("Request Body")
    console.log(req.body)
    console.log("Document")
    console.log(document)
    await db.collection('journal_entries').insertOne(document)
    res.send('You successfully submitted the file')
})

app.post('/river_entry', async (req, res) => {
    let document = {
        // TODO convert these to the correct data types
        river:req.body.river,
        stretch:req.body.river,
        difficulty:Number.parseFloat(req.body.difficulty).toFixed(1),
        distance:req.body.distance,
        flows:req.body.flows,
        gradient:req.body.gradient,
        "put-in":req.body["put-in"],
        "take-out":req.body["take-out"],
        shuttle:req.body.shuttle,
        season:req.body.season,
        dateAdded:Date.now()
    }
    // insert(client, entry)
    await db.collection('rivers').insertOne(document)
    res.send('You successfully submitted the entry')
})

mongoUtil.connectToServer(function (err,client) {
    if (err) console.log(err)
    db = mongoUtil.getDb()
    app.listen(process.env.PORT || 3000, () => {
        console.log('Server started on specified port')
    }) 
})

async function insert(client, document) {
    /**
     * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
     * See https://docs.mongodb.com/ecosystem/drivers/node/ for more details
     */
    

    /**
     * The Mongo Client you will use to interact with your database
     * See https://mongodb.github.io/node-mongodb-native/3.6/api/MongoClient.html for more details
     * In case: '[MONGODB DRIVER] Warning: Current Server Discovery and Monitoring engine is deprecated...'
     * pass option { useUnifiedTopology: true } to the MongoClient constructor.
     * const client =  new MongoClient(uri, {useUnifiedTopology: true})
     */
    

    try {
        // Connect to the MongoDB cluster
        await client.connect();
        console.log('this is the document', document)

        await client.db('river_journal').collection('journal_entries').insertOne(document)

    } catch (e) {
        console.error(e);
    } finally {
        // Close the connection to the MongoDB cluster
        await client.close();
    }
}