const fs = require("fs");
const path = require("path");
const chalk = require("chalk");

// function getFile(filePath) {
//   fs.readFile(filePath, "utf-8", (error, data) => {    
//     if (error) throw new Error(chalk.redBright(error));

//     console.log(chalk.greenBright(data));
//   });  
// }

// function getFile(filePath) {
//   fs.promises.readFile(filePath, "utf-8")
//     .then(file => console.log(chalk.greenBright(file)))
//     .catch(error => console.log(chalk.redBright(error.message)));
// }

// getFile("arquivos/texto.md");

function extractLinks(text) {
  const regex = /\[([^\]]*)\]\((https?:\/\/[^$#\s].[^\s]*)\)/gm;
  const links = [];
  let group;

  while((group = regex.exec(text)) !== null) {
    links.push({ [group[1]]: group[2] })
  }

  return links.length === 0 ? "no links found" : links;
}

// async function getFile(filePath) {
//   try {
//     const text = await fs.promises.readFile(filePath, "utf-8");
//     return extractLinks(text);  
//   } catch (error) {
//     return  chalk.red(error);    
//   }
// }

async function getObjectsWithLinkFromFile(filePath) {
  try {
    const absolutePath = path.join(__dirname, filePath);
    const text = await fs.promises.readFile(absolutePath, "utf-8");
    
    return extractLinks(text);
  } catch (error) {
    return  chalk.red("no files found");    
  }
}

module.exports = { getObjectsWithLinkFromFile };