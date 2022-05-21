const path = require('path');

module.exports = {
  process(src, filename, config, options) {
      console.log("File Name :"+filename);
    return 'module.exports = ' + JSON.stringify(path.basename(filename)) + ';';
  },
};
