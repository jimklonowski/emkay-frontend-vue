import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'

let mock = new MockAdapter(axios, { delayResponse: 500 })

const MockService = {
  init() {
    mock
      // mock login - dark, admin, en
      .onPost('/auth/login', { user: { account: 'EM102', username: 'JCK', password: '123' }})
      .reply(200, {
        user: {
          account: 'EM102',
          username: 'JCK',
          firstname: 'James',
          lastname: 'Klonowski'
        },
        isAdmin: true,
        isDark: true,
        locale: 'en',
        access_token: '12345A',
        refresh_token: 'refresh_token'
      })
      // mock login - dark, fr
      .onPost('/auth/login', { user: { account: 'CA704', username: 'JCK', password: '123' }})
      .reply(200, {
        user: {
          account: 'CA704',
          username: 'JCK',
          firstname: 'Jimmy',
          lastname: 'Klonowski',
        },
        isAdmin: false,
        isDark: true,
        locale: 'fr',
        access_token: '12345C',
        refresh_token: 'refresh_token'
      })
      // mock driver-details
      .onGet('/driver-details/')
      .reply(200, {
        // Model - driver info
        last_name: 'KLONOWSKI',
        first_name: 'JAMES',
        employee_id: '123456789',
        license_state: 'IL',
        license_number: 'ABCDEF12309876QWERTY',
        selector_level: 'I.T.',
        // Model - contact info
        address_1: 'EMKAY, Inc',
        address_2: '805 W THORNDALE AVE',
        postal_code: '60143',
        city: 'ITASCA',
        state_province: 'IL',
        county: 'DUPAGE',
        email: 'JKLONOWSKI@email.com',
        phone: '630-864-0000',
        cell: '630-864-0999',
        // Model - customization
        driver_use_label_1: 'Department',
        driver_use_1: 'Sales',
        driver_use_label_2: 'Team',
        driver_use_2: 'Senior Sales',
        driver_use_label_3: 'Office',
        driver_use_3: 'Bermuda Office',
        driver_use_label_4: 'Parking',
        driver_use_4: 'Parking Spot #3A'
      })
      .onAny()
      .passThrough()
  }
}

export default MockService