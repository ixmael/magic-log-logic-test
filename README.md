# The Logic Test for Magic Log
This is the implementation of the given logic test. This test was implemented with typescript.

## Setup
First, install all the dependencies with:
```sh
# npm
npm install

# yarn
yarn install
```

The implementation require the following parameters as environment variables:
* BACKEND_URL: the url to fetch the data
* FILTER_AGE: the age to filter
* FILE_PATH: the path to save the filtered IDs

You can setup the parameters with the a *.env* file that define the values of the parameters. You have an example in the *.env.example* file.

## Run the analyze
Once you had setup the project, you can run the analize with:
```sh
# npm
npm -s run analyze

# yarn
yarn -s run analyze
```
the -s parameter is to hide the metadata of yarn.

You can execute directly with:
```sh
./node_modules/.bin/ts-node src/index.ts
```
in the root project path.

## Tests
This project implements some tests. To run the tests execute:
```sh
# npm
npm run tests

# yarn
yarn run tests
```