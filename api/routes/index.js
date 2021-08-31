const express = require('express');
const db = require('../lib/db');

const router = express.Router();

const updateableFields = ['name', 'notes', 'quantity', 'completed'];

// @TODO: this should come from a secure place
const userId = 1;

const getItems = async () => (
  db.query('SELECT id, name, notes, quantity, completed FROM items WHERE user_id = ?', [userId])
);

const upsertItem = async (req, res) => {
  const itemData = req.body;
  const acceptableFields = Object.keys(itemData)
    .filter((field) => updateableFields.includes(field));

  const params = acceptableFields
    .map((field) => itemData[field]);

  if (!params.length) {
    // @TODO: this should be a 401, no data provided to insert/update
    throw new Error();
  }

  // update or insert
  if (itemData.id) {
    const sets = acceptableFields.map((field) => `${field} = ?`);
    const updateQuery = `UPDATE items SET ${sets.join(', ')} WHERE id = ? AND user_id = ?`;
    await db.query(updateQuery, [...params, itemData.id, userId]);
  } else {
    await db.query(
      'INSERT INTO items (name, notes, quantity, user_id) VALUES (?, ?, ?, ?)',
      [itemData.name, itemData.notes, itemData.quantity, userId],
    );
  }

  const items = await getItems();
  res.json(items);
};

router.post('/item', upsertItem);

router.get('/item', async (req, res) => {
  const results = await getItems();
  res.send(results);
});

module.exports = router;
