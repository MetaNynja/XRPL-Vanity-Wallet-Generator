const { Worker, isMainThread, parentPort, workerData } = require('worker_threads');
const keypairs = require('ripple-keypairs');
const readline = require('readline');

// Create readline interface for user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

if (isMainThread) {
  // Main thread code
  let totalAttempts = 0;
  let found = false;

  // Prompt for prefix
  rl.question('Enter the desired address prefix (e.g., rMyWallet): ', (prefix) => {
    if (!prefix) {
      console.error('Prefix is required.');
      rl.close();
      process.exit(1);
    }
    // Ensure prefix starts with 'r' or 'R'
    if (!prefix.toLowerCase().startsWith('r')) {
      console.error('Prefix must start with "r" or "R" for XRPL addresses.');
      rl.close();
      process.exit(1);
    }
    console.log(`Searching for wallets starting with prefix: ${prefix}`);
    rl.close();

    const prefixLower = prefix.toLowerCase();
    const workers = [];

    // Create two workers
    for (let i = 0; i < 2; i++) {
      const worker = new Worker(__filename, { workerData: { prefix: prefixLower } });
      workers.push(worker);
      worker.on('message', (msg) => {
        if (msg.type === 'progress') {
          totalAttempts += msg.attempts;
          // Update progress on the same line
          process.stdout.clearLine(0);
          process.stdout.cursorTo(0);
          process.stdout.write(`Total wallets generated: ${totalAttempts}`);
        } else if (msg.type === 'result' && !found) {
          found = true;
          // Clear the progress line
          process.stdout.clearLine(0);
          process.stdout.cursorTo(0);

          // Verify the address
          const keypair = keypairs.deriveKeypair(msg.seed);
          const finalAddress = keypairs.deriveAddress(keypair.publicKey);
          if (!finalAddress.toLowerCase().startsWith(prefixLower)) {
            console.error('Error: Final address does not match prefix. Please try again.');
            process.exit(1);
          }

          console.log(`Found a matching address after ${totalAttempts + msg.attempts} attempts:`);
          console.log(`Address: ${finalAddress}`);
          console.log(`Seed: ${msg.seed}`);
          console.log('Keep the seed secret! It controls your wallet.');

          // Terminate all workers
          workers.forEach(w => w.terminate());
        }
      });
    }
  });
} else {
  // Worker code
  const prefixLower = workerData.prefix;
  let attempts = 0;

  while (true) {
    // Generate a random seed
    const seed = keypairs.generateSeed();
    // Derive the keypair and address
    const keypair = keypairs.deriveKeypair(seed);
    const address = keypairs.deriveAddress(keypair.publicKey);
    attempts++;

    // Send progress every 100 attempts
    if (attempts >= 100) {
      parentPort.postMessage({ type: 'progress', attempts });
      attempts = 0; // Reset after reporting
    }

    // Check if address matches prefix (case-insensitive)
    if (address.toLowerCase().startsWith(prefixLower)) {
      // Send any remaining attempts
      if (attempts > 0) {
        parentPort.postMessage({ type: 'progress', attempts });
      }
      parentPort.postMessage({ type: 'result', seed, attempts: 0 });
      break;
    }
  }
}