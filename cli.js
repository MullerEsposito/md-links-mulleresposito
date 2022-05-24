#!/usr/bin/env node

const chalk = require("chalk");
const { getObjectsWithLinkFromFile } = require("./index");
const { validateURL } = require("./http-validacao");

const [,, filePath, option] = process.argv;

async function testLinksFromFile(filePath) {
  const objectsWithLink = await getObjectsWithLinkFromFile(filePath);

  if (option === "validate") {
    console.log(chalk.yellow("Validated links: "), await validateURL(objectsWithLink));
  } else {
    console.log(chalk.yellow("Links list: "), objectsWithLink);
  }
}

testLinksFromFile(filePath);
