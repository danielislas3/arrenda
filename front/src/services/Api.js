const BASE_URL = 'https://x2xofggy0j.execute-api.us-west-2.amazonaws.com'

const userServices = {

  async getContacts() {
    const response = await fetch(`${BASE_URL}/contacts`)
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
