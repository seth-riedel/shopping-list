const express = require('express');
const { celebrate, Joi, errors, Segments } = require('celebrate');
const db = require('../lib/db');

const router = express.Router();

const updateableFields = ['name', 'notes', 'quantity'];

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

router.post(
  '/item', 
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      id: Joi.number().optional().min(1).allow(null),
      name: Joi.string().required(),
      notes: Joi.string().optional().allow(null, ''),
      quantity: Joi.number().optional().min(1).max(99).default(1),
    }),
  }),
  upsertItem,
);

router.get('/item', async (req, res) => {
  const results = await getItems();
  res.send(results);
});

router.post(
  '/item/complete', 
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      id: Joi.number().required().min(1),
      complete: Joi.boolean().required(),
    }),
  }),
  async (req, res) => {
    const { id, complete } = req.body;
    await db.query('UPDATE items SET completed = ? WHERE id = ? AND user_id = ?', [complete, id, userId]);
    res.end();
  },
);

module.exports = router;
