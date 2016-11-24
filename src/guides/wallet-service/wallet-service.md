# Running a Wallet Service
The purpose of this tutorial is to show how to setup the Wallet Service. The Wallet Service is the backend for wallets such as BitPay's [Copay Multisignature Wallet](https://copay.io). The wallet service is very much like the backend for traditional SPV (Simplified Payment Verification) wallets except that the wallet service is much more feature-full. It's recommended to be familiar with running a Bitcore node running before starting this tutorial, please see the [Run a Full Node](https://bitcore.io/guides/full-node/) guide for details.

## Installing MongoDB

[MongoDB](https://www.mongodb.com/) is the database for the [Bitcore Wallet Service](https://github.com/bitpay/bitcore-wallet-service) and is the main dependency outside of the Node.js modules. Follow the [installation instructions](https://docs.mongodb.com/manual/installation/) detailed at the MongoDB website, and/or follow details below.

### Mac OS X

The easiest way to install MongoDB is to use brew:

```bash
brew install update
brew install mongodb
mkdir -p /data/db
sudo chown -R `whoami` /data/db #this assumes that the next step will be run by the current user
mongod
```
Please refer to these [complete instructions](http://docs.mongodb.org/manual/tutorial/install-mongodb-on-os-x/) at the MongoDB website.

### Ubuntu/Debian

MongoDB is included in stardard repositories and can be installed via the package manager:

```bash
sudo apt-get install mongodb
```
This should automatically start the `mongod` process.

Kerberos packages will also need be available for the Node.js MongoDB driver depends:

```bash
apt-get install libkrb5-dev
```

## Add the Wallet Service to Our Node

**Note**: If you do not already have a Bitcore node setup, please see the [Run a Full Node](/guides/full-node) guide.

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
    },
    "bitcoind": {
      "datadir": "/home/user/.bitcore/data",
      "exec": "/home/user/bitcoin/src/bitcoind"
    }
  },
  "services": [
    "bitcoind",
    "bitcore-wallet-service",
    "insight-api",
    "web"
  ]
}
```

Notice that you can also specify which port your Wallet Service will run on (default is 3232).

### Using free TLD and free SSL certificate to allow SSL/TLS support from mobile clients
Self-signed certificates do not work very well, so using a TLD domain along with a root CA signed SSL certificate is the best method to ensure you can connect.

First, get a free TLD from [http://www.dot.tk/](http://www.dot.tk/) and set the DNS to point to your server IP address. (Must be renewed every 12 months.)
 (Be carful when signing up using an email address, dot.tk stores plaintext passwords, so try to use Facebook/Windows Live login if possible)

Once you get your TLD and it is pointing to your IP, make sure you have Apache installed. (This is merely to make the SSL cert process automated, not required)

```bash
sudo apt-get update
sudo apt-get install apache2
```

Then install and run letsencrypt. Use multiple -d flags to indicate all possible domains and subdomains. (The --apache flag will automate the challenge and response process for validating ownership of the domain)

```bash
git clone https://github.com/letsencrypt/letsencrypt
cd letsencrypt
./letsencrypt-auto run --apache -d mysite1.tk -d mysite2.tk -d www.mysite2.tk -d bws.mysite2.tk
```

Once everything is finished, install the necessary proxy services for apache.

```bash
a2enmod
######## After running a2enmod it will ask for a list. Paste the below.
proxy proxy_ajp proxy_http rewrite deflate headers proxy_balancer proxy_connect proxy_html
```

Now edit the SSL virtualhost document, with the following.

```bash
sudo nano /etc/apache2/sites-enabled/000-default-le-ssl.conf
```

You want to add to it so it looks something like this: (The Proxy lines will be added)

```bash
<VirtualHost *:443>
          ServerName bws.mysite2.tk
          ServerAlias mysite2.tk
          SSLCertificateFile /etc/letsencrypt/live/bws.mysite2.tk/cert.pem
          SSLCertificateKeyFile /etc/letsencrypt/live/bws.mysite2.tk/privkey.pem
          SSLCertificateChainFile /etc/letsencrypt/live/bws.mysite2.tk/chain.pem
          Include /etc/letsencrypt/options-ssl-apache.conf

          ProxyPreserveHost On
          ProxyRequests Off
          ProxyPass /bws/api/ http://localhost:3232/bws/api/
          ProxyPassReverse /bws/api/ http://localhost:3232/bws/api/
</VirtualHost>
```

This VirtualHost will be triggered once someone accesses the server from bws.mysite2.tk, then it will check for requests to /bws/api/ and forward them to http://localhost:3232/bws/api/.

This would be how to proxy to the default setting for the BWS server (http on port 3232 with api path as /bws/api/... so change accordingly)

Now just restart apache.

```bash
sudo service apache2 restart
```

Now try connecting to BWS on https://bws.mysite2.tk/bws/api/ and it should work on any device.

## Conclusion
You should now be able to run your own Wallet Service for your users. Now you can have ultimate control over your wallets without trusting random SPV nodes on the Internet.
