let urlDetails = require("./UrlDetails");

class M3UEntry {
    set duration(duration) {
        this._duration = duration;
    }

    get duration() {
        return this._duration;
    }

    set url(url) {
        this._url = url;
    }

    get url() {
        return this._url;
    }

    get urlDetails() {
        return new urlDetails(this._url);
    }

    set title(title) {
        this._title = title;
    }

    get title() {
        return this._title;
    }

    set attrs(attrs) {
        this._attr = attrs;
    }

    get attrs() {
        return this._attr;
    }
}

module.exports = M3UEntry;