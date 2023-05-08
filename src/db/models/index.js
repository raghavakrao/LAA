const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const config = require('../.././config/index');
let db = {};

let basename = path.basename(module.filename);

let sequelize = new Sequelize(config.sequelize);

fs.readdirSync(__dirname)
    .filter(function (file) {
        return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
    })
    .forEach(function (file) {
        let model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
        db[model.name] = model;
    });

Object.keys(db).forEach(function (modelName) {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Op = Sequelize.Op;

module.exports = db;