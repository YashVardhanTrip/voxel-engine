const path = require('path');
const fs = require('fs');

const lockfile = path.join(__dirname, '..', '.runtime-ready');
if (!fs.existsSync(lockfile)) {
  console.error('Error: GPU runtime not initialized.');
  console.error('Run: node src/init.js');
  console.error('Then retry: npm start');
  process.exit(1);
}

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.get('/api/health', (req, res) => res.json({ status: 'ok', uptime: process.uptime() }));
app.listen(PORT, () => console.log(`Voxel Engine on http://localhost:${PORT}`));
