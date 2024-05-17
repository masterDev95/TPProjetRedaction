const express = require('express');
const morgan = require('morgan');
const queries = require('../queries');
const bodyParser = require('body-parser');
const cors = require('cors');
const router = express.Router()
const logger = morgan(':method :url (:status)');

// Avec Morgan on affiche les logs des requetes dans la console
router.use((req, res, next) => {
  logger(req, res, () => {
    console.log(`${req.method} ${req.url} (${res.statusCode})`);
    next();
  });
});

router.use(bodyParser.urlencoded({ extended: true }));
const corsOptions = {
  origin: '*',
  credentials: true,
  optionSuccessStatus: 200,
};
router.use(cors(corsOptions));
//#region Constants
//-------------------------------------------------------------------------------------------------------
const handleServerError = (res, error) => { res.status(500).send({ "Error": "Internal Server Error", "Message": error.message }); };
const handleMissingFieldsError = (res) => { res.status(400).send({ "Error": "Bad Request", "Message": "Missing required fields" }); };
const handleExistingBookError = (res) => { res.status(409).send({ "Error": "Conflict", "Message": "A book with the same name already exists" }); };
const handleInvalidQuantityError = (res) => { res.status(400).send({ "Error": "Bad Request", "Message": "Invalid quantity" }); };
const handleBookNotFound = (res) => { res.status(404).send({ "Error": "Not Found", "Message": "Book not found" }); };
const handleBookAdded = (res) => { res.status(201).send({ "Success": "Book inserted successfully" }); };
const handleBookInsertFailed = (res) => { res.status(500).send({ "Error": "Failed to insert book" }); };
const handleDecreaseQuantityGreaterThanAvailable = (res) => { res.status(400).send({ "Error": "Bad Request", "Message": "Quantity to decrease is greater than available quantity" }); };
//-------------------------------------------------------------------------------------------------------

//#region Get All Books

//Recupération de tout les livres dans la bdd
router.get('/', async (req, res) => {
  try {
    res.status(200).send(await queries.getAllBooks());
  } catch (error) {
    handleServerError(res, error);
  }
});

//#region Post one book

//Permet l'ajout dans la base de donnée d'un livre
router.post('/', async (req, res) => {
  try {
    const { nom, auteur, genre, description, quantity } = req.body;

    // On verifie que tout les champs existent
    if (!nom || !auteur || !genre || !description || !quantity) {
      return handleMissingFieldsError(res);
    }

    const existingBook = await queries.getBookByName(nom);
    if (existingBook) {
      return handleExistingBookError(res);
    }

    const isSuccess = await queries.insertBook(nom, auteur, genre, description, quantity);
    isSuccess ? handleBookAdded(res) : handleBookInsertFailed(res);

  } catch (error) {
    handleServerError(res, error);
  }
});

//#region Increase book quantity

// Permet d'augmenter la quantité d'un livre
router.put('/increase', async (req, res) => {
  try {
    const { id,quantityIncrement  } = req.body;
    if (!id || !quantityIncrement ) {
      return handleMissingFieldsError(res);
    }
    // Check si la quantité est un nombre positif
    if (isNaN(quantityIncrement ) || parseInt(quantityIncrement ) <= 0) {
      return handleInvalidQuantityError(res);
    }

    const book = await queries.getBookById(id);
    if (!book) {
      return handleBookNotFound(res);
    }

    const updatedBook = await queries.updateBookQuantity(queries.UpdateOperation.INCREASE, quantityIncrement , id);
    res.status(200).send(updatedBook);
  } catch (error) {
    handleServerError(res, error);
  }
});

//#region Decrease book quantity

// Permet de diminuer la quantité d'un livre
router.put('/decrease', async (req, res) => {
  try {
    const { id,quantityDecrement   } = req.body;
    if (!id || !quantityDecrement ) {
      return handleMissingFieldsError(res);
    }
    // Check si la quantité est un nombre positif
    if (isNaN(quantityDecrement ) || parseInt(quantityDecrement ) <= 0) {
      return handleInvalidQuantityError(res);
    }

    const book = await queries.getBookById(id);
    if (!book) {
      return handleBookNotFound(res);
    }
    // Check si la quantité à réduire est supérieure à la quantité disponible
    if (quantityDecrement  > book.quantity) {
      return handleDecreaseQuantityGreaterThanAvailable(res);
    }
    const updatedBook = await queries.updateBookQuantity(queries.UpdateOperation.DECREASE, quantityDecrement , id);
    res.status(200).send(updatedBook);
  } catch (error) {
    handleServerError(res, error);
  }
});


module.exports = router;