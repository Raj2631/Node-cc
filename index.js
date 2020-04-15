const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
  // if (req.url === '/') {
  //   // Adding a content type.
  //   fs.readFile(
  //     path.join(__dirname, 'public', 'index.html'),
  //     (err, content) => {
  //       if (err) throw err;
  //       res.writeHead(200, { 'Content-Type': 'text/html' });
  //       res.end(content);
  //     }
  //   );
  // }
  // if (req.url === '/about') {
  //   fs.readFile(
  //     path.join(__dirname, 'public', 'about.html'),
  //     (err, content) => {
  //       if (err) throw err;
  //       res.writeHead(200, { 'Content-Type': 'text/html' });
  //       res.end(content);
  //     }
  //   );
  // }

  // if (req.url === '/api/users') {
  //   const users = [
  //     { name: 'Bob Smith', age: 40 },
  //     { name: 'John Doe', age: 20 }
  //   ];
  //   res.writeHead(200, { 'Content-Type': 'application/json' });
  //   res.end(JSON.stringify(users));
  // }

  //Build filePath
  let filePath = path.join(
    __dirname,
    'public',
    req.url === '/' ? 'index.html' : req.url
  );
  console.log(req.url);
  let extName = path.extname(filePath);

  // Initial content type.
  let contentType = 'text/html';

  // Change content Type based on extension.
  switch (extName) {
    case '.js':
      contentType = 'text/javascript';
      break;
    case '.css':
      contentType = 'text/css';
      break;
    case '.json':
      contentType = 'application/json';
      break;
    case '.png':
      contentType = 'image/png';
      break;
    case '.jpg':
      contentType = 'image/jpg';
      break;
  }

  // Read File.
  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code == 'ENOENT') {
        //Page not found.
        fs.readFile(
          path.join(__dirname, 'public', 'error.html'),
          (err, content) => {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf8');
          }
        );
      } else {
        res.writeHead(500);
        res.end(`Server error: ${err.code}`);
      }
    } else {
      // Success.
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf8');
    }
  });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));
