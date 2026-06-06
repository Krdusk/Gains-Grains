const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, 'lgchmpg.js');
const txt = fs.readFileSync(filePath, 'utf8');
const match = txt.match(/const PRODUCTS = \[(.|\n)*?\];/);
if (!match) {
  console.error('PRODUCTS array not found');
  process.exit(1);
}
const arrayText = match[0].replace(/^const PRODUCTS = /, '').replace(/;$/, '');
const PRODUCTS = eval(arrayText);
for (const p of PRODUCTS) {
  const q = (v) => String(v || '').replace(/'/g, "\\'");
  console.log(`INSERT IGNORE INTO \`products\` (\`id\`,\`name\`,\`category\`,\`description\`,\`base_price\`,\`rating\`,\`in_stock\`,\`image_url\`,\`specs\`) VALUES ('${q(p.id)}','${q(p.name)}','${q(p.category)}','${q(p.desc)}',${p.basePrice},${p.rating},1,'${q(p.image)}','${q(p.specs || '')}');`);
}
