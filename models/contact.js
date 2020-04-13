module.exports = function (sequelize, DataTypes) {
  var Contact = sequelize.define("Contact", {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3],
      },
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3],
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1],
      },
    },
    phoneNumber: {
      type: DataTypes.INT,
      allowNull: false,
      validate: {
        len: [10],
      },
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
      len: [5],
    },
  });

  return Contact;
};
