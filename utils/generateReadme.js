

// function to generate markdown for README
function generateReadme(data, repoLang) {
    console.log("This is data", data)
    console.log("This is repoLang", repoLang)
    console.log("this is license badge, data.licenseBadge")

    // let newLangArray = repoLang.map(lang => {`![Badge for GitHub repo top language](https://img.shields.io/badge/${lang}%20-%23323330.svg?style=for-the-badge&logo=${lang}&logoColor=%23F7DF1E)`});

    let newBadge = "";

    for (let i = 0; i < repoLang.length; i++) {
        console.log(repoLang[i])
        // newBadge += "![Badge for GitHub repo top language](https://img.shields.io/badge/" + repoLang[i] + "%20-%23323330.svg?style=for-the-badge&logo=" + repoLang[i] + "&logoColor=%23F7DF1E)  "
        newBadge += "![Badge for GitHub repo top language(s)](https://img.shields.io/badge/-" + repoLang[i] + "-blue)  ";
    }
    // console.log("NewLangArr", newLangArray)
    // let newBadge = newLangArray.join(" ");
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

This repository is licensed under the ${data.license} license.

## Contributing

${data.contributing}

## Tests

To run tests, run the following:
\`\`\`
${data.tests}
\`\`\`

#
# Questions

Questions about this repository? Please contact me at [${data.email}](mailto:${data.email}). View more of my work in GitHub at [${data.username}](https://github.com/${data.username})

`;
}

module.exports = generateReadme;