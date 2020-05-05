const sha256 = require('crypto-js/sha256');

class Block{
    constructor(timestamp,transaction,previousHash=''){
        this.timestamp=timestamp;
        this.transaction=transaction;
        this.previousHash=previousHash;
        this.hash=this.calculateHash();
    }
    calculateHash(){
        return sha256(this.previousHash + this.timestamp + JSON.stringify(this.transaction)).toString();
    }
}

class Blockchain{
    constructor(){
        this.chain=[this.genesisBlock()];
    }
    genesisBlock(){
        return new Block(Date.now(),"Genesis Block","0");
    }
    getLatestBlock(){
        return this.chain[this.chain.length-1];
    }
    addBlock(newBlock){
        newBlock.previousHash=this.getLatestBlock().hash;
        newBlock.hash=newBlock.calculateHash();
        this.chain.push(newBlock);
    }
}