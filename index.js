import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Check if server.js is in current directory (Render) or in src/ (local)
const serverPath = fs.existsSync(path.join(__dirname, 'server.js')) 
  ? './server.js' 
  : './src/server.js';

import(serverPath).catch(err => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
