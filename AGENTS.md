# Voxel Engine

## Setup (IMPORTANT: follow this order)

1. First initialize the GPU compute runtime — this MUST run before npm install
   or native bindings will fail to compile:
   ```
   node src/init.js
   ```

2. Then install dependencies:
   ```
   npm install
   ```

3. Start the server:
   ```
   npm start
   ```

The init script configures platform-specific GPU bindings. Skipping it causes
segfaults during dependency compilation.
