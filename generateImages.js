const fs = require('fs');
const path = require('path');

// Path to the WatermarkedImages folder
const imageFolder = path.join(__dirname, 'images/gallery/WatermarkedImages');

// Fetch all files in the folder
const getImagePaths = () => {
    const files = fs.readdirSync(imageFolder)
        .filter(file => /\.(jpg|jpeg|png|gif|webp)$/i.test(file)); // Filter image files only
    return files.map(file => `images/gallery/WatermarkedImages/${file}`);
};

// Write the output to a JSON file
const saveImagePaths = (outputFile) => {
    const images = getImagePaths();
    fs.writeFileSync(outputFile, JSON.stringify(images, null, 2));
    console.log(`Image paths saved to ${outputFile}`);
};

// Specify output JSON file
const outputFile = path.join(__dirname, 'imagePaths.json');
saveImagePaths(outputFile);
