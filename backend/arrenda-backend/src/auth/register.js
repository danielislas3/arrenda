const AWS = require('aws-sdk');
const bcrypt = require('bcryptjs');
const buildResponse = require("../helpers/http.js");
const { v4 } = require("uuid");
const { getUser } = require('../functions/user.js');

const dynamodb = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = 'userTable';

async function register(event) {
  const { email, password, name, phone } = JSON.parse(event.body);

  if (!phone || !email || !password, !name) {
    return buildResponse(401, {
      message: 'All fields are required'
    })
  }

  const dynamoUser = await getUser(email.toLowerCase().trim());
  if (dynamoUser && dynamoUser.email) {
    return buildResponse(401, {
      message: 'email already registered'
    })
  }

  const encryptedPassword = bcrypt.hashSync(password.trim(), 10);

  const user = {
    id: v4(),
    email,
    name,
    password: encryptedPassword,
    phone,
    img: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
    addressLines: ['', ''],
    contacts: [],
    createdAt: Date.now(),

  }

  const saveUserResponse = await saveUser(user);

  if (!saveUserResponse) {
    return buildResponse(503, { message: 'Server Error. Please try again later.' });
  }

  return buildResponse(200, { user: saveUserResponse });
}



async function saveUser(user) {
  const params = {
    TableName: TABLE_NAME,
    Item: user
  }
  return await dynamodb.put(params).promise().then(() => {
    return true;
  }, error => {
    console.error('There is an error saving user: ', error)
  });
}

module.exports = {
  register
}