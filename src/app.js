const express = require('express');
const jogosRoute = require('./routes/jogos-route');

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/jogos', jogosRoute);

const port = 3000;

app.listen(port, () => console.log(`Servidor rodando em http://localhost:${port}`));