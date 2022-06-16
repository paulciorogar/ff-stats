/* eslint-disable semi */
const tsNode = require('ts-node')

// overrides tsconfig used for the app
tsNode.register({
    files: true,
    project: './test-tsconfig.json'
})