import ApiBase from './apiBase'

class UserApi extends ApiBase {
  getAll = () => {
    const url = `${this.baseUrl}/users/`
    return this.call(url)
  }

  create = user => {
    const url = `${this.baseUrl}/users`
    return this.call(url, {
      method: 'POST',
      body: JSON.stringify(user)
    })
  }

  delete = id => {
    const url = `${this.baseUrl}/users/${id}`
    return this.call(url, {
      method: 'DELETE',
    })
  }

  update = user => {
    const url = `${this.baseUrl}/users`
    return this.call(url, {
      method: 'PUT',
      body: JSON.stringify(user)
    })
  }
}

export default new UserApi()