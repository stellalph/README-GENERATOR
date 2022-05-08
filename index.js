
// Read/write files
const fs = require("fs");

// Util.promisify
// Importing utilities module
// This method accepts a single parameter func that holds the callback based function
// this method returns a promise based function
const util = require("util");

// Question prompts
const inquirer = require("inquirer");

// Generate markdown function
const generateMarkdown = require("./utils/generateMarkdown.js");

// Array of questions for user input
const questions = [
    {
        type: 'input',
        name: 'title',
        message: 'Title of the project.'
    },
    {
        type: 'input',
        name: 'description',
        message: 'Description of the project.'
    },
    {
        type: 'input',
        name: 'installation',
        message: 'Installation instructions for the project.'
    },
    {
        type: 'input',
        name: 'usage',
        message: 'Instructions, examples and images for on how to use.'
    },
    {
        type: 'input',
        name: 'contributing',
        message: 'Contribution instructions for other developers'
    },
    {
        type: 'input',
        name: 'tests',
        message: 'Testing protocols for the project.'
    },
    {
        type: 'input',
        name: 'email',
        message: 'Email Address.'
    },
    {
        type: 'input',
        name: 'github',
        message: 'Github username.'
    },
    {
        type: 'input',
        name: 'addlquestions',
        message: 'References and Others.'
    },
    
    {
        type: 'rawlist',
        name: 'license',
        message: 'Choose a license for your project by selecting a number. Note: it is recommended that you save a separate LICENSE file in the root of the repository. Refer to https://choosealicense.com/ for further details.',
        choices: [
            'Apache license 2.0',
            'Creative Commons Zero v1.0 Universal',
            'Do What The F*ck You Want To Public License',
            'GNU General Public License v3.0',
            'ISC',
            'MIT',
            'The Unlicense'
        ],
        default: 'MIT'
        // Licensing info: https://docs.github.com/en/github/creating-cloning-and-archiving-repositories/licensing-a-repository
    }
];

//Functions
// Prompt User with questions
let promptUser = () => {
    return inquirer.prompt(questions);
}

// function to write README file
const writeToFile = util.promisify(fs.writeFile);

// function to initialize program 
let init = async () => {
    console.log("Hello, this is a README.md Generator! You will be guided through a series of questions to create the README file. If you don't have an answer right now, you can leave it blank. At the end, you will have a README.md file for your project.");
    try {
        // Get user answers
        const answers = await promptUser();
        console.log(answers);

        // Write answers to readme
        const readme = generateMarkdown(answers);

        // Save readme to a file
        await writeToFile("README.md", readme);

        // File successful
        console.log("Successfully created README.md");

    } catch (err) {
        console.log(err);
    }
}

// function call to initialize program
init();

