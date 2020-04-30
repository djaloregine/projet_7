'use strict';
module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define('Message', {
    text: DataTypes.STRING,
    userID: DataTypes.INTEGER
  }, {});
  Message.associate = function(models) {
    // associations can be defined here

    models.Message.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    })
  };
  return Message;
};