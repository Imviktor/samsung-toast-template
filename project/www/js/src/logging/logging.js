'use strict';
const {createLogger, format, transports} = require('winston');
const levelLength = 6;
const classNameLenght = 30;
let classname;
let logger;

/**
 *
 * @param str original string
 * @param length required length
 * @param dir align direction {values: ltr - default | rtl}
 * @returns {string}
 */
let strFormat = (str, length, dir) => {
    let strDisplay = str;
    if (length > String(str).length) {
        if (dir === "rtl") {
            strDisplay = Array(length - String(str).length + 1).join(' ') + str;
        } else {
            strDisplay = str + Array(length - String(str).length + 1).join(' ');
        }
    }
    return strDisplay.substring(0, length);
};

/**
 * Custom log formatter that enforces vertically-aligned log entry components.
 *
 * @param options - See winston/common.log() for available properties.
 */
const logFormatter = format((info, opts) => {
    info.level = strFormat(info.level, levelLength, "rtl");
    return info;
});

function Logger(className) {
    this.classname = strFormat(className, classNameLenght);
    this.logger = createLogger({
        level: 'debug',
        format: format.combine(
            logFormatter(),
            format.colorize(),
            format.timestamp({
                format: 'YYYY-MM-DD HH:mm:ss.SSS'
            }),
            format.printf(info => `${info.timestamp} ${info.level} ${this.classname}: ${info.message}`)
        ),
        transports: [new transports.Console()],
        handleExceptions: true
    });
}

Logger.prototype.Logger = function () {
    return this.logger;
};

module.exports = Logger;