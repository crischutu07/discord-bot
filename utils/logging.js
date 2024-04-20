const chalk = require('chalk')
class Logging {
	label;
	#formattedTime;
	constructor(label) {
		if (!label) this.label = "Main"
		else this.label = label;
	}
	setLabel(label){
		if (!label) this.label = "Main"
		else this.label = label;
	}
	#timer(){
	const date = new Date()
	const hrs = date.getHours().toString().padStart(2, "0");
	const min = date.getMinutes().toString().padStart(2, "0");
	const sec = date.getSeconds().toString().padStart(2, "0");
	const ms = date.getMilliseconds().toString().padStart(3, "0");

	this.#formattedTime = `${(hrs)}:${min}:${sec}.${ms}`;
	}
	info(msg){
		if (!msg) msg = ""
		this.#timer()
		console.log(`[${this.#formattedTime}] [${this.label}/${chalk.cyan("INFO")}]: ${msg}`)
	}
	notice(msg){
		if (!msg) msg = ""
		this.#timer()
		console.log(`[${this.#formattedTime}] [${this.label}/${chalk.yellow("NOTICE")}]: ${msg}`)
	}
	warn(msg){
		if (!msg) msg = ""
		this.#timer()
		console.warn(`[${this.#formattedTime}] [${this.label}/${chalk.yellowBright("WARN")}]: ${msg}`)
	}
	error(msg){
		if (!msg) msg = ""
		this.#timer()
		console.error(`[${this.#formattedTime}] [${this.label}/${chalk.red("ERROR")}]: ${msg}`)
	}
	debug(msg){
		if (!msg) msg = ""
		this.#timer()
		console.debug(`[${this.#formattedTime}] [${this.label}/${chalk.blue("DEBUG")}]: ${msg}`)
	}
}

module.exports = Logging;