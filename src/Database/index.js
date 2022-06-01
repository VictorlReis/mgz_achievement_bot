const {Sequelize} = require('sequelize');
const {applyExtraSetup} = require('./ExtraSetup');
require('dotenv').config()
const connectionString = process.env.connectionString

const express = require("express");

const cors = require("cors");


const app = express();
app.use(express.json({limit: "50mb"}));
app.use(express.urlencoded({limit: "50mb", extended: true}));

app.use(cors());

app.get("/", (req, res) => {
    res.send("Bot de conquistas mgz");
});

const Port = process.env.PORT || 3001;

app.listen(Port, () => console.log("Server started"));

const sequelize = new Sequelize(connectionString, {
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    }
});

const modelDefiners = [
    require('../models/conquista'),
    require('../models/meguinha'),
    require('../models/requisicao'),
];

for (const modelDefiner of modelDefiners) {
    modelDefiner(sequelize);
}

applyExtraSetup(sequelize);

module.exports = sequelize;