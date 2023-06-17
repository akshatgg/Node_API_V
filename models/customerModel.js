module.exports = (sequelize, DataTypes) => {
  const Customer = sequelize.define("customer", {
    gst_in_no: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    party_name: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    phone_no: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    address: {
      type: DataTypes.STRING,
    },
  });

  return Customer;
};
