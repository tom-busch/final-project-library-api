// Detect environment and load server accordingly
const isRender = process.env.RENDER === 'true';
const serverModule = isRender ? './server.js' : './src/server.js';

import(serverModule).catch(err => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
