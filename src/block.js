const sha256 = require('crypto-js/sha256');

class Block{
    constructor(timestamp,transactions,previousHash=''){
        this.timestamp=timestamp;
        this.transactions=transactions;
        this.previousHash=previousHash;
        this.hash=this.calculateHash();
        this.nonce=0;
    }

    calculateHash(){
        return sha256(this.previousHash + this.timestamp + JSON.stringify(this.transactions) + this.nonce).toString();
    }

    mineBlock(difficulty){
        while(this.hash.substring(0,difficulty) !== "0".repeat(difficulty)){
            this.nonce++;
            this.hash=this.calculateHash();
        }
        console.log(this.hash);
    }
}

exports.Block=Block;