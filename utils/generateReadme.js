

// function to generate markdown for README
function generateReadme(data, repoLang) {

    //Build the logic for the Top Language Badges for the repo
    let newBadge = "";

    for (let i = 0; i < repoLang.length; i++) {
        newBadge += "![Badge for GitHub repo top language(s)](https://img.shields.io/badge/-" + repoLang[i] + "-blue)  ";
    }

    console.log("This is newBadge", newBadge)

    // return markdown content
    return `# ${data.title}

${data.licenseBadge} ${newBadge}


## Description

${data.description}

## Table of Contents
* [Installation](#installation)
* [Usage](#usage)
* [License](#license)
* [Contributing](#contributing)
* [Tests](#tests)
* [Questions](#questions)


## Installation

To install dependencies, run the following:

\`\`\`
${data.installation}
\`\`\`


## Usage

${data.usage}


## License

This repository is licensed under the ${data.license} license. ${data.licenseBadge}


## Contributing

${data.contributing}


## Tests

To run tests, run the following:
\`\`\`
${data.tests}
\`\`\`


## Questions

Questions about this repository? Please contact me at [${data.email}](mailto:${data.email}). View more of my work in GitHub at [${data.username}](https://github.com/${data.username})

`;
}

module.exports = generateReadme;