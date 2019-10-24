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
      .onGet(new RegExp(`/driver-details/*`))
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
      // mock vehicle-details
      .onGet(new RegExp(`/vehicle-details/*`))
      .reply(200, {
        // Account Information
        account: 'EM102',
        billing_sort: 'JCKBILLING',
        center: '0x1',
        center_description: 'Information Technology',
        // Vehicle Information
        year: '2020',
        make: 'TESLA',
        model: 'Model X P100D',
        vin: 'K45286378154321EL',
        vehicle_number: '123456',
        client_vehicle_number: 'D34DB33F',
        // Customization
        client_use_label_1: 'Department',
        client_use_1: 'I.T.',
        client_use_label_2: 'Project',
        client_use_2: 'Web Rewrite',
        client_use_label_3: 'Division',
        client_use_3: 'JavaScript',
        client_use_label_4: 'Group',
        client_use_4: 'Lead',
        client_use_label_5: 'Client Use Label 5',
        client_use_5: 'Custom 5'
      })
      // mock custom labels populate
      .onGet('/custom-labels')
      .reply(200, {
        client_use_label_1: 'Department',
        client_use_label_2: 'Project',
        client_use_label_3: 'Division',
        client_use_label_4: 'Group',
        client_use_label_5: 'Client Use Label 5',
        driver_use_label_1: 'Department',
        driver_use_label_2: 'Team',
        driver_use_label_3: 'Office',
        driver_use_label_4: 'Parking'
      })
      .onAny()
      .passThrough()
  }
}

export default MockService