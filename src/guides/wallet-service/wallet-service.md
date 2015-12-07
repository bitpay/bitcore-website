# Running a Wallet Service
The purpose of this tutorial is to show how to setup the Wallet Service. The Wallet Service is the backend for wallets such as BitPay's [Copay Multisignature Wallet](https://copay.io). The wallet service is very much like the backend for traditional SPV (Simplified Payment Verification) wallets except that the wallet service is much more feature-full.

## Installing Dependencies
MongoDB is the main dependency that you will need to install outside of node modules.

### Installing MongoDB on Mac OS X
The easiest way to install MongoDB on a Mac is to use brew. Please refer to these [complete instructions](http://docs.mongodb.org/manual/tutorial/install-mongodb-on-os-x/):

```bash
brew install update
brew install mongodb
mkdir -p /data/db
sudo chown -R `whoami` /data/db #this assumes that the next step will be run by the current user
mongod
```

### Installing MongoDB on Linux (Debian-based)

```bash
sudo apt-get install mongodb
```

This usually starts mongod for you after installation, but if it doesn't:

```bash
mongod
```

### Installing Kerberos on Linux (Debian-based)
You may need to install the following package to get the Wallet Service running (if you receive errors about missing headers):

```bash
apt-get install libkrb5-dev
```

Alternatively, you can download MongoDB from the [MongoDB website](https://www.mongodb.org/downloads).

## Add the Wallet Service to Our Node
We begin this process already having a node set up and synced with the Bitcoin Blockchain. To perform the initial setup of your node, please see: [How to run a full node](/guides/full-node)

```bash
cd <your node>
bitcore install bitcore-wallet-service
bitcore install insight-api
```

Now we should be ready to launch Bitcore and test the Wallet Service:

```bash
bitcored
```

## Test the Wallet Service using Copay
The wallet service should be running as a service within Bitcore. You may point wallets on the same network to:

[http://your-bitcore-node-ip:3232/bws/api](http://your-bitcore-node-ip:3232/bws/api)<br>Don't forget to include the "http://"

![Copay Screenshot](https://i.imgur.com/2hsGXrx.png)

### Example
Once the wallet service is running on your computer, configure your Copay wallet as such:
- Open the settings in your Copay wallet. Scroll to "Bitcore Wallet Service" and change this value to: [http://your-bitcore-node-ip:3232/bws/api](http://your-bitcore-node-ip:3232/bws/api)
- Please ensure that Copay is on the same network or that you have opened ports in order to let Copay access your new Wallet Service.
- TLS/SSL support can be enabled by [adding a few things to the bitcore-node.json config](#adding-ssltls-support).

## Test the Wallet Service using the Bitcore Wallet Client
Install the wallet client:

```bash
npm install -g bitcore-wallet
```

Create a new wallet on your server:

```bash
wallet-create -h http://your-bitcore-node-ip:3232/bws/api --testnet 'myWallet' 1-1
   [info] Generating new keys
   * Testnet Wallet Created.
   * Saving file /Users/myUsername/.wallet.dat
```

Add a new address:

```bash
wallet -h http://your-bitcore-node-ip:3232/bws/api address
   * New Address mjfmEtkaVbZPGPLBYvznPDer2dDdcruirB
```

Then send funds to this address from a faucet or other wallet. After you have funds, you can see them by checking your wallet status.

```bash
wallet -h http://your-bitcore-node-ip:3232/bws/api status
   * Wallet myWallet [testnet]: 1-of-1 complete
   * Copayers: myUsername
   * Balance 1,000 bit (Locked: 0 bit)
```

**Pro-tip:** If you would rather not enter the host address of your wallet server every time you run a command, try [aliasing](https://wiki.manjaro.org/index.php?title=Aliases_in_.bashrc) it in your bash profile by adding a line like this to your .bashrc file:

```
alias mywallet='wallet -h http://your-bitcore-node-ip:3232/bws/api'
```

You can then send your bits by using your new alias:

```bash
mywallet send mxo2iZ9e1c4piKMZGyeujk2MwgBU31W7cw 100bit
   * Tx created: ID 36f4 [pending] RequiredSignatures: 1
mywallet sign 36f4
   Transaction signed by you.
mywallet broadcast 36f4
   Transaction Broadcasted: TXID: fa7b45b63562c265c3a79904f1ec9c547bad5dee1508ce63628047a9097bfd0e
mywallet balance
   * Wallet balance 900 bit (Locked 0 bit)
```

## Adding SSL/TLS Support
### Create a self-signed certificate
These directions assume that you have openssl installed. If so, please run:

```bash
openssl
```

You should see an "OpenSSL>" prompt, then press Ctrl+D to exit. If you don't have OpenSSL, then install it [here](http://www.openssl.org)

Next, you can run the following commands to generate a self-signed certificate:

```bash
openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem
```

For ease of use, just type in a password that you can remember to encrypt the key (you have the option to remove it later), then fill out the form or just hit "enter" for every question. If you would like to remove the password from the key.pem that you just created, then follow the next step – otherwise skip it. If you leave the password encryption on your key, then you will need to type it in each time the Wallet Service starts up:

```bash
openssl rsa -in key.pem -out key.nopass.pem
```

Now, key.pem has the password you typed in upon certificate creation and key.nopass.pem does not have any password. It would be a good idea to store key.pem and cert.pem somewhere safe on your computer.

### Edit Your Config.

```bash
vi bitcore-node.json
```

Added https options. Example:

```json
{
  "datadir": "/home/user/.bitcore/data",
  "network": "livenet",
  "port": 3001,
  "https": true,
  "httpsOptions": {
    "key": "some-place-safe/key.nopass.pem",
    "cert": "some-place-safe/cert.pem"
  },
  "servicesConfig": {
    "bitcore-wallet-service": {
      "bwsPort": 3232
    }
  },
  "services": [
    "address",
    "bitcoind",
    "bitcore-wallet-service",
    "db",
    "insight-api",
    "web"
  ]
}
```

Notice that you can also specify which port your Wallet Service will run on (default is 3232).

## Conclusion
You should now be able to run your own Wallet Service for your users. Now you can have ultimate control over your wallets without trusting random SPV nodes on the Internet.
