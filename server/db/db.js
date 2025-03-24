import sqlite3 from 'sqlite3';

// Ouvrir la base de données SQLite
const db = new sqlite3.Database('dbChatMih.db', (err) => {
  if (err) {
    console.error('Erreur de connexion à la base de données', err.message);
  } else {
    console.log('Connexion à la base de données SQLite réussie');
  }
});

export default db;