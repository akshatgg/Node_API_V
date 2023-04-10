const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const request = require('request');
const axios = require('axios')

const app = express();
const port = 3300;

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  port: 3307, // change the port number to match your MySQL port
  database: 'itaxeasy'
});

db.connect((err) => {
  if (err) throw err;
  console.log('Connected to database');
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/aadhaar/verify', (req, res) => {
  const isConsent = req.body.consent;
  const reason = req.body.reason
  const aadhaar_number = req.body.aadhaar_number;

    axios.post(`https://api.sandbox.co.in/aadhaar/verify?consent=${isConsent}&reason=${encodeURIComponent(reason).replace(' ', '%20')}`, 
  {
    aadhaar_number: aadhaar_number
  }, 
  {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'eyJhbGciOiJIUzUxMiJ9.eyJhdWQiOiJBUEkiLCJyZWZyZXNoX3Rva2VuIjoiZXlKaGJHY2lPaUpJVXpVeE1pSjkuZXlKaGRXUWlPaUpCVUVraUxDSnpkV0lpT2lKcGRHRjRaV0Z6ZVRFNVFHZHRZV2xzTG1OdmJTSXNJbUZ3YVY5clpYa2lPaUpyWlhsZmJHbDJaVjlFUjJONGIwVklWRTFWTVd4eFNVbFdkMnhtVFcxUU0yUnlaMjlUUlc5RE9DSXNJbWx6Y3lJNkltRndhUzV6WVc1a1ltOTRMbU52TG1sdUlpd2laWGh3SWpveE56RXlNRGcwTXpVeUxDSnBiblJsYm5RaU9pSlNSVVpTUlZOSVgxUlBTMFZPSWl3aWFXRjBJam94Tmpnd05EWXhPVFV5ZlEuYllNMFJpbTBNaWJHN1pVVVltX3huMmJQT09yNFgzZzNmeWZJTFVTYXUxSzFiUUVNcnhoRFpienprWW40QnI2QnczcHZnT2plc2U3MWtrOUFSTWk5RmciLCJzdWIiOiJpdGF4ZWFzeTE5QGdtYWlsLmNvbSIsImFwaV9rZXkiOiJrZXlfbGl2ZV9ER2N4b0VIVE1VMWxxSUlWd2xmTW1QM2RyZ29TRW9DOCIsImlzcyI6ImFwaS5zYW5kYm94LmNvLmluIiwiZXhwIjoxNjgwNTQ4MzUyLCJpbnRlbnQiOiJBQ0NFU1NfVE9LRU4iLCJpYXQiOjE2ODA0NjE5NTJ9.hJcUQndqKbRYrH_BZ727nT8Zx2VhtyQM7GHSOYefq1lQlNwetDdQnwewVaGQIWtf3mmtijMSjQfpRW8fiv1Nzw',
      'x-api-key': 'key_live_DGcxoEHTMU1lqIIVwlfMmP3drgoSEoC8',
      "x-api-version": '1.0.0'
    }
  })
  .then(response => {
    console.log(response.data);
    const sql = `INSERT INTO aadhaar_verification (aadhaar_number) VALUES (?)`;
    const values = [aadhaar_number];
    db.query(sql, values, (err, result) => {
      if (err) throw err;
      console.log('1 record inserted');

      res.status(200).json({
        aadhaar_number
      });
    });
  })
  .catch(error => {
    console.error(error);
  });
  
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
