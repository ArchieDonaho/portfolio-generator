//import the inquirer module
const inquirer = require('inquirer');
//import the local file with the functions to put the html and css pages into the dist folder
const {writeFile, copyFile} = require('./utils/generate-site.js');
//import the local file that has the webpage data
const generatePage = require('./src/page-template.js');


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


// const testData = {
//     name: 'Lernantino',
//     github: 'lernantino',
//     confirmAbout: true,
//     about:
//       'Duis consectetur nunc nunc. Morbi finibus non sapien nec pharetra. Fusce nec dignissim orci, ac interdum ipsum. Morbi mattis justo sed commodo pellentesque. Nulla eget fringilla nulla. Integer gravida magna mi, id efficitur metus tempus et.',
//     projects: [
//       {
//         name: 'Run Buddy',
//         description:
//           'Duis consectetur nunc nunc. Morbi finibus non sapien nec pharetra. Fusce nec dignissim orci, ac interdum ipsum. Morbi mattis justo sed commodo pellentesque. Nulla eget fringilla nulla. Integer gravida magna mi, id efficitur metus tempus et. Nam fringilla elit dapibus pellentesque cursus.',
//         languages: ['HTML', 'CSS'],
//         link: 'https://github.com/lernantino/run-buddy',
//         feature: true,
//         confirmAddProject: true
//       },
//       {
//         name: 'Taskinator',
//         description:
//           'Duis consectetur nunc nunc. Morbi finibus non sapien nec pharetra. Fusce nec dignissim orci, ac interdum ipsum. Morbi mattis justo sed commodo pellentesque. Nulla eget fringilla nulla. Integer gravida magna mi, id efficitur metus tempus et. Nam fringilla elit dapibus pellentesque cursus.',
//         languages: ['JavaScript', 'HTML', 'CSS'],
//         link: 'https://github.com/lernantino/taskinator',
//         feature: true,
//         confirmAddProject: true
//       },
//       {
//         name: 'Taskmaster Pro',
//         description:
//           'Duis consectetur nunc nunc. Morbi finibus non sapien nec pharetra. Fusce nec dignissim orci, ac interdum ipsum. Morbi mattis justo sed commodo pellentesque. Nulla eget fringilla nulla. Integer gravida magna mi, id efficitur metus tempus et. Nam fringilla elit dapibus pellentesque cursus.',
//         languages: ['JavaScript', 'jQuery', 'CSS', 'HTML', 'Bootstrap'],
//         link: 'https://github.com/lernantino/taskmaster-pro',
//         feature: false,
//         confirmAddProject: true
//       },
//       {
//         name: 'Robot Gladiators',
//         description:
//           'Duis consectetur nunc nunc. Morbi finibus non sapien nec pharetra. Fusce nec dignissim orci, ac interdum ipsum. Morbi mattis justo sed commodo pellentesque.',
//         languages: ['JavaScript'],
//         link: 'https://github.com/lernantino/robot-gladiators',
//         feature: false,
//         confirmAddProject: false
//       }
//     ]
//   };

//   const pageHTML = generatePage(testData);
//   fs.writeFile('./dist/index.html', pageHTML, err => {
//     if (err) throw new Error(err);

//     console.log('Page created! Check out index.html in this directory to see it!');
//   });

// call the functions, grab the promises, and display the results
// promptUser()
//     .then(promptProject)
//     .then(portfolioData => {
//         const pageHTML = generatePage(portfolioData);

//         fs.writeFile('./dist/index.html', pageHTML, err => {
//           if (err) throw new Error(err);

//           console.log('Page created! Check out index.html in this directory to see it!');

//           //copy the css file and place it in the dist folder ONLY AFTER the html page is competed
//           fs.copyFile('./src/style.css', './dist/style.css', err => {
//             console.log('Style sheet copied successfully');
//           });
//         });
//     });

//captures the returning data
promptUser()
    //captures the project data
    .then(promptProject)
    //using the response, generate the webpage
    .then(portfolioData => {
        return generatePage(portfolioData);
    })
    //write the webpage into the dist folder
    .then(pageHTML => {
        //return the webpage html
        //returns a promise, hence why we use return.
        return writeFile(pageHTML);
    })
    //upon successful file creation... 
    .then(writeFileResponse => {
        //lets us know if the file was written correctly
        console.log(writeFileResponse);
        //copy the css file into the dist folder
        return copyFile();
    })
    .then(copyFileResponse => {
        //lets us know if the file copied correctly
        console.log(copyFileResponse);
    })
    .catch(err => {
        console.log(err);
    });