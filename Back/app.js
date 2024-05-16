const express = require('express');
const app = express();
const cors = require('cors'); //facilite l'acces depuis le front

const PORT = 3000;
const HOST = '0.0.0.0';

const corsOptions = {
    origin: '*', 
    credentials: true,
    optionSuccessStatus: 200,
};

app.use(cors(corsOptions));


const books = require('./routes/books')
app.use('/books',books);


app.listen(PORT, HOST, () => {
  console.log(`Running on http://${HOST}:${PORT}`);
});