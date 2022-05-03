# sbit-opreturn
A demo for storing data on Sbit using OP_RETURN

# How to use
1. Download the code and install dependencies.
```
$ git clone https://github.com/SBit-Project/sbit-opreturn.git
$ cd sbit-opreturn
$ npm install
```

2. Start a Sbit node and make sure there are some coins in the wallet.
```
sbitd -rpcuser=sbit -rpcpassword=opreturn -testnet -daemon
```

3. Send text to Sbit using OP_RETURN.
```
$ node send.js --help

Usage: send.js [options]

	--help, -h
		Displays help information about this script
		'send.js -h' or 'send.js --help'

	--rpcuser
		Username for JSON-RPC connections of Sbit

	--rpcpassword
		Password for JSON-RPC connections of Sbit

	--rpcport
		Port for JSON-RPC connections of Sbit

	--gas
		Gas used to pay the transaction

	--msg
		Message to be sent, no more than 80 byte

$ node send.js --msg="I love sbit"
Options are:
{ rpcuser: 'sbit',
  rpcpassword: 'opreturn',
  rpcport: '22302',
  gas: 0.1,
  msg: 'I love sbit',
  msgHexStr: '49206c6f766520e9878fe5ad90' }
Transaction is:
'53702863d8bb22b98b99546c117dab1c238dab85b3f70d876dcbda27bf478f35'
```

4. Show recent OP_RETURN transactions.
```
$ node show.js --help

Usage: show.js [options]

	--help, -h
		Displays help information about this script
		'show.js -h' or 'show.js --help'

	--rpcuser
		Username for JSON-RPC connections of Sbit

	--rpcpassword
		Password for JSON-RPC connections of Sbit

	--rpcport
		Port for JSON-RPC connections of Sbit

	--number
		Number of blocks go through

$ node show.js
Options are:
{ rpcuser: 'sbit',
  rpcpassword: 'opreturn',
  rpcport: '22302',
  number: 100 }
{ txid:
   '53702863d8bb22b98b99546c117dab1c238dab85b3f70d876dcbda27bf478f35',
  vout: 0,
  script: 'OP_RETURN 49206c6f766520e9878fe5ad90',
  text: 'I love sbit' }
```
