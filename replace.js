const fs = require('fs');
const path = require('path');

const replacements = {
  // Hero
  '"/assets/heroimage.png"': '"/media/hero/luaz-hero-poster.webp"',
  '"/heroimage.png"': '"/media/hero/luaz-hero-poster.webp"',
  '"/herovideo.mp4"': '"/media/hero/luaz-hero-desktop.mp4"',
  '"/videos/luaz-hero.mp4"': '"/media/hero/luaz-hero-mobile.mp4"',

  // Box
  '"/assets/box_sample_front.jpeg"': '"/media/box/luaz-box-closed.webp"',
  '"/box_sample_front.jpeg"': '"/media/box/luaz-box-closed.webp"',
  '"/assets/back_box_sample_1.png"': '"/media/box/luaz-box-open.webp"',
  '"/back_box_sample_1.png"': '"/media/box/luaz-box-open.webp"',
  '"/box_sample_front.png"': '"/media/box/luaz-box-detail.webp"',

  // Ritual videos
  '"/bathsalt.mp4"': '"/media/ritual/bath-salt.mp4"',
  '"/essential_oil.mp4"': '"/media/ritual/essential-oil.mp4"',
  '"/chamomilevideo.mp4"': '"/media/ritual/tea.mp4"',
  '"/hempsocks.mp4"': '"/media/ritual/socks.mp4"',

  // Products
  '"/bath_salt.jpeg"': '"/media/products/bath-salt.webp"',
  '"/bath_salt2.jpeg"': '"/media/products/bath-salt.webp"',
  '"/bath_salt3.jpeg"': '"/media/products/bath-salt.webp"',
  '"/lavender_essential_oil.jpeg"': '"/media/products/essential-oil.webp"',
  '"/lavenderbathsalt.jpg"': '"/media/products/essential-oil.webp"',
  '"/chamomile.jpg"': '"/media/products/tea.webp"',
  '"/hempsocks.webp"': '"/media/products/socks.webp"',
  '"/diffuser.jpg"': '"/media/products/diffuser.webp"',

  // Assets with folder
  '"/assets/chamomile.jpg"': '"/media/products/tea.webp"',
  '"/assets/lavenderbathsalt.jpg"': '"/media/products/essential-oil.webp"',
  '"/assets/sandalwood.jpg"': '"/media/products/diffuser.webp"',
  '"/assets/essential_oil_box.png"': '"/media/box/luaz-box-detail.webp"', // best guess
  '"/assets/socks_box.png"': '"/media/box/luaz-box-detail.webp"', // best guess
};

const dirs = ['components', 'app', 'lib'];
let updatedFiles = [];

function walkDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walkDir(fullPath);
    } else if (fullPath.endsWith('.ts') || fullPath.endsWith('.tsx') || fullPath.endsWith('.js') || fullPath.endsWith('.jsx')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let changed = false;
      for (const [oldStr, newStr] of Object.entries(replacements)) {
        if (content.includes(oldStr)) {
          content = content.split(oldStr).join(newStr);
          changed = true;
        }
      }
      if (changed) {
        fs.writeFileSync(fullPath, content, 'utf8');
        updatedFiles.push(fullPath);
      }
    }
  }
}

for (const dir of dirs) {
  walkDir(dir);
}

console.log('Updated files:');
console.log(updatedFiles.join('\n'));
