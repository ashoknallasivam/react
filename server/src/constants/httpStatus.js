module.exports = {
    SUCCESS_WITH_RESPONSE: {
        "code": 200,
        "status": "SUCCESS",
        "messages": "Success with response body."
    },
    SUCCESS_CREATED_WITH_RESPONSE: {
        "code": 201,
        "status": "CREATED",
        "messages": "Success with response body."
    },
    SUCCESS_WITH_NO_RESPONSE: {
        "code": 204,
        "status": "SUCCESS",
        "messages": "Success with no response body."
    },
    BAD_REQUEST: {
        "code": 400,
        "status": "BAD_REQUEST",
        "messages": "The request URI does not match the APIs in the system, or the operation failed for unknown reasons. Invalid headers can also cause this error."
    },
    UNAUTHORIZED: {
        "code": 401,
        "status": "UNAUTHORIZED",
        "messages": "The user is not authorized to use the API."
    },
    FORBIDDEN: {
        "code": 403,
        "status": "FORBIDDEN",
        "messages": "The requested operation is not permitted for the user. This error can also be caused by ACL failures, or business rule or data policy constraints."
    },
    NOT_FOUND: {
        "code": 404,
        "status": "NOT_FOUND",
        "messages": "The requested resource was not found. This can be caused by an ACL constraint or if the resource does not exist."
    },
    METHOD_NOT_ALLOWED: {
        "code": 405,
        "status": "METHOD_NOT_ALLOWED",
        "messages": "The HTTP action is not allowed for the requested REST API, or it is not supported by any API."
    },
    NOT_ACCEPTABLE: {
        "code": 406,
        "status": "NOT_ACCEPTABLE",
        "messages": "The endpoint does not support the response format specified in the request Accept header."
    },
    DUPLICATE_ENTRY: {
        "code": 409,
        "status": "CONFLICT",
        "messages": "The request could not be completed due to a conflict with the current state of the resource."
    },
    MEDIA_TYPE_NOTSUPPORTED: {
        "code": 415,
        "status": "UNSUPPORTED_MEDIA_TYPE",
        "messages": "The endpoint does not support the format of the request body."
    },
    INVALID_INPUT: {
        "code": 422,
        "status": "UNPROCESSABLE_ENTITY",
        "messages": ""
    },
    SERVER_ERROR: {
        "code": 500,
        "status": "INTERNAL_SERVER_ERROR",
        "messages": "Server cannot process the request for an unknown reason."
    },
    BAD_GATEWAY: {
        "code": 502,
        "status": "BAD_GATEWAY",
        "messages": "Server is a gateway or proxy server, and it is not receiving a valid response from the backend servers that should actually fulfill the request."
    },
    SERVICE_UNAVAILABLE: {
        "code": 503,
        "status": "SERVICE_UNAVAILABLE",
        "messages": "Server is overloaded or under maintenance. This error implies that the service should become available at some point."
    },
    INVALID_REQUEST_TYPE: {
        "code": 904,
        "status": "INVALID_REQUEST_TYPE",
        "messages": "Please provide valid tatvam request type."
    }
}