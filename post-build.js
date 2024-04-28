const fs = require('fs');
const archiver = require('archiver');
//check if assets directory exists
let dir = 'dist/assets';
try {
  fs.statSync(dir);
} catch (e) {
  console.log('Diretory does not exists: ', dir);
  return;
}
let raw = fs.readFileSync('src/assets/version.json');
let json = JSON.parse(raw);

var tzoffset = new Date().getTimezoneOffset() * 60000; //offset in milliseconds
let strDate = new Date(Date.now() - tzoffset)
  .toISOString()
  .replace(/T/, ' ') // replace T with a space
  .replace(/\..+/, ''); // delete the dot and everything after
json['buildDate'] = strDate;
//console.log('version info', json);

let str = JSON.stringify(json, null, 2);
fs.writeFileSync(dir + '/version.json', str);

//Copy the .htaccess file to distribution directory
// fs.copyFile('files/dist/.htaccess', 'dist/.htaccess', err => {
//   if (err) throw err;
//   //console.log('.htaccess was copied to dist/');
// });

const createZip = () => {
  return new Promise((resolve, reject) => {
    let dir = __dirname;
    let output = fs.createWriteStream(dir + '/ad-dashboard.zip');
    var archive = archiver('zip', {
      zlib: { level: 9 } // Sets the compression level.
    });

    // listen for all archive data to be written
    // 'close' event is fired only when a file descriptor is involved
    let closed = false;
    output.on('close', function() {
      console.log(archive.pointer() + ' total bytes');
      //console.log('archiver has been finalized and the output file descriptor has closed.');
      closed = true;
    });

    // This event is fired when the data source is drained no matter what was the data source.
    // It is not part of this library but rather from the NodeJS Stream API.
    // @see: https://nodejs.org/api/stream.html#stream_event_end
    let ended = false;
    output.on('end', function() {
      console.log('Data has been drained');
      ended = true;
    });

    // good practice to catch warnings (ie stat failures and other non-blocking errors)
    archive.on('warning', function(err) {
      if (err.code === 'ENOENT') {
        // log warning
        console.log('warning', err);
      } else {
        // throw error
        throw err;
      }
    });

    // good practice to catch this error explicitly
    archive.on('error', function(err) {
      throw err;
    });

    // pipe archive data to the file
    archive.pipe(output);

    // append files from a sub-directory and naming it `new-subdir` within the archive
    archive.directory('dist/', 'ad-dashboard');

    let finalized = false;
    archive.finalize().then(data => {
      console.log('Output finallized');
      finalized = true;
    });

    let checkDone = () => {
      if ((closed || ended) && finalized) {
        // console.log('Zip process done');
        resolve('Generated ad-dashboard.zip');
        return;
      }
      setTimeout(checkDone, 100);
    };

    setTimeout(checkDone, 100);
  });
};

createZip()
  .then(data => {
    console.log(data);
  })
  .catch(err => {
    console.log('Error creating ad-dashboard.zip', err);
  });
