const fs = require('fs');
const path = require('path');

// Path to the WatermarkedImages folder
const imageFolder = path.join(__dirname, 'images/gallery/WatermarkedImages');

/**
 * Recursively walk a directory and collect image paths with categories.
 * @param {string} dir - directory to scan
 * @param {string} category - current category name
 * @returns {Array<{src:string, category:string}>}
 */
function collectImages(dir, category = path.basename(dir)) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  let results = [];

  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results = results.concat(collectImages(full, entry.name));
    } else if (entry.isFile() && /\.(jpg|jpeg|png|gif|webp)$/i.test(entry.name)) {
      const relativePath = path
        .relative(__dirname, full)
        .split(path.sep)
        .join('/');
      results.push({ src: relativePath, category });
    }
  }
  return results;
}

// Write the output to a JSON file
function saveImagePaths(outputFile) {
  const images = collectImages(imageFolder);
  fs.writeFileSync(outputFile, JSON.stringify(images, null, 2));
  console.log(`Image paths saved to ${outputFile}`);
}

// Specify output JSON file
const outputFile = path.join(__dirname, 'imagePaths.json');
saveImagePaths(outputFile);
