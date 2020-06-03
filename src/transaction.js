const crypto = require('crypto');
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

class Transaction{
    constructor(fromAddress,toAddress,amount){
        this.fromAddress=fromAddress;
        this.toAddress=toAddress;
        this.amount=amount;
    }

    calculateHash(){
        return crypto.createHash('sha256').update(this.fromAddress + this.toAddress + this.amount).digest('hex');
    }

    signTransaction(signingKey){
        if(signingKey.getPublic('hex') !== this.fromAddress){
            throw new Error('Cannot sign transactions of other wallets');
        }
        const txHash =this.calculateHash();
        const sign = signingKey.sign(txHash, 'base64');
        this.signature = sign.toDER('hex');
    }

    validate(){
        if(this.fromAddress === null)
            return true;

        if(!this.signature || this.signature.length === 0){
            throw new Error('No Signature in the transaction');
        }

        const key = ec.keyFromPublic(this.fromAddress, 'hex');

        return key.verify(this.calculateHash(), this.signature);
    }
}

exports.Transaction=Transaction;