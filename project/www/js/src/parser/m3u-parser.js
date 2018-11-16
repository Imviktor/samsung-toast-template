const Log = require("../logging/logging");
const log = new Log("m3u-parser").Logger();
const fs = require("fs");
const util = require("util");
const readFileAsync = util.promisify(fs.readFile);
const parser = require("m3u-parser");


async function parseM3UFile(filename) {
    log.info("Reading content of file " + filename)
    let data = await readFileAsync(filename, "utf-8");
    data = data.split("\n").filter(s => s.length > 0);

    if (data.shift().trim() !== '#EXTM3U')
        throw new Error('The file does not contains a valid M3U playlist');

    let line;

    while(line = data.shift()){
        line = line.trim();

    }

    return data;
}

parseM3UFile("extended.m3u").then(log.info);

