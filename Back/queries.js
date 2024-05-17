const {db} = require('./database');
const UpdateOperation = {
    INCREASE: 'increase',
    DECREASE: 'decrease',
  };
  
//-------------------------------------------------------------------------------------------------------
const reqAllBooks = 'SELECT * FROM livre';
const reqBookById = 'SELECT * FROM livre WHERE id = ?';
const reqBookByName = 'SELECT * FROM livre WHERE nom = ?';
const reqBookByAuthor = 'SELECT * FROM livre WHERE auteur = ?';
const reqBookByGenre = 'SELECT * FROM livre WHERE genre = ?';
const reqInsertBook = 'INSERT INTO livre (nom, auteur, genre, description, quantity) VALUES (?, ?, ?, ?, ?)';
const reqIncreaseBookQuantity = 'UPDATE livre SET quantity = quantity + ? WHERE id = ?';
const reqDecreaseBookQuantity = 'UPDATE livre SET quantity = quantity - ? WHERE id = ?';
//-------------------------------------------------------------------------------------------------------

async function getBookById(id) {
    return new Promise((resolve, reject) => {
      db.get(reqBookById, [id], (err, row) => {
        err ? reject(err) : resolve(row);
      });
    });
  }
  
async function getAllBooks() {
  return new Promise((resolve, reject) => {
    db.all(reqAllBooks, (err, rows) => {
      err ? reject(err) : resolve(rows);
    });
  });
}
async function getBookByName(nom) {
  return new Promise((resolve, reject) => {
    db.get(reqBookByName, [nom], (err, row) => {
      err ? reject(err) : resolve(row);
    });
  });
}  

async function updateBookQuantity(operation, quantity, id) {
    let reqUpdateBookQuantity;
    if (operation === UpdateOperation.INCREASE) {
      reqUpdateBookQuantity = reqIncreaseBookQuantity;
    } else if (operation === UpdateOperation.DECREASE) {
      reqUpdateBookQuantity = reqDecreaseBookQuantity;
    } else {
      throw new Error('Invalid operation');
    }
  
    return new Promise((resolve, reject) => {
      db.run(reqUpdateBookQuantity, [quantity, id], function (err) {
        if (err) {
          reject(err);
        } else {
          getBookById(id) 
            .then(updatedBook => resolve(updatedBook))
            .catch(error => reject(error));
        }
      });
    });
  }

  async function insertBook(nom, auteur, genre, description, quantity) {
    return new Promise((resolve) => {
      const insertQuery = db.prepare(reqInsertBook);
      insertQuery.run(nom, auteur, genre, description, quantity, (err) => {
        err ? resolve(false) : resolve(true);
      });
    });
  }
  
  
module.exports = {
    UpdateOperation,
    getBookById,
    getAllBooks,
    getBookByName,
    updateBookQuantity,
    insertBook
  };
  