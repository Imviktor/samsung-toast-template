"use strict";
const Log = require("../logging/logging");
const log = new Log("m3u-parser").Logger();
const fs = require("fs");
const http = require("http");
const https = require("https");
const axios = require('axios');
const m3u8Parser = require("m3u8-parser");
const M3UEntry = require("./M3UEntry");
const util = require("util");
const Hls = require("hls.js");
const readFileAsync = util.promisify(fs.readFile);

function parseM3UFile(filename) {
    log.info("Reading content of file " + filename);
    let data = readFileAsync(filename, "utf-8");
    data = data.split("#EXTINF:");

    let entries = [];

    let header = data.shift().trim();
    // if (header !== "#EXTM3U") {
    //     throw new InvalidArgumentException("Input file is not a M3U file");
    // }

    data.forEach(entry => {
        entry = entry.replace(/\n/g, '');
        let regExp = /(-?1)\s(.*),(.*)(http.*)/;
        let a = regExp.exec(entry);
        if (a) {
            let regexpAttr = /([a-zA-Z-]+)="([^"]*)"/g;
            let attr = {};
            a[2].replace(regexpAttr, ($0, key, value) => {
                attr[key] = value;
            });
            let m3uEntry = new M3UEntry();
            m3uEntry.duration = a[1];
            m3uEntry.attrs = attr;
            m3uEntry.title = a[3];
            m3uEntry.url = a[4];
            entries.push(m3uEntry);
        }
    });

    return entries;
}

function parseM3U8(urlDetails) {
    // if (!urlDetails) {
    //     throw new InvalidArgumentException("URL is not defined");
    // }
    log.info("Getting m3u8 file from url '" + urlDetails + "'");
    axios.get(urlDetails.uri).then((res) => {
        log.info('Status: ', res.status);
        if (res.status === 200) {
            let data = res.data;
            log.info(data);
            let parser = new m3u8Parser.Parser();
            parser.push(data);
            parser.end();
        }
    }).catch(log.error);
}

function stream(video) {
    parseM3UFile("extended.m3u").then(data => data.forEach(entry => {
        var hls = new Hls();
        hls.loadSource(entry.urlDetails);
        hls.attachMedia(video);
        hls.on(Hls.Events.MANIFEST_PARSED,function() {
            video.play();
        });
    }));
}

module.exports = stream;

