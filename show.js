const { SBitRPC } = require('sbitjs')
const argv = require('argv')

function parseArgv() {
    argv.option([
        {
            name: 'rpcuser',
            type: 'string',
            description: 'Username for JSON-RPC connections of SBit',
        },
        {
            name: 'rpcpassword',
            type: 'string',
            description: 'Password for JSON-RPC connections of SBit',
        },
        {
            name: 'rpcport',
            type: 'string',
            description: 'Port for JSON-RPC connections of SBit',
        },
        {
            name: 'number',
            type: 'int',
            description: 'Number of blocks go through',
        }
    ])
    let defaultOptions = {
        rpcuser: 'sbit',
        rpcpassword: 'opreturn',
        rpcport: '22302',
        number: 100
    }
    let args = argv.run()
    let options = Object.assign(defaultOptions, args.options)

    return options
}

function connectSBit(options) {
    let url = 'http://' + options.rpcuser + ':' + options.rpcpassword + '@127.0.0.1:' + options.rpcport
    return new SBitRPC(url)
}

async function getTransaction(rpc, txid) {
    try {
        let transaction = await rpc.rawCall('getrawtransaction', [txid, 1])
        return transaction
    } catch (e) {
    }

    try {
        let transaction = await rpc.rawCall('gettransaction', [txid])
        return await rpc.rawCall('decoderawtransaction', [transaction.hex])
    } catch (e) {
    }
}

function hexToText(hex) {
    return Buffer.from(hex, 'hex').toString('utf8')
}

async function show(rpc, options) {
    let blockhash = await rpc.rawCall('getbestblockhash')

    for (let i = 0; i < options.number; i++) {
        let block = await rpc.rawCall('getblock', [blockhash])
        blockhash = block.previousblockhash
        if (block.tx.length < 3) {
            continue
        }

        for (let j = 2; j < block.tx.length; j++) { // skip coinbase and coinstake
            // get transaction
            let txid = block.tx[j]
            let transaction = await getTransaction(rpc, txid)

            if (transaction === undefined) {
                console.log('Skip transaction %o', txid)
                continue
            }

            let outs = transaction.vout
            for (let k = 0; k < outs.length; k++) {
                let out = outs[k]

                if (out.scriptPubKey.asm.substring(0, 9) === 'OP_RETURN') {
                    // console.log('output is %o', out)

                    let text = hexToText(out.scriptPubKey.asm.substring(10))
                    console.log({
                        txid: txid, 
                        vout: k, 
                        script: out.scriptPubKey.asm, 
                        text: text})
                }
            }
        }
    }
}

async function run() {
    // parse args
    const options = parseArgv()
    console.log('Options are:\n%o', options)

    // connect to SBit
    const rpc = connectSBit(options)
    // console.log('SBit RPC is:\n%o', rpc)

    // show message
    await show(rpc, options)

}

run().then()