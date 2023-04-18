const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database');

class LoanApplication extends Model {}

LoanApplication.init({
  loanType: {
    type: DataTypes.ENUM('business', 'personal', 'car', 'home', 'property'),
    allowNull: false,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  applicantName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('pending', 'approved', 'rejected'),
    allowNull: false,
    defaultValue: 'pending',
  },
  dateApplied: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  dateUpdated: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  bankName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  bankIfsc: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  bankAccountNo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  salaried: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  documents: {
    type: DataTypes.JSON,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'LoanApplication',
  timestamps: false,
});

module.exports = LoanApplication;
