const { v4 } = require("uuid");
const AWS = require('aws-sdk');

const TABLE_NAME = 'contactTable';
const addContact = async (event) => {
  // const data = ;
  const { name, email, phone, addressLines, img } = JSON.parse(event.body)
  const newContact = {
    id: v4(),
    name,
    email,
    phone,
    img,
    addressLines,
    createdAt: Date.now(),
  }
  const dynamoDb = new AWS.DynamoDB.DocumentClient();
  const params = {
    TableName: TABLE_NAME,
    Item: newContact,
  };
  return await dynamoDb.put(params).promise().then(() => {
    const body = {
      Operation: 'SAVE',
      Message: 'SUCCESS',
      contact: params.Item
    }
    return buildResponse(200, body);
  }, (error) => {
    console.error('error ', error);
    return buildResponse(500, { message: 'Could not create contact', error: error });
  })

}
const getContact = async (event) => {
  const dynamodb = new AWS.DynamoDB.DocumentClient();

  const { id } = event.pathParameters;

  const params = {
    TableName: TABLE_NAME,
    Key: {
      id
    }
  }
  return await dynamodb.get(params).promise().then((response) => {
    return buildResponse(200, response.Item);

  }, (error) => {
    return buildResponse(404, { message: 'Contact Not Found', error: error })
  });
}
const getAllContacts = async (event) => {
  const dynamodb = new AWS.DynamoDB.DocumentClient();
  const result = await dynamodb.scan({ TableName: TABLE_NAME }).promise();
  return buildResponse(200, result.Items);

}
function buildResponse(statusCode, body) {
  return {
    statusCode: statusCode,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  }
}
module.exports = {
  addContact,
  getContact,
  getAllContacts
}