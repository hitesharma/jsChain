# jsChain

For Educational Purpose only

### Clone repository
```
git clone https://github.com/hitesharma1/jsChain.git

cd jsChain
```

### Generate a keypair
```js
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

const myKeyPair = ec.genKeyPair();
```

The `myKeyPair` object contains the public & private key:
```js
console.log('Public key:', myKeyPair.getPublic('hex'));
console.log('Private key:', myKeyPair.getPrivate('hex'));
```

### Create blockchain instance 
```js
const {Blockchain} = require('./src/blockchain');
const {Transaction} = require('./src/transaction');

const myChain = new Blockchain();
```

### Add transactions
```js
// Transfer 10 coins from my wallet address to `toAddress`
const tx = new Transaction(myKeyPair.getPublic('hex'), 'toAddress', 10);

tx.signTransaction(myKeyPair);

myChain.addTransaction(tx);
```

###  Complete Pending Transactions and Mine Block
```js
myChain.minePendingTransactions(myKeyPair.getPublic('hex'));
```

### Check wallet Balance
```js
console.log('Wallet's balance: ', myChain.getBalance(myKeyPair));
```

### Verify Blockchain
```js
console.log('Verify Chain: ', myChain.verifyChain()? 'Yes': 'No');
```