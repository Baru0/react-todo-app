const express = require('express');
const router = express.Router();


router.get('/todos', (req,res) => {
    res.json([{action: "Hardcoded todo 1"}, {action: "Hardcoded todo 2"}])
});
  

module.exports = router;