const express = require('express');
const app = express();
const port = 3000;

const dataHandler = require('./dataHandler');

//Split out routes into separate files
const api = require('./routes/api');


//Making all the public stuff public
app.use(express.static('public',{extensions:['html']}));
app.use('/api',api);

app.listen(port, () => {
    console.log('App launched at port ' + port);
});