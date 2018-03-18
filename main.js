//example https://github.com/SavjeeTutorials/SavjeeCoin
//npm install crypto-js --save
const SHA256 = require('crypto-js/sha256');

class Block {
    constructor(index, timestamp, data, previousHash = ''){
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        //this.hash = hash;
        this.hash = this.calculateHash();
        this.nonce = 0;
    }

    calculateHash(){
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data) +this.nonce).toString();
    }

    mineBlock(difficulty){
        while(this.hash.substring(0,difficulty) !== Array(difficulty + 2).join('0')){
            this.nonce++;
            this.hash = this.calculateHash();
        }

        console.log('Block mined: ' + this.hash)
    }
}

//proof-of-work start


//proof-of-work end

class Blockchain {
    constructor(){
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 1;
    }

    createGenesisBlock(){
        return new Block(0, '01/01/2018', 'Genesis block', '0');
    }

    getLatestBlock(){
        return this.chain[this.chain.length - 1]
    }

    addBlock(newBlock){
        newBlock.previousHash = this.getLatestBlock().hash;
        //newBlock.hash = newBlock.calculateHash();
        newBlock.mineBlock(this.difficulty);
        this.chain.push(newBlock)
    }

    isChainValid(){
        for(let i=1; i< this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i-1];

            if (currentBlock.hash !== currentBlock.calculateHash()){
                return false;
            }

            if (currentBlock.previousHash !== previousBlock.hash){
                return false;
            }
        }

        return true;
    }
}

//testing
let olegsCoin = new Blockchain();
console.log('mining block 1...');
olegsCoin.addBlock(new Block(1,'07/01/2018', {amount:4}));
console.log('mining block 3...');
olegsCoin.addBlock(new Block(2,'10/01/2018', {amount:10}));

//------> check simple blockchain start
////console.log(JSON.stringify(olegsCoin, null, 4));
//console.log('Is blockchain Valid? ->' + olegsCoin.isChainValid());
//olegsCoin.chain[1].data = {amount: 100};
//olegsCoin.chain[1].data = olegsCoin.chain[1].calculateHash();
////console.log(JSON.stringify(olegsCoin, null, 4));
//console.log('Is blockchain Valid? ->' + olegsCoin.isChainValid());
//------> check simple blockchain end

