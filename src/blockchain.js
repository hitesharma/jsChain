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

    addTransaction(transaction){
        if(transaction.amount <= 0){
            throw new Error('Transaction should be higher than 0');
        }

        if(this.getBalance(transaction.fromAddress) < transaction.amount){
            throw new Error('Not Enough Balance');
        }

        if(!transaction.fromAddress || !transaction.toAddress){
            throw new Error('Transaction must include Sender\'s and Receiver\'s address');
        }

        if(!transaction.validate()){
            throw new Error('Invalid transaction');
        }

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

    verifyChain(){
        for(let i = 1; i<this.chain.length; i++){
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i-1];

            if(!currentBlock.verifyTransactions()){
                return false;
            }

            if(currentBlock.hash !== currentBlock.calculateHash()){
                return false;
            }

        }

        return true;
    }
}

module.exports.Block=Block;
module.exports.Blockchain=Blockchain;
module.exports.Transaction=Transaction;