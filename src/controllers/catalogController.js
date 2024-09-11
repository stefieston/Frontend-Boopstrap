const path = require('path');

exports.getCatalogPage = (req, res) => {
  res.sendFile(path.join(__dirname, '../views/catalog.html'));
};