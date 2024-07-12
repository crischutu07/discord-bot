const chalk = require('chalk')
class Logging {
  constructor({ verbose, label }) {
    this.verbose = verbose ?? false;
    this.label = label ?? "Main";
  }
  setLabel(label) {
    this.label = label ?? "Main";
  }
  /**
   * @param level
   * @param msg
   */
  #getFormat(level, msg) {
    msg = msg ?? ""
    const date = new Date()
    const hrs = date.getHours().toString().padStart(2, "0");
    const min = date.getMinutes().toString().padStart(2, "0");
    const sec = date.getSeconds().toString().padStart(2, "0");
    const ms = date.getMilliseconds().toString().padStart(3, "0");
    switch (Number(level)) {
      default:
	return NaN;
      case 0:
	level = chalk.blueBright("INFO")
	break;
      case 1:
	level = chalk.yellow("NOTICE")
	break;
      case 2:
	level = chalk.yellowBright("WARN")
	break;
      case 3:
	level = chalk.red("ERROR")
	break;
      case 4:
	level = chalk.cyanBright("DEBUG")
	break;
    }

    return `[${hrs}:${min}:${sec}.${ms} ${level}] [${this.label}]: ${msg}`
  }
  /*
   * @param {string} msg
   */
  info(msg) {
    const _ = this.#getFormat(0, msg)
    console.log(_)
  }
  /*
   * @param {string} msg
   */
  notice(msg) {
    const _ = this.#getFormat(1, msg)
    console.info(_)
  }
  /*
   * @param {string} msg
   */
  warn(msg) {
    const _ = this.#getFormat(2, msg)
    console.warn(_)
  }
  /*
   * @param {string} msg
   */
  error(msg) {
    const _ = this.#getFormat(3, msg)
    console.error(_)
  }
  /*
   * @param {string} msg
   */
  debug(msg) {
    const _ = this.#getFormat(4, msg)
    if (this.verbose) console.debug(_)
  }
}

module.exports = Logging;
