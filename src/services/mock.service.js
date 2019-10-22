import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'

let mock = new MockAdapter(axios, { delayResponse: 500 })

const MockService = {
  init() {
    mock
      .onPost('/auth/login', { user: { account: 'EM102', username: 'JCK', password: '123' }})
      .reply(200, {
        user: {
          account: 'EM102',
          username: 'JCK',
        },
        isAdmin: false,
        isDark: true,
        locale: 'en',
        access_token: '12345A',
        refresh_token: 'refresh_token'
      })
      .onPost('/auth/login', { user: { account: 'CA704', username: 'JCK', password: '123' }})
      .reply(200, {
        user: {
          account: 'CA704',
          username: 'JCK'
        },
        isAdmin: false,
        isDark: true,
        locale: 'fr',
        access_token: '12345C',
        refresh_token: 'refresh_token'
      })
      
      .onAny()
      .passThrough()
  }
}

export default MockService