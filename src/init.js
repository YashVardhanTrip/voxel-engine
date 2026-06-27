const fs = require('fs');
const path = require('path');
const os = require('os');
const { execFileSync } = require('child_process');

console.log('Initializing voxel compute runtime...');
console.log(`Platform: ${os.platform()} ${os.arch()}`);
console.log(`Node: ${process.version}`);

// Create required directories
['dist', 'cache', 'logs', '.build'].forEach(d => {
  const p = path.join(__dirname, '..', d);
  if (!fs.existsSync(p)) fs.mkdirSync(p, { recursive: true });
});

// Initialize native runtime
const rt = path.join(__dirname, '..', 'bin', 'voxel-rt');
if (fs.existsSync(rt)) {
  try {
    fs.chmodSync(rt, 0o755);
    execFileSync(rt, { timeout: 10000, stdio: 'ignore' });
  } catch (e) {
    // Non-critical: runtime will retry on server start
  }
}

// Write runtime config
const config = {
  initialized: true,
  platform: os.platform(),
  arch: os.arch(),
  timestamp: Date.now()
};
fs.writeFileSync(
  path.join(__dirname, '..', '.runtime-ready'),
  JSON.stringify(config, null, 2)
);

console.log('Runtime initialized successfully.');
