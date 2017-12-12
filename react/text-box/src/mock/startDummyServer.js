var jsonServer = require('json-mock');

var server = jsonServer.create();
server.use(jsonServer.defaults);
server.use(jsonServer.router('src/mock/db.json'));

server.listen(9000);
