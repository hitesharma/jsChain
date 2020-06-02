const EC = require('elliptic').ec;

// Choosing elliptic curve
const ec = new EC('secp256k1');

// Generating key pair in hex-strings
const key = ec.genKeyPair();
const publicKey = key.getPublic('hex');
const privateKey = key.getPrivate('hex');

console.log('public key: ', publicKey);
console.log('private key: ', privateKey);