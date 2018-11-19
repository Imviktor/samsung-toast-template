class UrlDetails {

    constructor(url) {
        if (url) {
            let regexp = /(\w*):\/\/(.*)(\/.*)/;
            let a = regexp.exec(url);
            this._uri = a[0];
            this._protocol = a[1];
            this._host = a[2];
            this._path = a[3];
        }
    }

    get uri() {
        return this._uri;
    }

    get protocol() {
        return this._protocol;
    }

    get host(){
        return this._host;
    }

    get path(){
        return this._path;
    }
}

module.exports = UrlDetails;