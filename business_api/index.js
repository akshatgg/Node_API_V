// const express = require('express');
// const bodyParser = require('body-parser');
// const mysql = require('mysql');

// const app = express();
// const port = 3300;

// const db = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: '',
//   port: 3307, // change the port number to match your MySQL port
//   database: 'buisness'
// });

// db.connect((err) => {
//   if (err) throw err;
//   console.log('Connected to database');
// });

// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());

// app.post('/profile', (req, res) => {
//     const { name, pan_num, tan_num, msme_num, gst_num, bank_acc_num, bank_acc_det, incorporation_certifaction } = req.body;

//     // insert a new plan into the plans table
//   db.query('INSERT INTO business_det (name, pan_num, tan_num, msme_num, gst_num, bank_acc_num, bank_acc_det, incorporation_certifaction) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [name, pan_num, tan_num, msme_num, gst_num, bank_acc_num, bank_acc_det, incorporation_certifaction], (error, results, fields) => {
//     if (error) {
//       throw error;
//     }
//     // send a success message as a response
//     res.json(results);
//   });
// });

// app.listen(port, () => {
//   console.log(`Server running on port ${port}`);
// });
const express = require('express');
const bodyParser = require('body-parser');
const { Sequelize, DataTypes } = require('sequelize');

const app = express();
const port = 3300;

const sequelize = new Sequelize('buisness', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  port: 3307 // change the port number to match your MySQL port
});

const BusinessDet = sequelize.define('business_det', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  pan_num: {
    type: DataTypes.STRING,
    allowNull: false
  },
  tan_num: {
    type: DataTypes.STRING,
    allowNull: false
  },
  msme_num: {
    type: DataTypes.STRING,
    allowNull: false
  },
  gst_num: {
    type: DataTypes.STRING,
    allowNull: false
  },
  bank_acc_num: {
    type: DataTypes.STRING,
    allowNull: false
  },
  bank_acc_det: {
    type: DataTypes.STRING,
    allowNull: false
  },
  incorporation_certifaction: {
    type: DataTypes.STRING,
    allowNull: false
  }
},
{
  sequelize,
  tableName: 'business_det',
  timestamps: false
}
);

sequelize.sync()
  .then(() => console.log('Connected to database'))
  .catch((err) => console.error('Unable to connect to the database:', err));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/profile', async (req, res) => {
  const { name, pan_num, tan_num, msme_num, gst_num, bank_acc_num, bank_acc_det, incorporation_certifaction } = req.body;

  try {
    // insert a new row into the BusinessDet table
    const result = await BusinessDet.create({
      name,
      pan_num,
      tan_num,
      msme_num,
      gst_num,
      bank_acc_num,
      bank_acc_det,
      incorporation_certifaction
    });

    // send the newly created row as a response
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

