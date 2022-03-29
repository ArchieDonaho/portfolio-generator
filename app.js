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

//contains the questions about the user
const promptUser = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is your name? (Required)',
            validate: nameInput => {
                if(nameInput){
                    return true;
                } else {
                    console.log('Please enter your name!');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'github',
            message: 'Enter your GitHub Username (Required)',
            validate: input => {
                if(input){
                    return true;
                } else {
                    console.log('Please enter your GitHub username!');
                    return false;
                }
            }
        },
        {
            type: 'confirm',
            name: 'confirmAbout',
            message: 'Would you like to enter some information about yourself for and "About" section?',
            default: true
        },
        {
            type: 'input',
            name: 'about',
            message: 'Provide some information about yourself:',
            //only will promt the question if the confirmAbout is true
            //the object passed though contains all the answers the user has supplied this far
            when: ({confirmAbout}) => {
                if(confirmAbout){
                    return true;
                } else {
                    return false;
                }
            }
        }
    ]);
};

//contains the questions about the project
const promptProject = portfolioData => {
    //if there's no projects array property, create one
    if(!portfolioData.projects){
        portfolioData.projects = [];        
    }

    console.log(`
        =================
        Add a New Project
        =================
    `);
    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is the name of the project? (Required)',
            validate: input => {
                if(input){
                    return true;
                } else {
                    console.log('Please enter your project name!');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'description',
            message: 'Provide a description of the project (Required)',
            validate: input => {
                if(input){
                    return true;
                } else {
                    console.log('Please enter the description!');
                    return false;
                }
            }
        },
        {
            type: 'checkbox',
            name: 'languages',
            message: 'What did you build this project with? (Check all that apply)',
            choices: ['JavaScript', 'HTML', 'CSS', 'ES6', 'jquery', 'Bootstrap', 'Node']
        },
        {
            type: 'input',
            name: 'link',
            message: 'Enter your GitHub link to your project (Required)',
            validate: input => {
                if(input){
                    return true;
                } else {
                    console.log('Please enter your project link!');
                    return false;
                }
            }
        },
        {
            type: 'confirm',
            name: 'feature',
            message: 'Would you like to feature this project?',
            default: false
        },
        {
            type: 'confirm',
            name: 'confirmAddProject',
            message: 'Would you like to enter another project?',
            default: false
        }
    ])
    //after the questions are asked...
    .then(projectData => {
        //add the project to the array
        portfolioData.projects.push(projectData);
        //if the user decides to add another project..
        if(projectData.confirmAddProject){
            //re-run the function using the current portfolio array as an argument to save it,
            //else the array will be initialized, and the existing project data will be lost.
            return promptProject(portfolioData);
        } else {
            //else, return the portfolio data
            return portfolioData;
        }
    });
}

//call the functions, grab the promises, and display the results
promptUser()
    .then(promptProject)
    .then(portfolioData => {
        console.log(portfolioData);
    });