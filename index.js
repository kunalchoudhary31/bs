const express = require('express');
const userRouter = require('./routers/user');
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

var log = console.log;

app.use(cors());

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
var swaggerUi = require('swagger-ui-express'),
    swaggerDocument = require('./swagger.json');

var models = require("./models");

models.sequelize.sync()
.then(() => {
    console.log('Database looks fine')
}).catch((err) => {
    console.log(err);
})
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api/v1',userRouter); //Registering the user router


const port =  process.env.PORT || 3000;
app.listen(port, (err,res) => {
    if(err){
        log("Error Occured =>" + err )
    }else{
        log(`Connection established on port ${port}`);
    }
})