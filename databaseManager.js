'use strict';

const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient();

const TABLE_NAME = process.env.ITEMS_DYNAMODB_TABLE;

module.exports.saveItem = personName => {
    console.log("Hi there " + personName + ". I am the saveItem method.");
    console.log(TABLE_NAME);

    const params = {
        TableName: TABLE_NAME,
        Item: {
            firstName: personName,
        },
    };
    console.log(params);

    return dynamoDB.put(params).promise().then(() => {
        console.log("I am done saving...." + personName);
        return personName;
    });
};

module.exports.getItem = personName => {
    const params = {
        TableName: TABLE_NAME,
        Key: {
            firstName: personName
        }
    };

    return dynamoDB.get(params).promise().then(result => {
        return result.Item;
    });
};