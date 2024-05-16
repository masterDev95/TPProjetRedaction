const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('bibliotheque.db');

function initDatabase() {
    return new Promise((resolve, reject) => {
      db.serialize(() => {
        // Table des Livres
        db.run(`
          CREATE TABLE IF NOT EXISTS livre (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nom TEXT,
            auteur TEXT,
            genre TEXT,
            description TEXT,
            quantity INTEGER
          )
        `, (err) => {err ? reject(err) : resolve();});
      });
    });
  }
  

module.exports = {
  db,
  initDatabase
};
