require('dotenv').config();
const path = require('path');
const express = require('express');
const cors = require('cors');

const app = express();

const route = require('./routes');
const port = process.env.PORT || 5000;
const db = require('./config/db');
// Connect to DB
db.connect();

const corsOptions = {
  exposedHeaders: ['x-access-token', 'x-refresh-token'],
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));

// config use static file
app.use(express.static(path.join(__dirname, 'public')));

route(app); 

app.get("/", (req, res) => {
  res.json({ dm: "hihihi" });
});

app.listen(port, () => {
    console.log(`server running in port ${port}`);
});
