// ===== MODULES ===============================================================
var express = require('express');

const router = express.Router();

// http://localhost:5000/basicInfoPage/
router.get('/', (_, res) => {
  res.render('./index', {
    demo: process.env.DEMO,
    listId: null,
  });
});

// http://localhost:5000/basicInfoPage/idexample1
router.get('/:id', (req, res) => {
  res.render('./index', {
    demo: process.env.DEMO,
    listId: req.params.id,
  });
});

module.exports = router;
