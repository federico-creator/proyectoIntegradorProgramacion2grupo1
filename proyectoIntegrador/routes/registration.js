let express = require('express');
let router = express.Router();
let registrationControllers = require("../controllers/registrationControllers")

/* GET registration page. */
router.get('/', registrationControllers.index);

module.exports = router;