'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserWallet extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  UserWallet.init({
    cryptoName: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    walletAddress: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'UserWallet',
  });
  return UserWallet;
};