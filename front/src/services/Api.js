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

  async login(user) {
    return await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
  },


  async getContacts(userId) {

    const response = await fetch(`${BASE_URL}/contacts?userId=${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',


        // 'Authorization': `Bearer ${localStorage.getItem('token')}`
      }

    })
    const data = await response.json()
    return data
  },

  async getUser(id, userId = "fc8b4ed1-22b0-4bfc-a905-053641391fa6") {
    console.log('userrrrr', userId);
    const response = await fetch(`${BASE_URL}/contacts/${id}?userId=${userId}`)
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
