import configuration from "src/config/configuration";

const path = require("path");
const fs = require('fs');

export function createImagesDirectory() {
  const imagesDirectory = path.join(configuration().storageDirectory, "images");
  if (!fs.existsSync(imagesDirectory)) {
    fs.mkdirSync(imagesDirectory, { recursive: true });
    console.log(`Directory created: ${imagesDirectory}`);
  } else {
    console.log(`Directory ${imagesDirectory} exists!`);
  }
}