const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = require("./app");
const crypto = require('crypto')

dotenv.config({ path : './dev.env'})

const DATABASE_ENDPOINT = `mongodb+srv://${process.env.USERNAME_DB}:${process.env.PASSWORD_DB}@gameslistapisiteuserbas.lzmpf7c.mongodb.net/?retryWrites=true&w=majority`

mongoose
    .connect(DATABASE_ENDPOINT)
    .then((connected) => console.log('connected to DB'))
    .catch((err) => console.log('err cant connect to DB'));

    const port = process.env.PORT || 3030;
    
app.listen(port , () => console.log(`Runing on port*: ${port}`));