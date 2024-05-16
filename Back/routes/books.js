const express = require('express');
const tools = require('../tools');
const morgan = require('morgan');
const path = require('path');

const router = express.Router()
const logger = morgan(':method :url (:status)');

// Avec Morgan on affiche les logs des requetes
router.use((req, res, next) => {
  logger(req, res, () => {
    console.log(`${req.method} ${req.url} (${res.statusCode})`);
    next();
  });
});


//------------------------------------------------------------------
//--------------------BOOKS-----------------------------------------
//------------------------------------------------------------------

router.get('/', async (req, res) => {
    await tools.SendFileContent(path.join(__dirname, '../jsonFiles/books-available.json'), res, 200);
});
router.post('/', async (req, res) => {
    //todo
});


module.exports = router;

