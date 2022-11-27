const http = require("http");

const server = http.createServer((request, response) => {
  response.write("Começou!");
  response.end();
});

server.listen(3000);
