const HTTP_STATUS_UNAUTHORIZED = 401
const HTTP_STATUS_NOT_DEV_MODE = 406

class DevModeException extends Error {
    constructor(message, apiPath, httpCode = HTTP_STATUS_NOT_DEV_MODE) {
        super(message)
        this.status = httpCode
        this.apiPath = apiPath
    }
}

class UnAuthorized extends Error {
    constructor(message, apiPath = 'viewSession', httpCode = HTTP_STATUS_UNAUTHORIZED) {
        super(message)
        this.status = httpCode
        this.apiPath = apiPath
    }
}

module.exports = {
    DevModeException,
    UnAuthorized,
}
