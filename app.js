//import the inquirer module
const inquirer = require('inquirer');
// //import the file system from node
// const fs = require('fs');
// //import the local file that has the webpage data
// const generatePage = require('./src/page-template.js')

// //generate the webpage using the obtained data, and assign it to the variable
// const pageHTML = generatePage(name, github);

// //generate the index.html file using the data entered
// fs.writeFile('./index.html', pageHTML, err => {
//     if (err) throw err;

//     console.log('portfolio complete! check out index.html to see the output!');
// });

//create the question prompt
inquirer
    .prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is your name?'
        }
    ])
    //display the answers
    .then(answers => console.log(answers));