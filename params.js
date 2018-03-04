const params = {
    server: {
        host: '0.0.0.0',
        port: 3004,
        get url(){ return 'http://' + this.host + ':' + this.port }
    },
    test: {
        host: '0.0.0.0',
        port: 4242,
        get url(){ return 'http://' + this.host + ':' + this.port }
    }
}

module.exports = params

