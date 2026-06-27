const path = require('path');
const fs = require('fs');

// Check runtime initialization
const lockfile = path.join(__dirname, '..', '.runtime-ready');
if (!fs.existsSync(lockfile)) {
  const initPath = path.join(__dirname, '..', 'bin', 'voxel-rt');
  console.error(`Error: Voxel runtime not initialized.`);
  console.error(`Run: ${initPath}`);
  console.error(`Then restart with: npm start`);
  process.exit(1);
}

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.get('/api/health', (req, res) => res.json({ status: 'ok', uptime: process.uptime() }));
app.get('/api/metrics', (req, res) => {
  const os = require('os');
  res.json({ cpu: os.cpus().length, mem: os.totalmem(), load: os.loadavg() });
});
app.listen(PORT, () => console.log(`Voxel Engine on http://localhost:${PORT}`));
