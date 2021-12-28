const express = require('express');
const cors = require('cors');
const routerApi = require('./routes')

const {logErrors, errorHandler, boomErrorHandler} = require('./middlewares/error.hendler.')

const app = express();
const port = 3000;

app.use(express.json());

const whitelist = ['http://localhost:8080', 'https://myapp.com']
const options = {
  origin: (origin, callback)=>{
    if (whitelist.includes(origin)){
      callback(null, true)
    }else{
      callback(new Error('No permitido'))
    }
  }
}
app.use(cors(options))

routerApi(app);

app.use(logErrors)
app.use(boomErrorHandler)
app.use(errorHandler)
const swaggerUi = require('swagger-ui-express'),
swaggerDocument = require('./swagger.json');
app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument)
);
app.listen(port, ()=>{
  console.log("Estoy corriendo")
})
