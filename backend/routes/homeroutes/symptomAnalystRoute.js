const express = require('express');
const { SymptomAnalyst } = require('../../controller/homecontroller/symptomAnalystController');
const symptomAnalystRouter = express.Router();


symptomAnalystRouter.post('/symptom-analyst' , SymptomAnalyst)



module.exports = symptomAnalystRouter;


