const customerController = require("../controllers/customerController");
// const supplierController = require("../controller/supplierController");
const router = require("express").Router();

router.post("/addCustomer", customerController.addCustomer);
// router.post("/addSupplier", supplierController.addSupplier);

module.exports = router;
