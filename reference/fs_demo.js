const path = require('path');
const fs = require('fs');

// Create folder.
fs.mkdir(path.join(__dirname, '/test'), {}, err => {
  if (err) throw err;
  console.log('Folder created');
});

// Create and write to file (Append as well)
fs.writeFile(path.join(__dirname, '/test', 'hello.txt'), 'Hello world', err => {
  if (err) throw err;
  console.log('File created');
  fs.appendFile(
    path.join(__dirname, '/test', 'hello.txt'),
    ' I love nodejs',
    err => {
      if (err) throw err;
      console.log('File appended');
    }
  );
});

// Read file.
fs.readFile(path.join(__dirname, '/test', 'hello.txt'), 'utf8', (err, data) => {
  if (err) throw err;
  console.log('data');
});

// Rename file.
fs.rename(
  path.join(__dirname, '/test', 'hello.txt'),
  path.join(__dirname, '/test', 'helloWorld.txt'),
  err => {
    console.log('File renamed.');
  }
);
