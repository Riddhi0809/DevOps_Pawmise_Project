const express = require('express');
const router = express.Router();
const visitController = require('../controllers/visitController');

router.post('/', visitController.createVisit);
router.get('/', visitController.getAllVisits);

module.exports = router;
