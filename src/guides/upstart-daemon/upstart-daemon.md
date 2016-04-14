# How to Run Bitcore as a Daemon with Upstart

This guide explains the steps to setup bitcore as a daemon on Linux using the upstart init daemon.

## Create a Daemon user

Create a `bitcore` user and switch over to using it.

```bash
useradd -r -m bitcore
sudo su - bitcore
```

## Install Node.js v4 LTS

It's recommended to install the Node Version Manager, as this makes it simple to switch between different Node.js versions.  We will specifically need to install and run v0.12 or v4 LTS.

Please follow the directions at [https://github.com/creationix/nvm#install-script](https://github.com/creationix/nvm#install-script) and then run:

```bash
nvm install v4
nvm use v4
```

## Install Bitcore

Use npm to install bitcore globally for the `bitcore` user.

```bash
npm install -g bitcore
```

**Note**: Do not run this command with `sudo` or with *root privileges* as this will lead to [permission issues](https://docs.npmjs.com/misc/scripts#user).

## Configure Bitcore

Before starting the node and beginning the blockchain sync, you may want to configure the services available or bitcoin network settings. These options are documented in the [Full Node](/guides/full-node) guide.

## Edit and Copy the Upstart Config

Once you are finished configuring your node, view or edit the upstart config file in bitcore at `etc/init/bitcored.conf` to make any changes specific to your environment.

Then copy the file to `/etc/init/bitcored.conf`

```
sudo cp etc/init/bitcored.conf /etc/init/
```

## Start the Service Manually

The daemon will start on next system restart, or you can start it manually.

```
service bitcored start
```

## View the Logs

Logs can be found by default in `/var/log/upstart/bitcored.log`

## Daemon Setup Complete

`bitcored` will now start and stop as part of normal system startup/shutdown.  
