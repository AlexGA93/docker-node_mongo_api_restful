const express = require('express');
const app = express();

const routes = require('./routes/api/user');

require('dotenv').config()
require('./database');


app.get('/', (req,res)=>{res.send('Welcome World!')});

app.use(express.urlencoded({extended:false}));
app.use(express.json());

//Routes
app.use('/user', routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {console.log(`Server listening at port ${PORT}`)});