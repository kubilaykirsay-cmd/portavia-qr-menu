const fs = require('fs');
const path = require('path');

const downloadsDir = 'C:\\Users\\kubilaykirsay\\Downloads';
const targetDir = path.join(__dirname, 'public', 'images');

// Ensure target directory exists
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
  console.log('Created directory:', targetDir);
}

// The 14 files in chronological order from oldest to newest:
const sourceFiles = [
  'ChatGPT Image 7 Tem 2026 18_24_50 (1).png', // 1. Margherita
  'ChatGPT Image 7 Tem 2026 18_24_50 (2).png', // 2. Melfi
  'ChatGPT Image 7 Tem 2026 18_24_51 (3).png', // 3. Quattro Formaggi
  'ChatGPT Image 7 Tem 2026 18_24_51 (4).png', // 4. Pepperoni
  'ChatGPT Image 7 Tem 2026 18_24_51 (5).png', // 5. Pollo
  'ChatGPT Image 7 Tem 2026 18_24_52 (6).png', // 6. Bianca
  'ChatGPT Image 7 Tem 2026 18_24_52 (7).png', // 7. Folingo
  'ChatGPT Image 7 Tem 2026 18_24_53 (8).png', // 8. Marino
  'ChatGPT Image 7 Tem 2026 18_24_54 (9).png', // 9. Frutti di Mare
  'ChatGPT Image 7 Tem 2026 18_24_54 (10).png',// 10. Ferentino
  'ChatGPT Image 7 Tem 2026 18_25_00 (1).png', // 11. Italiana
  'ChatGPT Image 7 Tem 2026 18_25_02 (2).png', // 12. Anatolia
  'ChatGPT Image 7 Tem 2026 18_25_02 (3).png', // 13. Luna Rossa
  'ChatGPT Image 7 Tem 2026 18_25_03 (4).png'  // 14. Tartufo Bianco
];

const targetNames = [
  'margherita.png',
  'melfi.png',
  'quattro-formaggi.png',
  'pepperoni.png',
  'pollo.png',
  'bianca.png',
  'folingo.png',
  'marino.png',
  'frutti-di-mare.png',
  'ferentino.png',
  'italiana.png',
  'anatolia.png',
  'luna-rossa.png',
  'tartufo-bianco.png'
];

sourceFiles.forEach((filename, index) => {
  const sourcePath = path.join(downloadsDir, filename);
  const targetPath = path.join(targetDir, targetNames[index]);
  
  if (fs.existsSync(sourcePath)) {
    fs.copyFileSync(sourcePath, targetPath);
    console.log(`Successfully copied & renamed: ${filename} -> ${targetNames[index]}`);
  } else {
    console.error(`Source file not found: ${sourcePath}`);
  }
});
