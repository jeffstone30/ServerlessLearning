'use strict';

const databaseManager = require('./databaseManager');

module.exports.hello = async event => {
    var message = "Hello World";

    const qstringName = event.queryStringParameters && event.queryStringParameters.name;

    if (qstringName !== null) {
        message = "Hello "

        var savedName = await databaseManager.saveItem(qstringName);

        if (savedName && savedName != "") {
            message += savedName + " - Your name was saved in our DB.";
        }
    }

    return {
        statusCode: 200,
        body: JSON.stringify(
        {
            message: message
        },
        null,
        2
        ),
    };
};

module.exports.wasGreeted = async event => {
    var message = "NO";
    const qstringName = event.queryStringParameters && event.queryStringParameters.name;
    
    if (qstringName !== "") {
        // Get Item from Database
        var savedName = await databaseManager.getItem(qstringName);

        if (savedName && savedName.firstName != "") {
            message = "YES, " + savedName.firstName + ". You are in our system already.";
        }
    }

    return {
        statusCode: 200,
        body: JSON.stringify(
            {
                message: message
            },
            null,
            2
        ),
    };
};