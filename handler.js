'use strict';

module.exports.hello = async event => {
    var message = "Hello World";
    const name = event.queryStringParameters && event.queryStringParameters.name;
    if (name !== null) {
        message = "Hello " + name
    }
    return {
        statusCode: 200,
        body: JSON.stringify(
        {
            message: message,
            input: event,
        },
        null,
        2
        ),
    };
};