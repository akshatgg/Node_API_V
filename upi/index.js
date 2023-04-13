const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const { Sequelize, Model, DataTypes } = require('sequelize');

const app = express();
const port = 3300;

const sequelize = new Sequelize('upi', 'root', '', {
  host: 'localhost',
  port: 3307, // change the port number to match your MySQL port
  dialect: 'mysql'
});

class UpiDetails extends Model {}
UpiDetails.init({
  upi_address: {
    type: DataTypes.STRING,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'upi_details',
  tableName: 'upi_details',
  timestamps: false
});

sequelize.authenticate()
  .then(() => {
    console.log('Connected to database');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/upi', (req, res) => {
  const upiAddress = req.body.upi_address;
  const name = req.body.name;
  console.log(upiAddress)

  const options = {
    method: 'GET',
    url: `https://api.sandbox.co.in/bank/upi/${upiAddress}`,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'eyJhbGciOiJIUzUxMiJ9.eyJhdWQiOiJBUEkiLCJyZWZyZXNoX3Rva2VuIjoiZXlKaGJHY2lPaUpJVXpVeE1pSjkuZXlKaGRXUWlPaUpCVUVraUxDSnpkV0lpT2lKcGRHRjRaV0Z6ZVRFNVFHZHRZV2xzTG1OdmJTSXNJbUZ3YVY5clpYa2lPaUpyWlhsZmJHbDJaVjlFUjJONGIwVklWRTFWTVd4eFNVbFdkMnhtVFcxUU0yUnlaMjlUUlc5RE9DSXNJbWx6Y3lJNkltRndhUzV6WVc1a1ltOTRMbU52TG1sdUlpd2laWGh3SWpveE56RXlNRGcwTXpVeUxDSnBiblJsYm5RaU9pSlNSVVpTUlZOSVgxUlBTMFZPSWl3aWFXRjBJam94Tmpnd05EWXhPVFV5ZlEuYllNMFJpbTBNaWJHN1pVVVltX3huMmJQT09yNFgzZzNmeWZJTFVTYXUxSzFiUUVNcnhoRFpienprWW40QnI2QnczcHZnT2plc2U3MWtrOUFSTWk5RmciLCJzdWIiOiJpdGF4ZWFzeTE5QGdtYWlsLmNvbSIsImFwaV9rZXkiOiJrZXlfbGl2ZV9ER2N4b0VIVE1VMWxxSUlWd2xmTW1QM2RyZ29TRW9DOCIsImlzcyI6ImFwaS5zYW5kYm94LmNvLmluIiwiZXhwIjoxNjgwNTQ4MzUyLCJpbnRlbnQiOiJBQ0NFU1NfVE9LRU4iLCJpYXQiOjE2ODA0NjE5NTJ9.hJcUQndqKbRYrH_BZ727nT8Zx2VhtyQM7GHSOYefq1lQlNwetDdQnwewVaGQIWtf3mmtijMSjQfpRW8fiv1Nzw',
      'x-api-key': 'key_live_DGcxoEHTMU1lqIIVwlfMmP3drgoSEoC8',
      "x-api-version": '1.0.0'
    }
  };

  request(options, (error, response, body) => {
    if (error) throw new Error(error);
    console.log(body)
    const { transaction_id, data: { account_exists, name_at_bank } } = JSON.parse(body);

    UpiDetails.create({
      upi_address: upiAddress,
      name: name
    })
      .then(() => {
        console.log('1 record inserted');

        res.status(200).json({
          transaction_id,
          account_exists,
          name_at_bank
        });
      })
      .catch(err => {
        console.error('Unable to insert record:', err);
        res.status(500).json({
          error: 'Unable to insert record'
        });
      });
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});


