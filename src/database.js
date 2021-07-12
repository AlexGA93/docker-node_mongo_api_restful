const mongoose = require('mongoose');
require('dotenv').config();

 const db = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_CLUSTER}@cluster0.bjksy.mongodb.net/${process.env.MONGO_DATABASE}?retryWrites=true&w=majority`;

// console.log(db);

mongoose.connect(db,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
})
.then(db => console.log(`connected to `, db.connection.host))
.catch(err => console.error(err));
