'use strict';
module.exports = (sequelize, DataTypes) => {
  const Item = sequelize.define('Item', {
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    price: DataTypes.INTEGER,
    imageUrl: DataTypes.STRING,
    userID: DataTypes.INTEGER
  }, {});
  Item.associate = function(models) {
    // associations can be defined here
    
    models.Item.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    })
  };
  return Item;
};