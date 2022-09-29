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
    if (response.Item) {
      return buildResponse(200, { data: response.Item });
    } else {
      return buildResponse(404, { message: 'Contact not found' });
    }
  }, (error) => {
    return buildResponse(404, { message: 'Contact Not Found', error: error })
  });
}
const getAllContacts = async (event) => {
  const dynamodb = new AWS.DynamoDB.DocumentClient();
  try {
    const result = await dynamodb.scan({ TableName: TABLE_NAME }).promise();
    if (result.Items) {

      return buildResponse(200, { length: result.Items.lengt, data: result.Items });
    } else {
      return buildResponse(404, { message: 'Contacts not found' });

    }
  } catch (error) {
    return buildResponse(404, { message: 'Could not get contacts', error: error });
  }

}
const updateContact = async (event) => {
  const dynamodb = new AWS.DynamoDB.DocumentClient();
  const { id } = event.pathParameters;
  const { name, email, phone, addressLines, img } = JSON.parse(event.body);

  // try {
  //   dynamodb.update({
  //     TableName: TABLE_NAME,
  //     Key: { id },
  //     ConditionExpression: 'attribute_exists(id)',
  //     UpdateExpression: 'set name = :name, email = :email, phone = :phone, addressLines = :addressLines, img = :img',

  //     ExpressionAttributeValues: {
  //       ':name': name,
  //       ':email': email,
  //       ':phone': phone,
  //       ':addressLines': addressLines,
  //       ':img': img
  //     },
  //     ReturnValues: 'ALL_NEW'
  //   }, (error, result) => {
  //     if (error) {
  //       return buildResponse(500, { message: 'Could not update contact', error: error });
  //     }
  //     return buildResponse(200, { message: 'Contact updated', data: result.Attributes });
  //   });
  // } catch (error) {
  //   return buildResponse(500, { message: 'Could not update contact', error: error });
  // }
  try {
    const result = await dynamodb.update({
      TableName: TABLE_NAME,
      Key: { id },
      UpdateExpression: 'set name = :contactName, email = :email, phone = :phone, addressLines = :addressLines, img = :imagen',
      ExpressionAttributeNames: {
        ':phone': phone,
        ':email': email,
        ':addressLines': addressLines,
        ':imagen': imagen,
        ':contactName': name
      },
      ReturnValues: "ALL_NEW"
    }).promise();
    result.then((response) => {
      return buildResponse(200, { message: 'Contact updated', data: response.Attributes });
    }, (error) => {
      return buildResponse(500, { message: 'Could not update contact', error: error });
    });

    return buildResponse(200, { message: 'Contact updated', contact: result });

  } catch (error) {
    return buildResponse(500, { message: 'Could not update contact', error: error });
  }

}
const deleteContact = async (event) => {
  const dynamodb = new AWS.DynamoDB.DocumentClient();
  const { id } = event.pathParameters;
  try {
    const result = await dynamodb.delete({
      TableName: TABLE_NAME,
      Key: { id }
    }).promise();
    return buildResponse(200, { message: 'Contact deleted', contact: result });
  } catch (error) {
    return buildResponse(500, { message: 'Could not delete contact', error: error });
  }
}
function buildResponse(statusCode, body) {
  return {
    statusCode: statusCode,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    },
    body: JSON.stringify(body)
  }
}

module.exports = {
  addContact,
  getContact,
  getAllContacts,
  updateContact,
  deleteContact
}