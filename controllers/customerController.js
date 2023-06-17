const db = require("../models");

//create main model

const Customer = db.customers;

//create customer route

const addCustomer = async (req, res) => {
  let info = {
    gst_in_no: req.body.gst_in_no,
    party_name: req.body.party_name,
    phone_no: req.body.phone_no,

    address: req.body.address,
  };
  const customer = await Customer.create(info);

  res.status(200).send(customer);
  console.log(customer);
};
module.exports = {
  addCustomer,
};
