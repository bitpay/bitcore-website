# Run Bitcoin Standalone

This tutorial describes running `bitcoind` standalone without the Node.js components and service architecture. It assumes prior experience and familiarity with running `bitcoind` and associated tools from [Bitcoin Core](https://bitcoincore.org/). We will go over installation and usage of the additional features and indexes introduced in the [Bitcore branch](https://github.com/bitpay/bitcoin/tree/0.12.1-bitcore), as well verifying the download and deterministic build.

## Download & Verify

The `bitcoind` binary is deterministically built with [Gitian](https://github.com/devrandom/gitian-builder). For more information about this please see the [Gitian building](https://github.com/bitpay/bitcoin/blob/0.12.1-bitcore/doc/gitian-building.md) documentation, and the corresponding [gitian.sigs](https://github.com/bitpay/gitian.sigs) repository with signatures and hashes for these builds.

Add the signing keys to your key ring and verify fingerprints:

```
gpg --keyserver pgp.mit.edu --recv-keys 0xC07A276D 0xEF6BDB7F
gpg --list-keys --with-fingerprint 0xC07A276D 0xEF6BDB7F
```
Fingerprints should match:
- D909 EFE6 70B5 F6CC 89A3  607A 9BBF 07CA C07A 276D *(Braydon G. Fuller)*
- F8B0 891C C459 C197 65C2  5043 3319 5D27 EF6B DB7F *(Chris Kleeschulte)*

Go to [https://github.com/bitpay/bitcoin/releases](https://github.com/bitpay/bitcoin/releases) to get the URLs to the latest release for your system.

```
wget https://github.com/bitpay/bitcoin/releases/download/v0.12.1-bitcore/bitcoin-0.12.1-linux64.tar.gz
wget https://github.com/bitpay/bitcoin/releases/download/v0.12.1-bitcore/SHA256SUMS.asc
```

Verify the download by checking that the checksums match:
```
gpg --verify SHA256SUMS.asc
cat "SHA256SUMS.asc" | grep "bitcoin-0.12.1-linux64.tar.gz"
sha256sum bitcoin-0.12.1-linux64.tar.gz
```

And then extract the archive in your desired location and run bitcoind:
```
tar -xvzf bitcoin-0.12.1-linux64.tar.gz
cd bitcoin-0.12.1
./bitcoind
```

## New Indexes

There are three new configuration options to add to your `bitcoin.conf`
```
addressindex=1
timestampindex=1
spentindex=1
```

---

**addressindex**

Records all changes to an address for retrieving txids, balances and unspent outputs for addresses. Changes are stored and sorted in block order. Both p2sh and p2pkh address types are supported. The index records two sets of key/value pairs. The first records all activity and is useful for viewing transaction history and all changes. The second is specifically for retrieving unspent outputs by address, and is smaller as values are removed once they are spent.

---

**spentindex**

This index has multiple purposes and brings closer together inputs and outputs of transactions. The main purpose is to efficiently determine the address and amount of an input's previous output. The second purpose is to be able to determine which input spent an output.

---

**timestampindex**

This index maps timestamps with block hashes and is useful for searching blocks by date instead of by height. This is useful for a block explorer that will give search options by date. However it should be noted that the timestamps of blocks can be *out of order*, as there is a tolerance of around 2 hours that a timestamp of block is allowed to be set.

## New RPC Methods and Updates

---

**getaddresstxids**

*Requires Config*: `addressindex=1`

This method will search for txids involving an address or addresses. The txids will be sorted in block order in the sequence of the transactions *(the most recent is at the end)*. The txids will only include confirmed transactions. There is also an option to specify a range of block heights to query that can be useful for updating a cache.

```
~$ bitcoin-cli getaddresstxids '{"addresses": ["12cbQLTFMXRnSzktFkuoG3eHoMeFtpTu3S"], "start": 220151, "end": 400000}'
[
  "1554a02d4eb1c7a73e3736922ed99530e360784e709896c42e5756e65b2da341",
  "20fb69a94413637cb50f65e473f91d2599a04d5a0bf9bf6a5e9e843df2710ea4"
]
```

---

**getaddressdeltas**

*Requires Config*: `addressindex=1`

This method is similar to `getaddresstxids`, however will include more details, and will include every change involving an address. Each result corresponds with either an input or an output depending if the satoshi value is positive or negative. The `index` corresponds with the input or output index. The `blockindex` corresponds with the index of the transaction within the block. These results will also only include confirmed changes.

```
~$ bitcoin-cli getaddressdeltas '{"addresses": ["12cbQLTFMXRnSzktFkuoG3eHoMeFtpTu3S"], "start": 220151, "end": 400000}'
[
  {
    "satoshis": 1,
    "txid": "1554a02d4eb1c7a73e3736922ed99530e360784e709896c42e5756e65b2da341",
    "index": 2,
    "blockindex": 236,
    "height": 220151,
    "address": "12cbQLTFMXRnSzktFkuoG3eHoMeFtpTu3S"
  },
  {
    "satoshis": 30000,
    "txid": "20fb69a94413637cb50f65e473f91d2599a04d5a0bf9bf6a5e9e843df2710ea4",
    "index": 0,
    "blockindex": 165,
    "height": 228208,
    "address": "12cbQLTFMXRnSzktFkuoG3eHoMeFtpTu3S"
  }
]
```

---

**getaddressbalance**

*Requires Config*: `addressindex=1`

This method will calculate the balance of for an address or addresses from confirmed transactions. There are two values returned, one is the current balance and the other is the total received, both are integers as satoshis.

```
~$ bitcoin-cli getaddressbalance '{"addresses": ["12cbQLTFMXRnSzktFkuoG3eHoMeFtpTu3S"]}'
{
  "balance": 25527936,
  "received": 25527936
}
```
**Note**: The total received means all funds received including those from the same address.

---

**getaddressutxos**

*Requires Config*: `addressindex=1`

This method will return all unspent outputs for an address or addresses. Results will only included confirmed outputs and are sorted by block height.

```
~$ bitcoin-cli getaddressutxos '{"addresses": ["12cbQLTFMXRnSzktFkuoG3eHoMeFtpTu3S"]}'
[
  {
    "address": "12cbQLTFMXRnSzktFkuoG3eHoMeFtpTu3S",
    "txid": "1554a02d4eb1c7a73e3736922ed99530e360784e709896c42e5756e65b2da341",
    "outputIndex": 2,
    "script": "76a91411b366edfc0a8b66feebae5c2e25a7b6a5d1cf3188ac",
    "satoshis": 1,
    "height": 220151
  },
  {
    "address": "12cbQLTFMXRnSzktFkuoG3eHoMeFtpTu3S",
    "txid": "20fb69a94413637cb50f65e473f91d2599a04d5a0bf9bf6a5e9e843df2710ea4",
    "outputIndex": 0,
    "script": "76a91411b366edfc0a8b66feebae5c2e25a7b6a5d1cf3188ac",
    "satoshis": 30000,
    "height": 228208
  },
  ...
]

```

---

**getaddressmempool**

*Requires Config*: `addressindex=1`

Since all of the above methods return confirmed transactions, this method can be used to calculate unconfirmed portion of the balance, txids and unspent outputs. The results are similar to `getaddressdeltas` with additional information. Instead of `height` there is `timestamp` that is the time the transaction entered the mempool. There is also `prevtxid` and `prevout` that can be used for marking utxos as spent.

```
~$ bitcoin-cli getaddressmempool '{"addresses": ["3M366gYcKHbvun6YYF1Xim6sDeT5JSTVUy"]}'
[
  {
    "address": "3M366gYcKHbvun6YYF1Xim6sDeT5JSTVUy",
    "txid": "ff21363aa331f2dc7bbf70acc7eefb7a4080645d30b4e319ca190ceaecbcce42",
    "index": 0,
    "satoshis": -10684303,
    "timestamp": 1463602662,
    "prevtxid": "0c15f067d6b082f4dcc2740f039d33bb4f47b23c79ceae880ca759268389f82a",
    "prevout": 1
  },
  {
    "address": "3M366gYcKHbvun6YYF1Xim6sDeT5JSTVUy",
    "txid": "ff21363aa331f2dc7bbf70acc7eefb7a4080645d30b4e319ca190ceaecbcce42",
    "index": 1,
    "satoshis": 10454303,
    "timestamp": 1463602662
  }
]
```

---

**getblockhashes**

*Requires Config*: `timestampindex=1`

This method searches for block hashes within a range of two timestamps. The first argument is the more recent timestamp and the second is the less recent timestamp. The timestamp is in seconds, results are sorted by timestamp with the most recent at the end.

```
~$ bitcoin-cli getblockhashes 1231614698 1231024505
[
  "00000000839a8e6886ab5951d76f411475428afc90947ee320161bbf18eb6048",
  "000000006a625f06636b8bb6ac7b960a8d03705d1ace08b1a19da3fdcc99ddbd",
  "0000000082b5015589a3fdf2d4baff403e6f0be035a5d9742c1cae6295464449",
  "000000004ebadb55ee9096c9a2f8880e09da59c0d68b1c228da88e48844a1485",
  ...
]
```

---

**getspentinfo**

*Requires Config*: `spentindex=1`

This method will return the txid and input index that has spent the output.

```
~$ bitcoin-cli getspentinfo '{"txid": "0437cd7f8525ceed2324359c2d0ba26006d92d856a9c20fa0241106ee5a597c9", "index": 0}'
{
  "txid": "f4184fc596403b9d638783cf57adfe4c75c605f6356fbc91338530e9831e9e16",
  "index": 0,
  "height": 170
}
```

---

**getrawtransaction**

*Requires Config*: `spentindex=1`

This method's verbose result will now has some additional fields added when spentindex is enabled. The `vin` values will include `value` *(a float in BTC)* and `valueSat` *(an integer in satoshis)* with the previous output value as well as the `address`. The `vout` values will also now include a `valueSat` *(an integer in satoshis)*. It will also include `spentTxId`, `spentIndex` and `spentHeight` that corresponds with the input that spent the output.

```
~$ bitcoin-cli getrawtransaction "1d21fdbbddc8985ead4079261d9db4608f0b3cc946cb52081c5e347a9cddd63a" 1
{
  "hex": "01000000019947f74a506878e3e22793d300a90a35300bc9a485d46eff04a0cb79e8852fe8000000006b483045022100fc40f8211e0d2d93b0058e164638c3af7a11c1a66aeea0b106bf32afacbad65502206861ca00638d85374b1996c66093f8306666a5596d410f57d51a3ef140c2eaa5012102e6a787823b52bd7833b351dfa6b7cd241f4bf4289ae558f0650c71cd2b985414ffffffff025a256904000000001976a9148b31e454cccc8fee9346c65ad7a831d7a4c018fb88ac00570000000000001976a91411b366edfc0a8b66feebae5c2e25a7b6a5d1cf3188ac00000000",
  "txid": "1d21fdbbddc8985ead4079261d9db4608f0b3cc946cb52081c5e347a9cddd63a",
  "size": 226,
  "version": 1,
  "locktime": 0,
  "vin": [
    {
      "txid": "e82f85e879cba004ff6ed485a4c90b30350aa900d39327e2e37868504af74799",
      "vout": 0,
      "scriptSig": {
        "asm": "3045022100fc40f8211e0d2d93b0058e164638c3af7a11c1a66aeea0b106bf32afacbad65502206861ca00638d85374b1996c66093f8306666a5596d410f57d51a3ef140c2eaa5[ALL] 02e6a787823b52bd7833b351dfa6b7cd241f4bf4289ae558f0650c71cd2b985414",
        "hex": "483045022100fc40f8211e0d2d93b0058e164638c3af7a11c1a66aeea0b106bf32afacbad65502206861ca00638d85374b1996c66093f8306666a5596d410f57d51a3ef140c2eaa5012102e6a787823b52bd7833b351dfa6b7cd241f4bf4289ae558f0650c71cd2b985414"
      },
      "value": 0.74053058,
      "valueSat": 74053058,
      "address": "1NdzHo5YCVS99e5w6rvTFnoVxj773ejFfH",
      "sequence": 4294967295
    }
  ],
  "vout": [
    {
      "value": 0.73999706,
      "valueSat": 73999706,
      "n": 0,
      "scriptPubKey": {
        "asm": "OP_DUP OP_HASH160 8b31e454cccc8fee9346c65ad7a831d7a4c018fb OP_EQUALVERIFY OP_CHECKSIG",
        "hex": "76a9148b31e454cccc8fee9346c65ad7a831d7a4c018fb88ac",
        "reqSigs": 1,
        "type": "pubkeyhash",
        "addresses": [
          "1DgzhDWiPagWc3QPJNkwAMjqH9PqyXY2zH"
        ]
      },
      "spentTxId": "db76bffdfe19707e8c4397c769b954f87acaf14a03ab07c774fa84175fd10a64",
      "spentIndex": 0,
      "spentHeight": 410401
    },
    {
      "value": 0.00022272,
      "valueSat": 22272,
      "n": 1,
      "scriptPubKey": {
        "asm": "OP_DUP OP_HASH160 11b366edfc0a8b66feebae5c2e25a7b6a5d1cf31 OP_EQUALVERIFY OP_CHECKSIG",
        "hex": "76a91411b366edfc0a8b66feebae5c2e25a7b6a5d1cf3188ac",
        "reqSigs": 1,
        "type": "pubkeyhash",
        "addresses": [
          "12cbQLTFMXRnSzktFkuoG3eHoMeFtpTu3S"
        ]
      }
    }
  ],
  "blockhash": "00000000000000000470a32d40180041de9242174fde63e5cc1e011f10c650d1",
  "height": 410400,
  "confirmations": 1953,
  "time": 1462481722,
  "blocktime": 1462481722
}
```
