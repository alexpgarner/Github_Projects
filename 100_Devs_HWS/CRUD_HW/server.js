//CallMeAl
//eLqSlF9oSLX6ZItb
const express = require('express');
const bodyParser= require('body-parser')
const MongoClient = require('mongodb').MongoClient
const app = express();
app.use(express.static('public'));
app.use(bodyParser.json());

const _currentDir = "C:/Users/alexp/OneDrive/Desktop/Projects_GitHub/100_Devs_HWS/CRUD_HW";
const _connectionString = "mongodb+srv://CallMeAL:eLqSlF9oSLX6ZItb@cluster0.sjhenv3.mongodb.net/?retryWrites=true&w=majority";
console.log("hello CRUD");




// MongoClient.connect(_connectionString,{
//     useUnifiedTopology: true
//   },
//   (err, client) => {
//     if(err) return console.error(err);
//     const db = client.db('star-wars-quotes')
//     console.log('Connected to database');
// });

// MongoClient.connect supports promises and can be written as below
MongoClient.connect(_connectionString, { useUnifiedTopology: true })
  .then(client => {
    app.set('view engine', 'ejs')//tells express we are using ejs template engine
    // Middlewares and other routes here...
    const db = client.db('star-wars-quotes');
    const quotesCollection = db.collection('quotes')

    app.use(bodyParser.urlencoded({ extended: true }));
    app.listen(8000,()=> console.log('Listening on 8000..'));
    app.get('/',(req,res)=>{
        //res.sendFile(_currentDir + "/index.html");//sends index.html to browser. REMOVED THIS BECAUSE WE RENDERED html template with ejs engine?
        db.collection('quotes').find().toArray()
        .then(results => {
          console.log(results)
          res.render('index.ejs', {quotes: results})//this is why we don't need the res.sendFile(/index.html) anymore?
        })//gets quotes from database
        .catch(error => console.error(error));
        
    });
    
    // Can't have 2 get methods on same page? Had to combine to get code to run
    // app.get('/', (req, res) => {
    //     db.collection('quotes').find().toArray()
    //       .then(results => {
    //         console.log(results)
    //       })
    //       .catch(error => console.error(error))
    //     // ...
    //   })
    // app.get('/',(req,res)=>{
    //     const cursor = db.collection('quotes').find()
    //     console.log(cursor + "hello")
    //     // .toArray()
    //     // .then(results => console.log(results))
    //     // .catch(error=>console.error(error));
    // });
    app.post('/quotes',(req,res)=>{
        quotesCollection.insertOne(req.body)
        .then(result=>{
            console.log(result)
            res.redirect('/');
        })
        .catch(error=>console.error(error));
    });
    //replace a yoda quote with darth vader
    app.put('/quotes', (req, res) => {
        console.log(req.body)
        quotesCollection.findOneAndUpdate(
            {name:"Yoda"},
            {
                $set: {
                name: req.body.name,
                quote: req.body.quote
                }
            },
            {upsert: true}
          )
            .then(result => {
                console.log(result);
                res.json('Success')
            })
            .catch(error => console.error(error))
    });
    //delete a darth vader quote
    app.delete('/quotes', (req, res) => {
        console.log(req.body);
        quotesCollection.deleteOne(
            {name: req.body.name}
        )
        .then(result=>{
            if(result.deletedCount == 0){
                console.log('No more Darth Quotes to delete')
                return res.json('No more Darth Quotes to delete')
            }
            console.log('DELETED a Darth Vader Quote')
            res.json('DELETED a Darth Vader Quote')
        })
        .catch(error=> console.error(error));
    console.log('Connected to Database')
    });
  })
  .catch(error => console.error(error))