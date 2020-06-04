let memory = require('./memory');

const PI = 3.1417;

function getAreaOfCircle(radius) {
    memory.value += 1;
    return radius * radius * PI;

}

function addTwoNumbers(n1, n2) {
    memory.value += 1;
    return n1+n2;
}

// explictly state whatever we are exporting out
module.exports = {
    getAreaOfCircle, addTwoNumbers,
    calculatePerimeter:function(length, wdith) {
        return length*2 + width*2
    }
}