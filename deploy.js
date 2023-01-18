const HDWalletProvider = require('@truffle/hdwallet-provider')
const Web3 = require('Web3')
const {interface, bytecode} = require('./compile')

const provider = new HDWalletProvider(
    'regret street tragic include amount deer delay vacant climb subject stuff photo',
    'https://goerli.infura.io/v3/9b3c6e68269b4c2c8bce764c44c778cd'
)

const web3 = new Web3(provider)

const deploy = async () => {
    const accounts = await web3.eth.getAccounts()
    const firstAccount = accounts[0]

    console.log('Attempting to deploy from account', firstAccount)

    const result = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({data: bytecode, arguments: ['Hi there!']})
        .send({gas: '1000000', from: firstAccount})

    console.log('Contract deployed to', result.options.address)

    provider.engine.stop()
}

deploy()