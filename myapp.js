const my = require('./myFirstModule');
const mymod = require('./myModule');

function printMyName(){
    console.log('Ravinath');
}

// printMyName();
// my.printMyName();

mymod.greetUser('Kumara');

//let sum = mymod.getSum(5 , 8);
console.log(mymod.getSum(5 , 8));