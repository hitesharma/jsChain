const sha256 = require('crypto-js/sha256');
const {Block} = require('./block');
const {Transaction} = require('./transaction');

class Blockchain{
    constructor(){
        this.chain=[this.genesisBlock()];
        this.difficulty=1;
        this.pendingTransactions=[];
        this.miningReward=1; 
    }

    genesisBlock(){
        return new Block(Date.now(),"Genesis Block","0");
    }

    minePendingTransactions(miningRewardAddress){
        let newBlock=new Block(Date.now(),this.pendingTransactions);
        newBlock.mineBlock(this.difficulty);
        console.log("Block mine success");
        this.chain.push(newBlock);
        this.pendingTransactions=[ new Transaction(null,miningRewardAddress,this.miningReward) ];
    }

    createTransaction(transaction){
        this.pendingTransactions.push(transaction);
    }

    getBalance(address){
        let balance = 0;
        for(const block of this.chain){
            for(const tx of block.transactions){
                if(tx.fromAddress === address){
                    balance -= tx.amount;
                }

                if(tx.toAddress === address){
                    balance += tx.amount;
                }
            }
        }
        return balance;
    }

    getLatestBlock(){
        return this.chain[this.chain.length-1];
    }
}

module.exports.Block=Block;
module.exports.Blockchain=Blockchain;
module.exports.Transaction=Transaction;