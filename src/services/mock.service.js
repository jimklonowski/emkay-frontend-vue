import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'

let mock = new MockAdapter(axios, { delayResponse: 500 })

const MockService = {
  init() {
    mock
      .onPost('/auth/login')
      .reply(200, {
        user: {
          account: 'EM102',
          username: 'JCK',
        },
        isAdmin: false,
        isDark: false,
        locale: 'en',
        access_token: '12345A',
        refresh_token: 'refresh_token'
      })
  }
}

export default MockService