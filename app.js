//import the file system from node
const fs = require('fs');
//import the local file that has the webpage data
const generatePage = require('./src/page-template.js')
// grabs the user data entered and reduces it to only have the data entered...
const profiledataArgs = process.argv.slice(2, process.argv.length);
// ...and assign them to variables
const [name, github] = profiledataArgs;


//generate the index.html file using the data entered
fs.writeFile('index.html', generatePage(name, github), err => {
    if (err) throw err;

    console.log('portfolio complete! check out index.html to see the output!');
});
