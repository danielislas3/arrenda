const { v4 } = require("uuid");
const AWS = require('aws-sdk');
const middy = require("@middy/core");
const httpJSONBodyParser = require("@middy/http-json-body-parser");

const addContact = async (event) => {
  // const data = JSON.parse(event.body);
  const { name, email, phone, addresLines, img } = event.body;
  const newContact = {
    id: v4(),
    name,
    email,
    phone,
    img,
    addresLines,
    createdAt: Date.now(),
  }
  const dynamoDb = new AWS.DynamoDB.DocumentClient();
  const params = {
    TableName: 'contactTable',
    Item: newContact,
  };
  return await dynamoDb.put(params).promise().then(() => {
    const body = {
      Operation: 'SAVE',
      Message: 'SUCCESS',
      Item: params.Item
    }
    return buildResponse(200, body);
  }, (error) => {
    console.error('error ', error);
    return buildResponse(500, { message: 'Could not create contact', error: error });
  })
  // try {
  //   await dynamoDb.put(params).promise().then(
  //     (response) => {
  //       return {
  //         body: JSON.stringify(newTask),
  //         response
  //       };
  //     },
  //     (error) => {
  //       console.log("Error saving user", error);
  //     }
  //   );

  //   return {
  //     statusCode: 200,
  //     body: JSON.stringify(newTask),
  //   };
  //   // return {
  //   //   statusCode: 200,
  //   //   body: JSON.stringify(params.contact),
  //   // };
  //   // if (error) {
  //   //   console.error(error);
  //   //   callback(null, {
  //   //     statusCode: error.statusCode || 501,
  //   //     headers: { 'Content-Type': 'Application/json' },
  //   //     body: 'Couldn\'t create the todo item.',
  //   //   });
  //   //   return;
  //   // }

  //   // dynamoDb.put(params, (error) => {
  //   //   // handle potential errors
  //   //   if (error) {
  //   //     console.error(error);
  //   //     callback(null, {
  //   //       statusCode: error.statusCode || 501,
  //   //       headers: { 'Content-Type': 'text/plain' },
  //   //       body: 'Couldn\'t create the todo item.',
  //   //     });
  //   //     return;
  //   //   }

  //   //   // create a response
  //   //   const response = {
  //   //     statusCode: 200,
  //   //     body: JSON.stringify(params.contact),
  //   //   };
  //   //   callback(null, response);
  //   // });
  // } catch (error) {
  //   return {
  //     statusCode: 500,
  //     body: JSON.stringify(error),
  //   };
  // }
}
const getContact = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: "Go Serverless v3.0! Your function executed successfully!",
        input: event,
      },
      null,
      2
    ),
  };
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
  getContact
}