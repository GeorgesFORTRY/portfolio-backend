const skillsRouter = require('express').Router();
const { db } = require('../db-config');

skillsRouter.get('/', async (req, res) => {
  try {
    const [rows] = await db.query(
      'SELECT id, label, logoSrc, logoAlt FROM skills ORDER BY RAND()'
    );
    res.status(200).json(rows);
  } catch (err) {
    res.status(400).send(err);
  }
});

skillsRouter.get('/:id', async (req, res) => {
  const { id } = req.params;
  const sql = 'SELECT label, logoSrc, logoAlt FROM skills WHERE id = ?';
  const sqlValues = [id];
  try {
    const [results] = await db.query(sql, sqlValues);
    res.status(200).json(results);
  } catch (err) {
    res.status(400).send(err);
  }
});

skillsRouter.post('/', async (req, res) => {
  const { label, logoSrc, logoAlt } = req.body;
  const sql = 'INSERT INTO skills (label, logoSrc, logoAlt) VALUES(?,?,?)';
  const sqlValues = [label, logoSrc, logoAlt];
  try {
    const [results] = await db.query(sql, sqlValues);
    res.status(201).json(results);
  } catch (err) {
    res.status(400).send(err);
  }
});

skillsRouter.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { label, logoSrc, logoAlt } = req.body;
  const sql =
    'UPDATE skills SET label = ?, logoSrc = ?, logoAlt = ? WHERE id = ?';
  const sqlValues = [label, logoSrc, logoAlt, id];
  try {
    const [results] = await db.query(sql, sqlValues);
    res.status(201).json(results);
  } catch (err) {
    res.status(400).send(err);
  }
});

skillsRouter.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM skills WHERE id=?';
  const sqlValues = [id];
  try {
    const [results] = await db.query(sql, sqlValues);
    res.json(results);
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = skillsRouter;
