const AWS = require('aws-sdk');

const dynamodb = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = 'userTable';

async function getUser(id) {
  const params = {
    TableName: TABLE_NAME,
    Key: {
      id: id
    }
  }

  return await dynamodb.get(params).promise().then(response => {
    return response.Item;
  }, error => {
    console.error('There is an error getting user: ', error);
  })
}

module.exports = {
  getUser
}