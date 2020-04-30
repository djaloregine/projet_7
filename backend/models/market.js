'use strict';
module.exports = (sequelize, DataTypes) => {
  const Market = sequelize.define('Market', {
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    price: DataTypes.INTEGER,
    imageUrl: DataTypes.STRING,
    userID: DataTypes.INTEGER
  }, {});
  Market.associate = function(models) {
    // associations can be defined here
    
    models.Market.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    })
  };
  return Market;
};