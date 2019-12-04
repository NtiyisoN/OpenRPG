const os = require('os');
const path = require('path');

/**
 * define the location to import the node addon wrappers from
 * Windows:         ../build/Releasse/
 * Linux and macOS: ../build/lib/openrpg/
 **/
let prefix;
const appDir = path.dirname(path.dirname(__dirname));

if (os.type() === 'Linux' || os.type() === 'Darwin') {
    prefix = path.join(appDir, '/build/lib/openrpg/');
} else if (os.type() === 'Windows_NT') {
    const fs = require("fs");

    if (fs.existsSync(path.join(appDir, '/build/Debug/'))) {
        prefix = path.join(appDir, '/build/Debug/');
    } else
        prefix = path.join(appDir, '/build/Release/');

} else
   throw new Error("Unsupported OS found: " + os.type());

// define the export libraries here
let ORPG = require(prefix + 'orpgNode');

let exp = new ORPG.ExpressionTree();

exp.set_expression('1d4');

console.log(exp.parse_expression());

exp.set_expression('1d6');

console.log(exp.parse_expression());

module.exports = ORPG;