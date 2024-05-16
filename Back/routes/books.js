const express = require('express');
const tools = require('../tools');
const morgan = require('morgan');
const path = require('path');
const { db } = require('../database');
const bodyParser = require('body-parser');

const router = express.Router()
const logger = morgan(':method :url (:status)');

// Avec Morgan on affiche les logs des requetes
router.use((req, res, next) => {
  logger(req, res, () => {
    console.log(`${req.method} ${req.url} (${res.statusCode})`);
    next();
  });
});

router.use(bodyParser.urlencoded({ extended: true }));


//------------------------------------------------------------------
//--------------------BOOKS-----------------------------------------
//------------------------------------------------------------------

router.get('/', async (req, res) => {
  try {
    const rows = await new Promise((resolve, reject) => {
      db.all('SELECT * FROM livre', (err, rows) => {
        err ? reject(err) : resolve(rows);
      });
    });
    res.status(200).send(rows);
  } catch (error) {
    res.status(500).send({ "Error": "Internal Server Error", "Message": error.message });
  }
});


router.post('/', async (req, res) => {
  try {
    const { nom, auteur, genre, description, quantity } = req.body;

    // On verifie que tout les champs existent
    if (!nom || !auteur || !genre || !description || !quantity) {
      return res.status(400).send({ "Error": "Bad Request", "Message": "Missing required fields" });
    }

    // On verifie si le le livre existe deja
    const existingBook = await new Promise((resolve, reject) => {
      db.get('SELECT * FROM livre WHERE nom = ?', [nom], (err, row) => {
        err ? reject(err) : resolve(row);});
    });

    if (existingBook) {
      return res.status(409).send({ "Error": "Conflict", "Message": "A book with the same name already exists" });
    }

    // Insérer les données dans la table "livre"
    const result = await new Promise((resolve, reject) => {
      const insertQuery = db.prepare("INSERT INTO livre (nom, auteur, genre, description, quantity) VALUES (?, ?, ?, ?, ?)");
      insertQuery.run(nom, auteur, genre, description, quantity, (err) => {
        err ? reject(err) : resolve({ "Success": true, "Message": "Book inserted successfully" });
      });
    });

    res.status(201).send(result);
  } catch (error) {
    res.status(500).send({ "Error": "Internal Server Error", "Message": error.message });
  }
});



module.exports = router;

