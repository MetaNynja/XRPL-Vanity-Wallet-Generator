# XRPL Vanity Wallet Generator

Welcome to the XRPL Vanity Wallet Generator! This tool creates a unique wallet address for the XRP Ledger (XRPL) that starts with a custom prefix you choose (e.g., `ra` or `rMyName`). Think of it like getting a personalized license plate for your XRPL wallet! It uses two workers to search quickly and shows progress on the same line as it works.

This guide is written for beginners, so don’t worry if you’re new to coding or the XRPL. Follow these steps, and you’ll be generating wallets in no time!

---

## What is the XRPL?
The XRP Ledger (XRPL) is a fast, low-cost blockchain for sending and receiving XRP (a cryptocurrency). An XRPL wallet has:
- **Address**: A public ID starting with `r` (e.g., `raBcDe...`).
- **Seed**: A secret key starting with `s` (e.g., `sEd9k...`), like a password.

This tool finds a wallet address that starts with your chosen prefix, making it unique and cool!

---

## What You Need
Before you start, make sure you have:
- A computer (Windows, Mac, or Linux).
- [Node.js](https://nodejs.org/) installed (this runs JavaScript code). Download the "LTS" version.
- [Visual Studio Code (VS Code)](https://code.visualstudio.com/) or another text editor.
- [Git](https://git-scm.com/) installed to download the code.
- A GitHub account (you already have one!).

---

## Step 1: Download the Code
1. **Clone the repository**:
   - Open VS Code.
   - Press `Ctrl+Shift+P` (Windows/Linux) or `Cmd+Shift+P` (Mac) to open the Command Palette.
   - Type `Git: Clone` and select it.
   - Paste this URL: `https://github.com/MetaNynja/XRPL-Vanity-Wallet-Generator.git`
   - Choose a folder to save the project (e.g., Desktop) and click **Select Repository Location**.
   - Click **Open** when VS Code asks to open the cloned repository.

2. **Open the project folder**:
   - If it doesn’t open automatically, go to **File > Open Folder** and select the `XRPL-Vanity-Wallet-Generator` folder.

---

## Step 2: Install Dependencies
The tool needs one library called `ripple-keypairs` to generate wallets.

1. **Open the terminal in VS Code**:
   - Go to **View > Terminal** or press `Ctrl+`` (Windows/Linux) or `Cmd+`` (Mac).

2. **Install the library**:
   - Type this command and press Enter:
     ```bash
     npm install ripple-keypairs
     ```
   - Wait for it to finish (it downloads the library, usually in a few seconds).

---

## Step 3: Run the Tool
1. **Find the main file**:
   - In the Explorer panel (left side of VS Code), you’ll see `generate.js`. This is the main script.

2. **Start the tool**:
   - In the terminal, make sure you’re in the project folder (it should say `XRPL-Vanity-Wallet-Generator`).
   - Type this command and press Enter:
     ```bash
     node generate.js
     ```

3. **Enter a prefix**:
   - The tool will ask: `Enter the desired address prefix (e.g., rMyWallet):`
   - Type a prefix (e.g., `ra` or `rMyName`) and press Enter.
   - **Important**: The prefix must start with `r` or `R`, as all XRPL addresses do.

4. **Watch the progress**:
   - You’ll see a single line like `Total wallets generated: 200`, updating as the tool tries different wallets.
   - When it finds a match, it’ll show something like:
     ```
     Found a matching address after 250 attempts:
     Address: raBcDeFgHi...
     Seed: sEd9kX7j...
     Keep the seed secret! It controls your wallet.
     ```

---

## Understanding the Output
- **Address**: Your new XRPL wallet address, starting with your prefix (e.g., `raBcDe...`).
- **Seed**: The secret key for your wallet (e.g., `sEd9kX7j...`). **Never share this!** It’s like the key to your bank account.
- **Attempts**: How many wallets the tool tried. Short prefixes like `ra` are fast (seconds), while longer ones like `rMyName` take longer (minutes or more).

---

## Using Your Wallet
To use your wallet on the XRPL:
1. **Fund it**:
   - For testing, visit the [XRPL Testnet Faucet](https://xrpl.org/xrp-testnet-faucet.html), paste your address, and get free test XRP.
   - For real use, send at least 1 XRP to the address from another wallet.
2. **Access it**:
   - Use an XRPL wallet app like [Xaman](https://xaman.app/) .
   - Import the wallet using the seed.

---

## Tips for Beginners
- **Try short prefixes**: `ra` or `rTest` are found quickly. Long prefixes like `rMyFullName` can take a long time.
- **Keep the seed safe**: Write it down on paper or store it securely. If you lose it, you lose your wallet!
- **Test first**: Use the testnet to practice before using real XRP.
- **Two workers**: The tool uses two workers to search faster, so it’s great on computers with multiple CPU cores.

---

## Troubleshooting
- **Error: "Prefix must start with 'r' or 'R'"**:
  - Make sure your prefix starts with `r` (e.g., `ra`, not `abc`).
- **Error: "command not found: node"**:
  - Install Node.js from [nodejs.org](https://nodejs.org/) (get the "LTS" version) and restart VS Code.
- **Error: "Cannot find module 'ripple-keypairs'"**:
  - Run `npm install ripple-keypairs` in the terminal.
- **It’s slow**:
  - Use a shorter prefix (e.g., `ra` instead of `rMyName`).
  - Check if your computer is running other heavy programs.

---

## Questions?
If you need help, open an [issue](https://github.com/MetaNynja/XRPL-Vanity-Wallet-Generator/issues) on this repository or ask in the [XRPL Community](https://xrpl.org/community.html). Happy wallet generating!

---

## Contributing
Want to improve this tool? Feel free to fork the repository, make changes, and submit a pull request. Ideas for new features are welcome!
