const crypto = require('crypto');

class Block{
    constructor(timestamp,transactions,previousHash=''){
        this.timestamp=timestamp;
        this.transactions=transactions;
        this.previousHash=previousHash;
        this.hash=this.calculateHash();
        this.nonce=0;
    }

    calculateHash(){
        return crypto.createHash('sha256').update(this.previousHash + this.timestamp + JSON.stringify(this.transactions) + this.nonce).digest('hex');
    }

    mineBlock(difficulty){
        while(this.hash.substring(0,difficulty) !== "0".repeat(difficulty)){
            this.nonce++;
            this.hash=this.calculateHash();
        }
        console.log(this.hash);
    }

    verifyTransactions(){
        for(const tx of this.transactions){
            if(!tx.validate()){
                return false;
            }
        }

        return true;
    }
}

exports.Block=Block;