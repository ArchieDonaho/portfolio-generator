//import the file system form Node
const fs = require('fs');

//generates the file and returns the promise
const writeFile = fileContent => {
    return new Promise((resolve, reject) => {
        fs.writeFile('./dist/index.html', fileContent, err => {
            //if there is an error, reject the promise and send the error message tot he promise's .catch() method
            if (err) {
                reject (err);
                //return out of the fucntion here to make sure the promise doesnt accadently execute the .resolve() function
                return;
            }
            //if everything went wellm resolve the promise and send the data to the .then() method
            resolve({
                ok: true,
                message: 'File created!'
            });
        });
    });
};

const copyFile = () => {
    return new Promise((resolve, reject) => {
        fs.copyFile('./src/style.css', './dist/style.css', err => {
            //if there is an error, reject the promise and send the error message tot he promise's .catch() method
            if(err){
                reject (err);
                return;
            }
            //if everything went wellm resolve the promise and send the data to the .then() method
            resolve({
                ok: true,
                message: 'File copied!'
            });
        });
    });
};

//then export the functions to be used in app.js
module.exports = {writeFile, copyFile}