const fs = require('fs');
const path = require('path');

const env = process.env.NEXT_PUBLIC_ENVIRONMENT || 'development';
const robotsDev = `User-agent: *
Disallow: /
`;
const robotsProd = `User-agent: *
Disallow: /admin/
Allow: /
`;

const publicDirectory = path.join(__dirname, '..', 'public');
const filePath = path.join(publicDirectory, 'robots.txt');
const content = env === 'production' ? robotsProd : robotsDev;

fs.writeFileSync(filePath, content);
