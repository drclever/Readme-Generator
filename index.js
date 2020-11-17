// External packages
const inquirer = require('inquirer');
const axios = require('axios');
const util = require('util');
const fs = require('fs');
// Set the fs.writeFile function to use promises
const writeFileAsync = util.promisify(fs.writeFile);

let repoLang = [];

const licenseBadgeLinks = {
    "Mozilla Public License 2.0": "[![License: MPL 2.0](https://img.shields.io/badge/License-MPL%202.0-brightgreen.svg)](https://opensource.org/licenses/MPL-2.0)",
    "Apache License 2.0": "[![License: Apache 2.0](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)",
    "MIT License": "[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)",
    "ISC License (ISC)": "[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)",
    "The Unlicense": "[![License: Unlicense](https://img.shields.io/badge/license-Unlicense-blue.svg)](http://unlicense.org/)"
}

// Internal modules
const generateReadme = require('./utils/generateReadme.js');

// Prompts for user answers
const questions = [
    {
        type: 'input',
        message: "What is the title of your project?",
        name: 'title',
        default: 'Project Title',
        validate: function (answer) {
            if (answer.length < 1) {
                return console.log("A project title is required.");
            }
            return true;
        }
    },
    
    {
        type: 'input',
        message: "Write a description of your project.",
        name: 'description',
        default: 'Project Description',
        validate: function (answer) {
            if (answer.length < 1) {
                return console.log("A project description is required.");
            }
            return true;
        }
    },

    {
        type: 'input',
        message: "If applicable, describe the steps required to install your project for the Installation section.",
        name: 'installation'
    },
    {
        type: 'input',
        message: "Provide instructions and examples of your project in use for the Usage section.",
        name: 'usage'
    },
    {
        type: 'input',
        message: "If applicable, provide guidelines on how other developers can contribute to your project.",
        name: 'contributing'
    },
    {
        type: 'input',
        message: "If applicable, provide any tests written for your application and provide examples on how to run them.",
        name: 'tests'
    },
    {
        type: 'list',
        message: "Choose a license for your project.",
        choices: ['Mozilla Public License 2.0', 'Apache License 2.0', 'MIT License', 'ISC License (ISC)', 'The Unlicense'],
        name: 'license'
    },

    {
        type: 'input',
        message: "What is your GitHub username? (No @ needed)",
        name: 'username',
        validate: function (answer) {
            if (answer.length < 1) {
                return console.log("A valid GitHub username is required.");
            }
            return true;
        }
    },
    {
        type: 'input',
        message: "What is your GitHub repo name? (Must be exact)",
        name: 'reponame',
        validate: function (answer) {
            if (answer.length < 1) {
                return console.log("A valid GitHub reponame is required.");
            }
            return true;
        }
    },

    {
        type: 'input',
        message: "What is your email address?",
        name: 'email',
        default: 'general-flunky@outlook.com',
        validate: function (answer) {
            if (answer.length < 1) {
                return console.log("An email address is required.");
            }
            return true;
        }
    }
];

//Write the file function
function writeToFile(fileName, data) {
    fs.writeFile(fileName, data, err => {
        if (err) {
          return console.log(err);
        }
      
        console.log("Success! Your README.md file has been generated")
    });
}

async function getLang (repoLang) {
    /*     const url = "https://api.github.com/repos/drclever/Weather-Dashboard/languages";
        const response = await fetch(url); */
        const queryUrl = "https://api.github.com/repos/drclever/Weather-Dashboard/languages";
        
    
        try {
            // fetch data from a url endpoint
            const response = await axios.get(queryUrl);
    
            //make an Object of the languages returned
            repoLang = Object.keys(response.data);
        
            return repoLang;
          } catch (error) {
            console.log(error);
          } 
    }

async function init() {
    try {

        // Prompt Inquirer questions
        const userAnswers = await inquirer.prompt(questions);
        userAnswers.licenseBadge = licenseBadgeLinks[userAnswers.license];

        repoLang = await getLang(userAnswers, repoLang);
    
        // Pass the answers to generateReadme
        console.log("Generating README...")
        const readme = generateReadme(userAnswers, repoLang);
    
        // Write markdown to file
        await writeFileAsync(`${userAnswers.reponame}-README.md`, readme);

    } catch (error) {
        console.log(error);
    }
};

init();