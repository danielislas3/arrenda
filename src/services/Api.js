const BASE_URL = 'http://localhost:3000/contacts'

const userServices = {

  async getContacts() {
    const response = await fetch(BASE_URL)
    const data = await response.json()
    return data
  },

  async getUser(id) {
    const response = await fetch(`${BASE_URL}/${id}`)
    const data = await response.json()
    return data
  }

}
export { userServices }
