'use strict';
module.exports = (sequelize, DataTypes) => {
  const Media = sequelize.define('Media', {
    mediaUrl: DataTypes.STRING,
    userID: DataTypes.INTEGER
  }, {});
  Media.associate = function(models) {
    // associations can be defined here

    models.Media.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    })
  };
  return Media;
};