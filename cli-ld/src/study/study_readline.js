const readline = require('readline')

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
})

rl.question("Your name: ", (q) => {
	console.log(q);

	rl.close();
})