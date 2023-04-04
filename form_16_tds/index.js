// const sdk = require('api')('@sandbox-docs/v2.0#axga842wkycr2fnc');
// const express = require('express');
// const bodyParser = require('body-parser');
// const mysql = require('mysql');
// const axios = require('axios');

// const app = express();
// const port = 3300;

// const db = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: '',
//   port: 3307, // change the port number to match your MySQL port
//   database: 'tds'
// });

// db.connect((err) => {
//     if (err) throw err;
//     console.log('Connected to database');
//   });
  
//   app.use(bodyParser.urlencoded({ extended: false }));
//   app.use(bodyParser.json());

//   app.post('/authenticate', (req, res) => {
//     const user_id = req.body.user_id
//     // const salt = bcrypt.genSaltSync(10);
//     // const hash = bcrypt.hashSync(req.body.password, salt);
//     const tan = req.body.tan
    
  
//     const headers = {
//         'Accept': 'application/json',
//         'Authorization': 'eyJhbGciOiJIUzUxMiJ9.eyJhdWQiOiJBUEkiLCJyZWZyZXNoX3Rva2VuIjoiZXlKaGJHY2lPaUpJVXpVeE1pSjkuZXlKaGRXUWlPaUpCVUVraUxDSnpkV0lpT2lKcGRHRjRaV0Z6ZVRFNVFHZHRZV2xzTG1OdmJTSXNJbUZ3YVY5clpYa2lPaUpyWlhsZmJHbDJaVjlFUjJONGIwVklWRTFWTVd4eFNVbFdkMnhtVFcxUU0yUnlaMjlUUlc5RE9DSXNJbWx6Y3lJNkltRndhUzV6WVc1a1ltOTRMbU52TG1sdUlpd2laWGh3SWpveE56RXlNRGcwTXpVeUxDSnBiblJsYm5RaU9pSlNSVVpTUlZOSVgxUlBTMFZPSWl3aWFXRjBJam94Tmpnd05EWXhPVFV5ZlEuYllNMFJpbTBNaWJHN1pVVVltX3huMmJQT09yNFgzZzNmeWZJTFVTYXUxSzFiUUVNcnhoRFpienprWW40QnI2QnczcHZnT2plc2U3MWtrOUFSTWk5RmciLCJzdWIiOiJpdGF4ZWFzeTE5QGdtYWlsLmNvbSIsImFwaV9rZXkiOiJrZXlfbGl2ZV9ER2N4b0VIVE1VMWxxSUlWd2xmTW1QM2RyZ29TRW9DOCIsImlzcyI6ImFwaS5zYW5kYm94LmNvLmluIiwiZXhwIjoxNjgwNTQ4MzUyLCJpbnRlbnQiOiJBQ0NFU1NfVE9LRU4iLCJpYXQiOjE2ODA0NjE5NTJ9.hJcUQndqKbRYrH_BZ727nT8Zx2VhtyQM7GHSOYefq1lQlNwetDdQnwewVaGQIWtf3mmtijMSjQfpRW8fiv1Nzw',
//         'Content-Type': 'application/json',
//         'x-api-key': 'key_live_DGcxoEHTMU1lqIIVwlfMmP3drgoSEoC8',
//         'x-api-version': '1.0.0'
//       };
      
//       const data = {
//         user_id: user_id,
//         password: req.body.password,
//         tan: tan
//       };
    
//       axios.post('https://api.sandbox.co.in/tds-compliance/traces/authenticate', data, { headers })
//     .then(response => {
//         const { access_token } = JSON.parse(body);
//         const sql = `INSERT INTO tds_details (user_id, tan) VALUES (?, ?)`;
//       const values = [user_id, tan];
  
//       db.query(sql, values, (err, result) => {
//         if (err) throw err;
//         console.log('1 record inserted');
  
//         res.status(200).json({
//             access_token
//         });
//       });
//     })
//     .catch(error => {
//         console.error(error);
//     });
  
//   });
  
//   app.listen(port, () => {
//     console.log(`Server running on port ${port}`);
//   });
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const { Sequelize, DataTypes } = require('sequelize');

const app = express();
const port = 3300;

const sequelize = new Sequelize('tds', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  port: 3307 // change the port number to match your MySQL port
});

const Authenticate = sequelize.define('authenticate', {
  user_id: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  tan: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

sequelize.sync()
  .then(() => console.log('Connected to database'))
  .catch((err) => console.error('Unable to connect to the database:', err));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/authenticate', async (req, res) => {
  const { user_id, password, tan } = req.body;

  try {
    const headers = {
      'Accept': 'application/json',
      'Authorization': 'eyJhbGciOiJIUzUxMiJ9.eyJhdWQiOiJBUEkiLCJyZWZyZXNoX3Rva2VuIjoiZXlKaGJHY2lPaUpJVXpVeE1pSjkuZXlKaGRXUWlPaUpCVUVraUxDSnpkV0lpT2lKcGRHRjRaV0Z6ZVRFNVFHZHRZV2xzTG1OdmJTSXNJbUZ3YVY5clpYa2lPaUpyWlhsZmJHbDJaVjlFUjJONGIwVklWRTFWTVd4eFNVbFdkMnhtVFcxUU0yUnlaMjlUUlc5RE9DSXNJbWx6Y3lJNkltRndhUzV6WVc1a1ltOTRMbU52TG1sdUlpd2laWGh3SWpveE56RXlNRGcwTXpVeUxDSnBiblJsYm5RaU9pSlNSVVpTUlZOSVgxUlBTMFZPSWl3aWFXRjBJam94Tmpnd05EWXhPVFV5ZlEuYllNMFJpbTBNaWJHN1pVVVltX3huMmJQT09yNFgzZzNmeWZJTFVTYXUxSzFiUUVNcnhoRFpienprWW40QnI2QnczcHZnT2plc2U3MWtrOUFSTWk5RmciLCJzdWIiOiJpdGF4ZWFzeTE5QGdtYWlsLmNvbSIsImFwaV9rZXkiOiJrZXlfbGl2ZV9ER2N4b0VIVE1VMWxxSUlWd2xmTW1QM2RyZ29TRW9DOCIsImlzcyI6ImFwaS5zYW5kYm94LmNvLmluIiwiZXhwIjoxNjgwNTQ4MzUyLCJpbnRlbnQiOiJBQ0NFU1NfVE9LRU4iLCJpYXQiOjE2ODA0NjE5NTJ9.hJcUQndqKbRYrH_BZ727nT8Zx2VhtyQM7GHSOYefq1lQlNwetDdQnwewVaGQIWtf3mmtijMSjQfpRW8fiv1Nzw',
      'Content-Type': 'application/json',
      'x-api-key': 'key_live_DGcxoEHTMU1lqIIVwlfMmP3drgoSEoC8',
      'x-api-version': '1.0.0'
    };
  
    const data = {
      user_id: user_id,
      password: password,
      tan: tan
    };
  
    const response = await axios.post('https://api.sandbox.co.in/tds-compliance/traces/authenticate', data, { headers });
    const { access_token } = response.data;
  
    // insert a new row into the Authenticate table
    const result = await Authenticate.create({
      user_id,
      password,
      tan
    });
  
    res.status(200).json({
      access_token
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

