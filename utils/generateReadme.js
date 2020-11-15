function generateReadme(userAnswers) {

  

  // Generate Table of Contents conditionally based on userAnswers
  let draftToC = `## Table of Contents`;

  if (userAnswers.installation !== '') { draftToC += `
  * [Installation](#installation)` };

  if (userAnswers.usage !== '') { draftToC += `
  * [Usage](#usage)` };

  if (userAnswers.contributing !== '') { draftToC += `
  * [Contributing](#contributing)` };

  if (userAnswers.tests !== '') { draftToC += `
  * [Tests](#tests)` };


  // Generate markdown for the top required portions of the README
  let draftReadme = 
  `# ${userAnswers.title}
  ![Badge for GitHub repo top language](https://img.shields.io/github/languages/top/${userAnswers.username}/${userAnswers.repo}?style=flat&logo=appveyor) ![Badge for GitHub last commit](https://img.shields.io/github/last-commit/${userAnswers.username}/${userAnswers.repo}?style=flat&logo=appveyor)
  
  Check out the badges hosted by [shields.io](https://shields.io/).
  
  ![shields.io](https://img.shields.io/badge/${userAnswers.language}-${userAnswers.percentage}%25-success)

  ## Description 
  
  *The what, why, and how:* 
  
  ${userAnswers.description}
  `

  // Add Table of Contents to markdown
  draftReadme += draftToC;
 
  // Add License section since License is required to Table of Contents
  draftReadme += `
  * [License](#license)`;
  

  // Optional Installation section
  if (userAnswers.installation !== '') {
  
  draftReadme +=
  `
  
  ## Installation
  
  *Steps required to install project and how to get the development environment running:*
  
  ${userAnswers.installation}`
  };
  

  // Optional Usage section
  if (userAnswers.usage !== '') {
  
  draftReadme +=
  
  `
  
  ## Usage 
  
  *Instructions and examples for use:*
  
  ${userAnswers.usage}`
  };
  
  
  // Optional Contributing section
  if (userAnswers.contributing !== '') {
  `
  
  ## Contributing
  
  *If you would like to contribute it, you can follow these guidelines for how to do so.*
  
  ${userAnswers.contributing}`
  };
  

  // Optional Tests section
  if (userAnswers.tests !== '') {
  
  draftReadme +=
  `
  
  ## Tests
  
  *Tests for application and how to run them:*
  
  ${userAnswers.tests}`
  };


  // License section needs to be worked on for badges
  draftReadme +=
  `
  
  ## License
  
  ${userAnswers.license}
  `;


  // Questions / About Developer section
  let draftDev = 
  `
  ---
  
  ## Questions?
    
  For any questions, please contact me with the information below:
 
  GitHub: [@${userAnswers.username}](${userAnswers.url})
  `;

  // If GitHub email is not null, add to Developer section
  if (userAnswers.email !== null) {
  
  draftDev +=
  `
  Email: ${userAnswers.email}
  `};

  // Add developer section to markdown
  draftReadme += draftDev;

  // Return markdown
  return draftReadme;
  
}

module.exports = generateReadme;