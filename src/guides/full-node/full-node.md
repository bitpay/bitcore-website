# Running a Full Node

This tutorial will go over the basics to spinning up a full Bitcoin node and adding a block explorer Insight. Before you begin you'll need to have about 100GB of disk space available to store the Bitcoin blockchain plus additional database information. Both 64bit Mac OS X and GNU/Linux are currently supported. The process of downloading the blocks and indexing can take upwards of 4 hours, depending on Internet connection and other factors. So it's suggested to plan accordingly and let the node synchronize while you're away. It's also possible to use an existing Bitcoin data directory, which will speed up the process.

## Install Node.js v0.12

It's recommended to install the Node Version Manager, as this makes it simple to switch between different Node.js versions. We will specifically need to install and run v0.12. Please follow the directions at https://github.com/creationix/nvm#install-script and then run:

```bash
nvm install v0.12.7
```

## Install Bitcore

Bitcore Node will come with a commandline utility for creating and managing your full node. To get started you can run these commands, and you'll then have `bitcore-node` command in your path:

```
npm install -g bitcore
```

Note: It's should not necessary to run this command with `sudo`, as it should install in your home directory.

At this point, if you just want to sync the blockchain and run the Insight Block Explorer, then you are done!

## Create a New (Non-Global) Node for Running Custom Services like Bitcore Wallet Service

If you would like to create additional nodes that are not in your global npm installation directory, or run the Bitcore Wallet Service, please do the following:

```bash
bitcore create mynode #this will create a mynode directory in your current working directory
```

This will create the directory "mynode" and install all of the necessary dependencies and configuration files for your node.


To create a node if you already have a Bitcoin data directory that you want to use:

```bash
bitcore -d <path-to-datadirectory> mynode
```

The database directory will likely be at `~/.bitcore`. Please make sure however that you'll need to have `txindex` enabled in your bitcoin configuration file. To enable `txindex` add `txindex=1` and `reindex=1` to `~/.bitcoin/bitcoin.conf`. After you start Bitcoin with `reindex=1` you can remove it, however leave `txindex=1`.

For installation instructions regarding the Bitcore Wallet Service, please see [wallet service](/guides/wallet-service)

## Configure the Network

Your node can run on "livenet" or "testnet". If you wish to configure the network you can do so by opening the `bitcore-node.json` configuration file:

```bash
cd mynode
gedit bitcore-node.json
```

And change the network value to "testnet" or "livenet", here is an example configuration file:

```
{
  "name": "Bitcore Node",
  "services": [
    "address",
    "bitcoind",
    "db",
    "web"
  ],
  "datadir": "/home/user/.bitcore",
  "network": "livenet",
  "port": 3001
}
```

## Start Syncing

As mentioned previously, this process can take several hours to complete, so you can likely start the script and come back later to check on the status. So let's get started!

```bash
cd mynode
bitcored
```

This will start up all of the services that have been enabled in your configuration file. The first service that will most likely be started is Bitcoin itself, followed by others that depend on it, such as the Database and Address Service. The syncing process will connect to other Bitcoin peers in the network and start downloading the blockchain, verifying proof-of-work, transaction history and start creating indexes to query the blockchain. Both Bitcoin and the Database Service will log the status of the initial syncronization process.

## Query for Information

Get details about the genesis block:

```bash
bitcore call getBlock 000000000019d6689c085ae165831e934ff763ae46a2a6c172b3f1b60a8ce26f
```

Get the balance of an address, results are in satoshis:

```bash
bitcore call getBalance 12i6Y6TZsmbFPJiQr6UXqTqmkL5j2FCXD3 true
```

The first argument is the address and the second is a boolean to include the mempool (true includes the mempool).


## Install a Block Explorer

While running individual CLI commands can be useful way to interact with your node, being able to view it, may even be better. So let's get started by installing the blockchain explorer Insight!

```
bitcore install insight-api insight-ui
```

This will run an `npm` command to download the package `insight-api` and add it to your node's `package.json` as well as `bitcore-node.json`. The next time you start up your node, the service will be enabled and you'll be able to open your web browser to view the explorer.

Go to the URL (default):

`http://localhost:3001/insight/`
