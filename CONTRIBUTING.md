# Getting started

## Pre-requisites

- [ ] Install [Node.js](https://nodejs.org/en/download/). This will also install `npm`, the Node.js package manager.
- [ ] Install [Yarn](https://yarnpkg.com/en/docs/install). This is a package manager for JavaScript.(Optional)
- [ ] Install [Visual Studio Code (VS Code)](https://code.visualstudio.com/) or any other IDE of your choice

## Make changes locally

- Clone the repository to your local machine
- Open the project in your IDE and make changes.

  - Install dependencies: `npm install`.
  - Write your code in `src` folder.
  - Write tests in `__tests__` folder.
  - Test your code: `npm test`.
  - Make sure all tests pass. If you are adding a new feature, add tests for it. If you are fixing a bug, add a test that exposes the bug and fails without your fix.

- Commit and push your changes to main branch

## Publish to npm registry

When you are ready to publish your changes to npm registry, follow the steps below:

- Update the version in `package.json` file. Refer to [Semantic Versioning](https://semver.org/) for versioning guidelines.
- Merge the changes to `release` branch.
- Push the changes to `release` branch. This will trigger the release pipeline which will publish the package to npm registry.
