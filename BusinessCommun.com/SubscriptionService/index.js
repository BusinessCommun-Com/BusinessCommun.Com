const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();

const premiumRoutes = require('./routes/premium');

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => res.send({ status: 'ok', message: 'BusinessCommun API' }));

app.use('/api/premium', premiumRoutes);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server listening on port ${port}`));
