const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Middleware to parse the body of the request
app.use(express.static(path.join(__dirname, 'public')));

const routes = require('./routes/routes');

app.use('/', routes);

// Start Server
app.listen(port, () => {
	console.log(`Server running on http://localhost:${port}`);
});