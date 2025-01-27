const express = require('express');
const helmet = require('helmet');
const app = express();


app.use(helmet.hidePoweredBy());
app.use(helmet.frameguard({action: 'deny'}));
app.use(helmet.xssFilter());
app.use(helmet.noSniff());
app.use(helmet.ieNoOpen());

//const ninetyDaysInSeconds = 90*24*60*60;
const ninetyDaysInSeconds = 7776000;
const timeInSeconds = ninetyDaysInSeconds;
app.use(helmet.hsts({maxAge: timeInSeconds, force: true})); 
app.use(helmet.dnsPrefetchControl());
app.use(helmet.noCache());

app.use(helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ["'self'"],
    scriptSrc: ["'self'", 'trusted-cdn.com']
  }
}));

// Configure Helmet middleware using a configuration object
app.use(helmet({
  frameguard: {         // configure
    action: 'deny'
  },
// Specify the options for individual middleware
  contentSecurityPolicy: {    // enable and configure
    // Enable contentSecurityPolicy middleware
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ['style.com'],
    }
  },
  dnsPrefetchControl: false,     // disable
  noCache: true, // Enable noCache middleware
}))




































module.exports = app;
const api = require('./server.js');
app.use(express.static('public'));
app.disable('strict-transport-security');
app.use('/_api', api);
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});
let port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`🥦 Useful Programmer Info Security App Started on Port ${port}`);
});
