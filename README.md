# AquinasDaily

## For Development

### Install express

<code>npm init -y</code>

<code>npm install --save express</code>

<code>npm install --save-dev @babel/core @babel/node @babel/preset-env</code>

#### Setup babel ES6 syntax

Create .babelrc file in main backend directory with the following,

<code>
{
    "presets": ["@babel/preset-env"]
}
</code>

this gives us modern ES6 syntax using server.js

<code>npx babel-node src/server.js</code>

<code>npm install --save body-parser</code>

<code>npm install --save-dev nodemon</code>

for hot-encoding/refreshing

<code>npx nodemon --exec npx babel-node src/server.js</code>

#### MongoDB Setup

<code>mkdir -p /data/db</code>

<code>mongod</code>

<code>npm install --save mongodb</code>

## For Production (AWS EC2)

#### Setup instance

1. Create EC2 Instance

2. Create Key Pair

3. SSH in

<code>ssh -i .\aquinas-app-key.pem ec2-user@<Public IPv4 DNS> </code>

4. Install git

<code>sudo yum install git</code>

5. Install NPM (https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/setting-up-node-on-ec2-instance.html)

<code>curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash </code>

<code>. ~/.nvm/nvm.sh</code>

<code>nvm install 12.18.4</code>

<code>npm install -g npm@latest</code>

6. Install MongoDB (https://docs.mongodb.com/manual/tutorial/install-mongodb-on-amazon/)

<code>sudo nano /etc/yum.repos.d/mongodb-org-4.4.repo</code>

Paste the below into the file

<code>
[mongodb-org-4.4]
name=MongoDB Repository
baseurl=https://repo.mongodb.org/yum/amazon/2/mongodb-org/4.4/x86_64/
gpgcheck=1
enabled=1
gpgkey=https://www.mongodb.org/static/pgp/server-4.4.asc
</code>

#### Install mongo

<code>sudo yum install -y mongodb-org</code>

#### Run mongo daemon

<code>sudo service mongod start</code>

<code>mongo</code>

<code> use aquinas-db; </code>

7. Clone git code

<code>git clone https://github.com/conradbm/aquinas-app</code>

<code>cd aquinas-app/aquinas-backend</code>

<code>npm install</code>

8. Run the server

<code>npm install -g forever </code>

<code>forever start -c "npm start" . </code>

<code>forever list</code>

9. Map port 8000 to port 80 on AWS

<code>sudo iptables -t nat -A PREROUTING -p tcp --dport 80 -j REDIRECT --to-ports 8000</code>

10. Go manually to security groups for this EC2 instance and change port 80 to ANYWHERE.

### Instructions for inserting data into db

#### Insert articles data

<code>> var file = cat('.aquinas_new.json'); </code>

<code>> use aquinas-db</code>
 
<code>> var o = JSON.parse(file);</code>

<code>> db.articles.insert(o);</code>

#### Insert similarities data

<code>> var file = cat('.aquinas_similarity.json');</code>

<code>> use aquinas-db</code>

<code>> var o = JSON.parse(file);</code>

<code>> db.articles.insert(o);</code>


### Indexing articles

<code>> db.articles.createIndex({"questionTitle":"text", "articleTitle":"text", "articleObjections":"text", "articleBody":"text", "articleReplyToObjections":"text"});</code>

<code>>db.articles.findOne( { $text: { $search: "Plato" } } ); </code>

<hr>

### Collections to construct

#### History table

<code>use aquinas-db;</code>

<code>db.createCollection("history");</code>

## For Domain

https://aws.amazon.com/getting-started/hands-on/get-a-domain/


