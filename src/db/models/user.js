'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    mobile: DataTypes.STRING,
    encryptedRequest: DataTypes.STRING,
    requestDate: DataTypes.STRING,
    encryptedFiuId: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};