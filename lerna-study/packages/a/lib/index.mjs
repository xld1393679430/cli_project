'use strict';

console.log("哈哈哈")

function log(str) {
    console.log(str || "log::Hello from A")
    return "Hello from A";
}

export default log;
