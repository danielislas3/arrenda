const BASE_URL = 'https://x2xofggy0j.execute-api.us-west-2.amazonaws.com'

const userServices = {

  async singup(user) {
    return await fetch(`${BASE_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })

  },

  async getContacts(userId) {
    var params = { userId: 35.696233, long: 139.570431 } // or:

    const response = await fetch(`${BASE_URL}/contacts?userId=${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',

        // 'Authorization': `Bearer ${localStorage.getItem('token')}`
      }

    })
    const data = await response.json()
    return data
  },

  async getUser(id) {
    const response = await fetch(`${BASE_URL}/contacts/${id}`)
    const data = await response.json()
    return data
  },

  async updateContact(id, payload) {
    try {
      const response = await fetch(`${BASE_URL}/contacts/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      })
      const data = await response.json()
      return data
    } catch (error) {
      console.log(error)
    }
  },

}
export { userServices }
