const execSync = require('child_process').execSync;
const http = require('https');
const fs = require('fs');

// courtesy of https://stackoverflow.com/questions/11944932/how-to-download-a-file-with-node-js-without-using-third-party-libraries
var download = function(url, dest, cb) {
  var file = fs.createWriteStream(dest);
  var request = http.get(url, function(response) {
    response.pipe(file);
    file.on('finish', function() {
      file.close(cb);  // close() is async, call cb after close completes.
    });
  }).on('error', function(err) { // Handle errors
    fs.unlink(dest); // Delete the file async. (But we don't check the result)
    if (cb) cb(err.message);
  });
};

if (process.platform === 'win32') {
  let downloader = new Promise(function(resolve, reject) {
    const captureLogs = false;
    console.log('Downloading cmake 3.5.2 (Windows, x86)...');

    download('https://cmake.org/files/v3.5/cmake-3.5.2-win32-x86.msi', 'cmake.msi', function () {
      console.log('Download complete. Installing MSI...');
      execSync('start /wait msiexec /i cmake.msi ADD_CMAKE_TO_PATH="System" /qb /norestart' + (captureLogs ? ' /l*v install.log' : ''));
      resolve();
    }, function (err) {
      console.log('Error occurred during download: ' + err);
      reject(err);
    });
  });

  downloader
    .then(function() { console.log('install.js has finished'); })
    .catch(console.error);

} else {
  // TODO: this does not currently echo out to standard out :(
  execSync("curl 'https://cmake.org/files/v3.5/cmake-3.5.2.tar.gz' -s -o - | tar xpfz - && D=`pwd` && cd cmake-3.5.2 && ./configure --prefix=$D && make && make install");
}
