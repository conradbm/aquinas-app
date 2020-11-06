/* Express.js Server

Responds with a message when we request it.

Commands for setup:

npm init -y
npm install --save express
npm install --save-dev @babel/core @babel/node @babel/preset-env
# Create .babelrc file in main backend directory with the following,
{
    "presets": ["@babel/preset-env"]
}
# this gives us modern ES6 syntax using server.js
npx babel-node src/server.js

npm install --save body-parser

npm install --save-dev nodemon
# for hot-encoding/refreshing
npx nodemon --exec npx babel-node src/server.js 


mkdir -p /data/db
# install mongodb
mongod

//Open new terminal
mongo
> use my-blog //create new database
> db.articles.insert([{name:'learn-react',
...         upvotes: 0,
...         comments:[],
...     },
...     {name:'learn-node',
...         upvotes: 0,
...         comments:[],
...     },
...     {name:'my-thoughts-on-resumes',
...         upvotes: 0,
...         comments:[],  
...     }]) //insert our data
> db.articles.find({}).pretty()
> db.articles.find({name:'learn-react'}).pretty()
> db.articles.remove({})

Also worth noting, below will insert from a file, just run this after starting `mongo`
---
> var file = cat('./src/data/aquinas_new.json');
> use aquinas-db
switched to db aquinas-db
> var o = JSON.parse(file);
> db.articles.insert(o);

npm install --save mongodb //allows for modifying database in express

// AWS
1. Create EC2 Instance
2. Create Key Pair
3. SSH in
ssh -i .\my-blog-key.pem ec2-user@ec2-18-218-105-248.us-east-2.compute.amazonaws.com

4. Install git
sudo yum install git

5. Install NPM (https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/setting-up-node-on-ec2-instance.html)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash
. ~/.nvm/nvm.sh
nvm install 12.18.4
npm install -g npm@latest

6. Install MongoDB (https://docs.mongodb.com/manual/tutorial/install-mongodb-on-amazon/)
sudo nano /etc/yum.repos.d/mongodb-org-4.4.repo  
// Paste the below into the file
[mongodb-org-4.4]
name=MongoDB Repository
baseurl=https://repo.mongodb.org/yum/amazon/2/mongodb-org/4.4/x86_64/
gpgcheck=1
enabled=1
gpgkey=https://www.mongodb.org/static/pgp/server-4.4.asc
// run the following
sudo yum install -y mongodb-org
// run mongo
sudo service mongod start
mongo
// load some data
> use my-blog
switched to db my-blog
> db.articles.insert([
... {
...    name:'learn-react',
...    upvotes: 0,
...    comments: [],
... },
... {
...     name:'learn-node',
...     upvotes:0,
...     comments:[],
... },
... {
...     name:'my-thoughts-on-resumes',
...     upvotes:0,
...     comments:[],
... },
... ])



7. Clone git code
git clone https://github.com/conradbm/my-blog.git
cd my-blog
npm install

8. Run the server
npm install -g forever
forever start -c "npm start" .
forever list

9. Map port 8000 to port 80 on AWS
sudo iptables -t nat -A PREROUTING -p tcp --dport 80 -j REDIRECT --to-ports 8000

10. Go manually to security groups for this EC2 instance and change port 80 to ANYWHERE.


*** Create articles collection from json ***
> var file = cat('./src/data/aquinas_new.json');
> use aquinas-db
switched to db aquinas-db
> var o = JSON.parse(file);
> db.articles.insert(o);

*** Create similarities collection from json ***
> var file = cat('./src/data/similarity.json');
> use aquinas-db
switched to db aquinas-db
> var o = JSON.parse(file);
> db.articles.insert(o);


*** Index a articles ***
> db.articles.createIndex({"questionTitle":"text", "articleTitle":"text", "articleObjections":"text", "articleBody":"text", "articleReplyToObjections":"text"});
db.articles.findOne( { $text: { $search: "love" } } );

_________________________________________________
Collections to construct


*** Create articles table by insert
*** Create similarity table by insert
*** Create a search history table by construction, users insert
use aquinas-db;
db.createCollection("history");

*/

import express from 'express';
import bodyParser from 'body-parser';
import { MongoClient } from 'mongodb';
import path from 'path';
import { CLIENT_RENEG_LIMIT } from 'tls';

// req/request is the input medium with data coming in
// res/response is the output medium to transmit data back
// async/await for database calls


// Express App
const app = express();

// For hosting the site
app.use(express.static(path.join(__dirname, '/build')));

// Provides a body tag for json
app.use(bodyParser.json());

// Function to take care of stand-up/tear-down database calls
const withDB = async (operations, res) => {
    try{

        // await for inline database calls
        const client = await MongoClient.connect('mongodb://localhost:27017', {useNewUrlParser:true})
        const db = client.db('aquinas-db');
        
        // General call to the database
        await operations(db);

        client.close();
    } catch(error){
        // Send internal server error if fail
        res.status(500).json({message:"Error connecting to db ", error});
    }
}
// GET: Retrieve article data
app.get('/api/articles/:volume/:question/:article', async (req, res) => {

    // Start with withDB code, until we hit the parameter `operations`
    // then plug in the argument lines of code, then proceed.
    // This removes all boilerplate database code
    withDB( async (db) => {
        const volume = req.params.volume;
        const question = req.params.question;
        const article = req.params.article;

        // Save the query into the database
        //await db.collection('history').insertOne({type:"research", username: "Guest", data: {volumeKey:volume, questionKey:question, articleKey:article}, date: Date()});

        const articleInfo = await db.collection('articles').findOne({volumeKey:volume, questionKey:question, articleKey:article});
        res.status(200).json(articleInfo);
    }, res);
})

// GET: Retrieve article data
app.post('/api/save', async (req, res) => {

    // Start with withDB code, until we hit the parameter `operations`
    // then plug in the argument lines of code, then proceed.
    // This removes all boilerplate database code
    withDB( async (db) => {
        // Get URL/body parameters
        const volume = req.body.volume;
        const question = req.body.question;
        const article = req.body.article;
        

        // Save the query into the database
        const record = {type:"research", username: "Guest", data: {volumeKey:volume, questionKey:question, articleKey:article}, date: Date()};

        await db.collection('history').insertOne(record);

        res.status(200).json(record);
    }, res);
})


// GET: Retrieve similarity data
app.get('/api/similarity/:volume/:question/:article', async (req, res) => {

    // Start with withDB code, until we hit the parameter `operations`
    // then plug in the argument lines of code, then proceed.
    // This removes all boilerplate database code
    withDB( async (db) => {
        const volume = req.params.volume;
        const question = req.params.question;
        const article = req.params.article;

        const articleInfo = await db.collection('similarity').findOne({volumeKey:volume, questionKey:question, articleKey:article});
        res.status(200).json(articleInfo);
    }, res);
})

// POST: Search
app.post('/api/search', async (req, res) => {
    
    withDB( async (db) => {

        // Get URL/body parameters
        const query = req.body.query;

        // Save the query into the database
        await db.collection('history').insertOne({type:"search", username: "Guest", data: {query: query}, date: Date()});

        // Select statement
        const articleInfo = await db.collection('articles').find({ "$text": {"$search":query}}).limit(15).toArray();

        // Send latest back
        res.status(200).json(articleInfo);
    }, res)

})

// POST: Search
app.post('/api/subscribe', async (req, res) => {
    
    withDB( async (db) => {

        // Get URL/body parameters
        const userEmail = req.body.userEmail;
        const dailyUpdates = req.body.dailyUpdates;
        const updatesAndFixes = req.body.updatesAndFixes;

        // Save the query into the database
        const record = {type:"subscribe", username: "Guest", data: {userEmail: userEmail, dailyUpdates: dailyUpdates, updatesAndFixes:updatesAndFixes}, date: Date()};
        await db.collection('history').insertOne(record);

        // Send latest back
        res.status(200).json(record);
    }, res)

})

// For hosting the site @ port 8000
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/build/index.html'));
});

// Listen to port 8000
app.listen(8000, () => console.log("Listening on port 8000"));
