const express = require('express');
const router = express.Router();

router.get('/:categoryId/products/:productId', (req, res)=>{
  const {categoryId} = req.params;
  const {productId} = req.params;

  res.json({
    categoryId,
    productId
  })
})

module.exports = router;
