const { v4 } = require("uuid");
const AWS = require('aws-sdk');
const TABLE_NAME = 'userTable';
const buildResponse = require("../helpers/http.js");
const { getUser } = require('./user.js')

const addContact = async (event, context, callback) => {

  const { contact, userId } = JSON.parse(event.body)
  const { name, email, phone, addressLines, img } = contact;
  const newContact = {
    id: v4(),
    name,
    email,
    phone,
    img,
    addressLines,
    createdAt: Date.now(),
  }
  //TODO: tarer usuario , acceder al arreglo de contactos y agregar el nuevo contacto
  const user = await getUser(userId)
  console.log("user", user)
  const contacts = [...user.contacts]
  contacts.push(newContact);
  console.log("user.contacts", contacts)
  const params = {
    TableName: TABLE_NAME,
    Key: {
      id: userId,
    },
    ExpressionAttributeNames: {
      "#contacts": "contacts",
    },
    ExpressionAttributeValues: {
      ":contacts": contacts,
    },
    UpdateExpression: "SET #contacts = :contacts",
    ReturnValues: "ALL_NEW",

  }
  const dynamodb = new AWS.DynamoDB.DocumentClient();
  const resp = await dynamodb.update(params, (error, result) => {
    if (error) {
      console.error(error);
      buildResponse(500, { message: 'Could not update contact', error: error })
      return;
    }
    buildResponse(200, { data: result })
  }).promise();
  console.log("resp", resp)
  // const dynamoDb = new AWS.DynamoDB.DocumentClient();
  // // const user = await getUser(userId);


  // const params = {
  //   TableName: TABLE_NAME,
  //   Item: newContact,
  // };

  // return await dynamoDb.put(params).promise().then(() => {
  //   const body = {
  //     Operation: 'SAVE',
  //     Message: 'SUCCESS',
  //     contact: params.Item
  //   }
  //   return buildResponse(200, body);
  // }, (error) => {
  //   console.error('error ', error);
  //   return buildResponse(500, { message: 'Could not create contact', error: error });
  // })

}
const getContact = async (event) => {
  const userId = event.queryStringParameters.userId;
  // const dynamodb = new AWS.DynamoDB.DocumentClient();
  const { id } = event.pathParameters;
  if (!userId) {
    return buildResponse(400, { message: 'Missing userId' });
  }
  const user = await getUser(userId)

  console.log('user:', user);
  // const params = {
  //   TableName: TABLE_NAME,
  //   Key: {
  //     id
  //   }
  // }
  try {
    // const result = await dynamodb.get(params).promise();
    // if (!result.Item) {
    //   console.log("error:", error)
    //   return buildResponse(404, { message: 'Contact not found' });
    // }
    const contact = user.contacts.find(contact => contact.id === id)
    if (!contact) {
      return buildResponse(404, { message: 'Contact not found' });
    }
    return buildResponse(200, { data: contact });
  } catch (error) {
    console.log("error:", error)
    return buildResponse(404, { message: 'Contact Not Found', error: error });
  }

}
const getAllContacts = async (event) => {
  const userId = event.queryStringParameters.userId;
  try {

    const user = await getUser(userId)
    let contactsAlphabetical = [...user.contacts].sort((a, b) => a.name < b.name ? -1 : 1);
    return buildResponse(200, { length: contactsAlphabetical.length, data: contactsAlphabetical });

  } catch (error) {
    console.log("error:", error)
    return buildResponse(404, { message: 'Contacts Not Found', error: error });
  }



  // const dynamodb = new AWS.DynamoDB.DocumentClient();
  // try {
  //   const result = await dynamodb.scan({ TableName: TABLE_NAME }).promise();
  //   console.log("result:", result)
  //   if (result.Items) {
  //     let contactsAlphabetical = [...result.Items].sort((a, b) => a.name < b.name ? -1 : 1);

  //     console.log("resultSorted:", result)

  //     return buildResponse(200, { length: contactsAlphabetical.length, data: contactsAlphabetical });
  //   } else {
  //     return buildResponse(404, { message: 'Contacts not found' });

  //   }
  // } catch (error) {
  //   console.log("error:", error)
  //   return buildResponse(404, { message: 'Could not get contacts', error: error });
  // }

}
const updateContact = (event, context, callback) => {
  const data = JSON.parse(event.body);
  const params = {
    TableName: TABLE_NAME,
    Key: {
      id: event.pathParameters.id,
    },
    ExpressionAttributeNames: {
      "#name": "name",
      "#email": "email",
      "#phone": "phone",
      "#addressLines": "addressLines",
      "#img": "img",
    },
    ExpressionAttributeValues: {
      ":name": data.name,
      ":email": data.email,
      ":phone": data.phone,
      ":addressLines": data.addressLines,
      ":img": data.img,
    },
    UpdateExpression:
      "SET #name = :name, #email = :email, #phone = :phone, #addressLines = :addressLines, #img = :img",
    ReturnValues: "ALL_NEW",
  };
  const dynamodb = new AWS.DynamoDB.DocumentClient();
  dynamodb.update(params, (error, result) => {
    if (error) {
      console.error(error);
      callback(null, buildResponse(500, { message: 'Could not update contact', error: error }));
      return;
    }
    callback(null, buildResponse(200, { data: result.Attributes }));
  });
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
    return buildResponse(404, { message: 'Could not delete contact', error: error });
  }
}


module.exports = {
  addContact,
  getContact,
  getAllContacts,
  updateContact,
  deleteContact
}
