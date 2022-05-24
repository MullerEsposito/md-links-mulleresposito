const { getObjectsWithLinkFromFile } = require("../index");

describe("It tests the getObjectsWithLinkFromFile function.", () => {
  it("should be a function.", () => {
    expect(typeof getObjectsWithLinkFromFile).toBe("function");
  });

  it("should return a result array", async () => {
    const objectsWithLink = await getObjectsWithLinkFromFile("tests/files/texto1.md");
    const urlsArray = objectsWithLink.map(objectLink => Object.values(objectLink).join());

    expect(urlsArray.length).toBe(5);
    expect(urlsArray[0]).toBe("https://developer.mozilla.org/pt-BR/docs/Web/API/FileList");
  });

  it("should return the 'no links found' message whether it no find links.", async () => {
    const objectsWithLink = await getObjectsWithLinkFromFile("tests/files/text_without_links.md");

    expect(objectsWithLink).toBe("no links found");
  });

  it("should throw an error whether it no specified a valid path file.", async () => {
    await expect(getObjectsWithLinkFromFile("tests/files")).rejects.toThrow("no files found");
  });
})