# <div align="center">📋 Todolist-v2</div>

<p align="center">An updated version of the simple to-do list application built with MongoDB</p>
<p align="center"><a href="https://sleepy-island-87754.herokuapp.com">Deployed version</a></p>

## 💻 Sample

![todolist](https://github.com/sonali033/todolist-v2/blob/main/todo.PNG)

## 🛠️ Technologies

<ul>
  <li><a href="https://nodejs.org/en/">Node.js</a></li>
  <li><a href="https://expressjs.com/">Express</a></li>
  <li><a href="https://ejs.co/">EJS</a></li>
  <li><a href="https://www.mongodb.com/">MongoDB</a></li>
  <li><a href="https://mongoosejs.com/">Mongoose</a></li>
  <li><a href="https://www.heroku.com/home">Heroku</a></li>
</ul>

## ⚙️ Requirements

<ul>
  <li><a href="https://git-scm.com/">Git</a></li>
  <li><a href="https://nodejs.org/en/">Node.js</a></li>
  <li><a href="https://www.npmjs.com/">NPM</a></li>
  <li><a href="https://www.mongodb.com/cloud/atlas">MongoDB Atlas Cluster</a></li>
</ul>

## 🚀 Installation

```bash
$ git clone https://github.com/sonali033/todolist-v2.git
```

Before running the project, it's necessary to have a database setup on a MongoDB Atlas Cluster. With that, create a `.env` file in the backend folder root and put these keys in environment variables and they'll work on the mongoose connection string. 

Example:

```
MONGODB_USERNAME=your_username
MONGODB_PASSWORD=your_password
MONGODB_CLUSTER_URL=your_cluster_url
```

If you prefer, you can just place your connection string on the `server.js` file:

```
mongoose.connect(`mongodb+srv...`);
```

Then:

```
$ cd todolist-v2
$ npm install
$ npm start
```

The application will pop-up in the browser on http://localhost:3000



