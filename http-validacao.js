const fetch = (...args) =>  import("node-fetch").then(({ default: fetch}) => fetch(...args));

async function checkStatus(urlsArray) {
  const statusArray = await Promise.all(urlsArray.map(async url => {
    const response =  await fetch(url);

    return `${response.status} - ${response.statusText}`;
  }));

  return statusArray;
}

function generateURLsArray(objectsLinkArray) {
  return objectsLinkArray.map(linkObject => Object.values(linkObject).join());
}

async function validateURL(objectsLinkArray) {
  const urlsArray =  generateURLsArray(objectsLinkArray);
  const statusArray = await checkStatus(urlsArray);
  const mappedURLStatusArray = objectsLinkArray.map((objectLink, idx) => ({ ...objectLink, status: statusArray[idx] }));

  return mappedURLStatusArray;
}

module.exports = { validateURL };