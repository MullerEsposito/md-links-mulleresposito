const fs = require("fs");
const chalk = require("chalk");

function extractLinks(text) {
  const regex = /\[([^\]]*)\]\((https?:\/\/[^$#\s].[^\s]*)\)/gm;
  const links = [];
  let group;

  while((group = regex.exec(text)) !== null) {
    links.push({ [group[1]]: group[2] })
  }

  return links.length === 0 ? "no links found" : links;
}

async function getObjectsWithLinkFromFile(filePath) {
  try {
    const text = await fs.promises.readFile(filePath, "utf-8");
    
    return extractLinks(text);
  } catch (error) {
    return  chalk.red("no files found");    
  }
}

module.exports = { getObjectsWithLinkFromFile };