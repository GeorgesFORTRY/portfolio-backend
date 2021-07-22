const projectsRouter = require('express').Router();
const { db } = require('../db-config');

projectsRouter.get('/', async (req, res) => {
  try {
    const [rows] = await db.query(
      'SELECT id, label, imgSrc, imgAlt, subtext, date, link FROM projects ORDER BY date DESC'
    );
    res.status(200).json(rows);
  } catch (err) {
    res.status(400).send(err);
  }
});

projectsRouter.get('/:id', async (req, res) => {
  const { id } = req.params;
  const sql =
    'SELECT label, imgSrc, imgAlt, subtext, date, link FROM projects WHERE id = ?';
  const sqlValues = [id];
  try {
    const [results] = await db.query(sql, sqlValues);
    res.status(200).json(results);
  } catch (err) {
    res.status(400).send(err);
  }
});

projectsRouter.post('/', async (req, res) => {
  const { label, imgSrc, imgAlt, subtext, date, link } = req.body;
  const sql =
    'INSERT INTO projects (label, imgSrc, imgAlt, subtext, date, link) VALUES(?,?,?,?,?,?)';
  const sqlValues = [label, imgSrc, imgAlt, subtext, date, link];
  try {
    const [results] = await db.query(sql, sqlValues);
    res.status(201).json(results);
  } catch (err) {
    res.status(400).send(err);
  }
});

projectsRouter.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { label, imgSrc, imgAlt, subtext, date, link } = req.body;
  const sql =
    'UPDATE projects SET label = ?, imgSrc = ?, imgAlt = ?, subtext = ?, date = ?, link = ? WHERE id = ?';
  const sqlValues = [label, imgSrc, imgAlt, subtext, date, link, id];
  try {
    const [results] = await db.query(sql, sqlValues);
    res.status(201).json(results);
  } catch (err) {
    res.status(400).send(err);
  }
});

projectsRouter.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM projects WHERE id=?';
  const sqlValues = [id];
  try {
    const [results] = await db.query(sql, sqlValues);
    res.json(results);
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = projectsRouter;
