const AWS = require('aws-sdk');
const buildResponse = require("../helpers/http.js");
// const { getUser } = require('../functions/user.js');
const auth = require('./auth');
const TABLE_NAME = 'userTable';

const bcrypt = require('bcryptjs');

const dynamodb = new AWS.DynamoDB.DocumentClient();

const login = async (event) => {
  const { email, password } = JSON.parse(event.body);
  if (!email || !password) {
    return buildResponse(401, {
      message: 'username and password are required'
    })
  }
  const dynamoUser = await getUser(email.toLowerCase().trim());
  console.log('User', dynamoUser);

  if (!dynamoUser || !dynamoUser.email) {
    return buildResponse(403, { message: 'user does not exist' });
  }

  if (!bcrypt.compareSync(password, dynamoUser.password)) {
    return buildResponse(403, { message: 'password is incorrect' });
  }

  const userInfo = {
    email: dynamoUser.email,
    name: dynamoUser.name
  }
  const token = auth.generateToken(userInfo)
  const response = {
    user: userInfo,
    token: token
  }
  return buildResponse(200, response);
}

async function getUser(email) {
  const params = {
    TableName: TABLE_NAME,
    Key: {
      email: email
    }
  }

  return await dynamodb.get(params).promise().then(response => {
    return response.Item;
  }, error => {
    console.error('There is an error getting user: ', error);
  })
}
module.exports = {
  login
}