const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./projectors.db');

db.serialize(() => {
db.run(`CREATE TABLE IF NOT EXISTS users (
id INTEGER PRIMARY KEY AUTOINCREMENT,
email TEXT UNIQUE,
password TEXT,
role TEXT DEFAULT 'student'
)`);

db.run(`CREATE TABLE IF NOT EXISTS projectors (
id INTEGER PRIMARY KEY AUTOINCREMENT,
name TEXT,
available INTEGER DEFAULT 1
)`);

db.run(`CREATE TABLE IF NOT EXISTS reservations (
id INTEGER PRIMARY KEY AUTOINCREMENT,
userId INTEGER,
projectId INTEGER,
date TEXT
)`);
});

module.exports = db;