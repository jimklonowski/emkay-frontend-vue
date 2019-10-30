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
      .onPost('/auth/login')
      .reply(200, {
        user: {
          account: 'AB123',
          username: 'TEST',
          firstname: 'Foo',
          lastname: 'Bar'
        },
        isAdmin: false,
        isDark: false,
        locale: 'en',
        access_token: 'test1',
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
      // mock fuel history
      .onGet(new RegExp(`/vehicle/fuel/*`))
      .reply(200, [
        {
          date: '2019-06-19',
          odometer: '18118',
          driver: 'Andrew Griffith',
          merchant_address: 'BP PRODUCTS ITASCA, IL',
          type: 'UNL GAS',
          quantity: '22.28',
          unit_cost: '$2.998',
          amount: '$66.80'
        },
        {
          date: '2019-06-13',
          odometer: '17690',
          driver: 'Andrew Griffith',
          merchant_address: 'BP PRODUCTS ITASCA, IL',
          type: 'UNL GAS',
          quantity: '21.23',
          unit_cost: '$2.798',
          amount: '$59.41'
        },
        {
          date: '2019-06-12',
          odometer: '17541',
          driver: 'Andrew Griffith',
          merchant_address: 'BP PRODUCTS ITASCA, IL',
          type: 'WASH',
          quantity: '1',
          unit_cost: '$19.00',
          amount: '$19.00'
        },
        {
          date: '2019-05-31',
          odometer: '17281',
          driver: 'Andrew Griffith',
          merchant_address: 'BP PRODUCTS ITASCA, IL',
          type: 'UNL GAS',
          quantity: '20.85',
          unit_cost: '$3.095',
          amount: '$64.53'
        },
        {
          date: '2019-05-26',
          odometer: '16897',
          driver: 'Andrew Griffith',
          merchant_address: 'BP PRODUCTS ITASCA, IL',
          type: 'UNL GAS',
          quantity: '19.42',
          unit_cost: '$3.259',
          amount: '$72.80'
        },
        {
          date: '2019-05-24',
          odometer: '16612',
          driver: 'Andrew Griffith',
          merchant_address: 'BP PRODUCTS ITASCA, IL',
          type: 'WASH',
          quantity: '1',
          unit_cost: '$9.00',
          amount: '$9.00'
        },
        {
          date: '2019-05-21',
          odometer: '16516',
          driver: 'Andrew Griffith',
          merchant_address: 'BP PRODUCTS ITASCA, IL',
          type: 'UNL GAS',
          quantity: '18.81',
          unit_cost: '$3.099',
          amount: '$58.29'
        },
        {
          date: '2019-05-20',
          odometer: '16512',
          driver: 'Andrew Griffith',
          merchant_address: 'BP PRODUCTS ITASCA, IL',
          type: 'UNL GAS',
          quantity: '20',
          unit_cost: '$3.000',
          amount: '$60.00'
        },
        {
          date: '2019-04-20',
          odometer: '16420',
          driver: 'Andrew Griffith',
          merchant_address: 'BP PRODUCTS ITASCA, IL',
          type: 'UNL GAS',
          quantity: '14.20',
          unit_cost: '$4.200',
          amount: '$69.69'
        },
        {
          date: '2019-03-19',
          odometer: '16319',
          driver: 'Andrew Griffith',
          merchant_address: 'BP PRODUCTS ITASCA, IL',
          type: 'UNL GAS',
          quantity: '18.81',
          unit_cost: '$3.099',
          amount: '$58.29'
        },
        {
          date: '2019-02-20',
          odometer: '16220',
          driver: 'Andrew Griffith',
          merchant_address: 'BP PRODUCTS ITASCA, IL',
          type: 'UNL GAS',
          quantity: '15.20',
          unit_cost: '$4.700',
          amount: '$69.42'
        },
        {
          date: '2019-01-19',
          odometer: '16119',
          driver: 'Andrew Griffith',
          merchant_address: 'BP PRODUCTS ITASCA, IL',
          type: 'UNL GAS',
          quantity: '19.89',
          unit_cost: '$3.699',
          amount: '$60.21'
        },
        {
          date: '2019-06-19',
          odometer: '18118',
          driver: 'Andrew Griffith',
          merchant_address: 'BP PRODUCTS ITASCA, IL',
          type: 'UNL GAS',
          quantity: '22.28',
          unit_cost: '$2.998',
          amount: '$66.80'
        },
        {
          date: '2019-06-13',
          odometer: '17690',
          driver: 'Andrew Griffith',
          merchant_address: 'BP PRODUCTS ITASCA, IL',
          type: 'UNL GAS',
          quantity: '21.23',
          unit_cost: '$2.798',
          amount: '$59.41'
        },
        {
          date: '2019-05-31',
          odometer: '17281',
          driver: 'Andrew Griffith',
          merchant_address: 'BP PRODUCTS ITASCA, IL',
          type: 'UNL GAS',
          quantity: '20.85',
          unit_cost: '$3.095',
          amount: '$64.53'
        },
        {
          date: '2019-05-26',
          odometer: '16897',
          driver: 'Andrew Griffith',
          merchant_address: 'BP PRODUCTS ITASCA, IL',
          type: 'UNL GAS',
          quantity: '19.42',
          unit_cost: '$3.259',
          amount: '$72.80'
        },
        {
          date: '2019-05-24',
          odometer: '16612',
          driver: 'Andrew Griffith',
          merchant_address: 'BP PRODUCTS ITASCA, IL',
          type: 'WASH',
          quantity: '1',
          unit_cost: '$9.00',
          amount: '$9.00'
        },
        {
          date: '2019-05-21',
          odometer: '16516',
          driver: 'Andrew Griffith',
          merchant_address: 'BP PRODUCTS ITASCA, IL',
          type: 'UNL GAS',
          quantity: '18.81',
          unit_cost: '$3.099',
          amount: '$58.29'
        },
        {
          date: '2019-05-20',
          odometer: '16512',
          driver: 'Andrew Griffith',
          merchant_address: 'BP PRODUCTS ITASCA, IL',
          type: 'UNL GAS',
          quantity: '20',
          unit_cost: '$3.000',
          amount: '$60.00'
        },
        {
          date: '2019-04-20',
          odometer: '16420',
          driver: 'Andrew Griffith',
          merchant_address: 'BP PRODUCTS ITASCA, IL',
          type: 'UNL GAS',
          quantity: '14.20',
          unit_cost: '$4.200',
          amount: '$69.69'
        },
        {
          date: '2019-03-19',
          odometer: '16319',
          driver: 'Andrew Griffith',
          merchant_address: 'BP PRODUCTS ITASCA, IL',
          type: 'UNL GAS',
          quantity: '18.81',
          unit_cost: '$3.099',
          amount: '$58.29'
        },
        {
          date: '2019-02-20',
          odometer: '16220',
          driver: 'Andrew Griffith',
          merchant_address: 'BP PRODUCTS ITASCA, IL',
          type: 'UNL GAS',
          quantity: '15.20',
          unit_cost: '$4.700',
          amount: '$69.42'
        },
        {
          date: '2019-01-19',
          odometer: '16119',
          driver: 'Andrew Griffith',
          merchant_address: 'BP PRODUCTS ITASCA, IL',
          type: 'UNL GAS',
          quantity: '19.89',
          unit_cost: '$3.699',
          amount: '$60.21'
        },
        {
          date: '2019-06-19',
          odometer: '18118',
          driver: 'Andrew Griffith',
          merchant_address: 'BP PRODUCTS ITASCA, IL',
          type: 'UNL GAS',
          quantity: '22.28',
          unit_cost: '$2.998',
          amount: '$66.80'
        },
        {
          date: '2019-06-13',
          odometer: '17690',
          driver: 'Andrew Griffith',
          merchant_address: 'BP PRODUCTS ITASCA, IL',
          type: 'UNL GAS',
          quantity: '21.23',
          unit_cost: '$2.798',
          amount: '$59.41'
        },
        {
          date: '2019-05-31',
          odometer: '17281',
          driver: 'Andrew Griffith',
          merchant_address: 'BP PRODUCTS ITASCA, IL',
          type: 'UNL GAS',
          quantity: '20.85',
          unit_cost: '$3.095',
          amount: '$64.53'
        },
        {
          date: '2019-05-26',
          odometer: '16897',
          driver: 'Andrew Griffith',
          merchant_address: 'BP PRODUCTS ITASCA, IL',
          type: 'UNL GAS',
          quantity: '19.42',
          unit_cost: '$3.259',
          amount: '$72.80'
        },
        {
          date: '2019-05-24',
          odometer: '16612',
          driver: 'Andrew Griffith',
          merchant_address: 'BP PRODUCTS ITASCA, IL',
          type: 'WASH',
          quantity: '1',
          unit_cost: '$9.00',
          amount: '$9.00'
        },
        {
          date: '2019-05-21',
          odometer: '16516',
          driver: 'Andrew Griffith',
          merchant_address: 'BP PRODUCTS ITASCA, IL',
          type: 'UNL GAS',
          quantity: '18.81',
          unit_cost: '$3.099',
          amount: '$58.29'
        },
        {
          date: '2019-05-20',
          odometer: '16512',
          driver: 'Andrew Griffith',
          merchant_address: 'BP PRODUCTS ITASCA, IL',
          type: 'UNL GAS',
          quantity: '20',
          unit_cost: '$3.000',
          amount: '$60.00'
        },
        {
          date: '2019-04-20',
          odometer: '16420',
          driver: 'Andrew Griffith',
          merchant_address: 'BP PRODUCTS ITASCA, IL',
          type: 'UNL GAS',
          quantity: '14.20',
          unit_cost: '$4.200',
          amount: '$69.69'
        },
        {
          date: '2019-03-19',
          odometer: '16319',
          driver: 'Andrew Griffith',
          merchant_address: 'BP PRODUCTS ITASCA, IL',
          type: 'UNL GAS',
          quantity: '18.81',
          unit_cost: '$3.099',
          amount: '$58.29'
        },
        {
          date: '2019-02-20',
          odometer: '16220',
          driver: 'Andrew Griffith',
          merchant_address: 'BP PRODUCTS ITASCA, IL',
          type: 'UNL GAS',
          quantity: '15.20',
          unit_cost: '$4.700',
          amount: '$69.42'
        },
        {
          date: '2019-01-19',
          odometer: '16119',
          driver: 'Andrew Griffith',
          merchant_address: 'BP PRODUCTS ITASCA, IL',
          type: 'UNL GAS',
          quantity: '19.89',
          unit_cost: '$3.699',
          amount: '$60.21'
        }
      ])
      // mock maintenance history
      .onGet(new RegExp(`/vehicle/maintenance/*`))
      .reply(200, [
        {
          date: '2019-08-20',
          odometer: '12345',
          vendor: 'EMKAY Motors',
          in_network: true,
          service: 'Wash & Detail (Fee)',
          amount: '$24.00'
        },
        {
          date: '2019-06-13',
          odometer: '11323',
          vendor: 'EMKAY Motors',
          in_network: false,
          service: 'Wash & Detail (Fee)',
          amount: '$19.00'
        },
        {
          date: '2019-04-01',
          odometer: '10901',
          vendor: 'EMKAY Motors',
          in_network: true,
          service: 'Wash & Detail (Fee)',
          amount: '$750.00'
        }
      ])
      // mock invoice history
      .onGet(new RegExp(`/vehicle/invoice/*`))
      .reply(200, [
        {
          date: '2019-10-02',
          description: 'FMS Billing',
          invoice: 'BF7716',
          amount: '$234.56'
        },
        {
          date: '2019-09-01',
          description: 'FMS Billing',
          invoice: 'BF7717',
          amount: '$678.90'
        },
        {
          date: '2019-08-01',
          description: 'FMS Billing',
          invoice: 'BF7718',
          amount: '$123.45'
        }
      ])
      // mock licensing history
      .onGet(new RegExp(`/vehicle/licensing/*`))
      .reply(200, [
        {
          expiration_date: '2018-06-07',
          plate: 'ABCDEF',
          status: 'ON BILLING',
          needs: false
        },
        {
          expiration_date: '2017-06-07',
          plate: 'ABCDEF',
          status: 'ON BILLING',
          needs: false
        },
        {
          expiration_date: '2016-06-07',
          plate: 'ABCDEF',
          status: 'ON ORDER',
          needs: true
        }
      ])
      // mock accident history
      .onGet(new RegExp(`/vehicle/accidents/*`))
      .reply(200, [
        {
          loss_date: '2019-01-02',
          claim_number: '123456A',
          claim_type: 'TOTALED',
          claim_amount: '$12,345.67',
          subrogated_amount: '$420.69'
        }
      ])
      // mock rental history
      .onGet(new RegExp(`/vehicle/rentals/*`))
      .reply(200, [
        {
          date: '2019-06-12',
          reason: 'GLASS',
          voucher: '2E17WK',
          rate: '$60.98',
          days: '7',
          total: '$426.85'
        },
        {
          date: '2019-05-19',
          reason: 'DEAD BODY',
          voucher: 'D34DB3EF',
          rate: '$69.96',
          days: '6',
          total: '$420.69'
        }
      ])
      // mock toll history
      .onGet(new RegExp(`/vehicle/tolls/*`))
      .reply(200, [
        {
          date: '2019-09-17',
          description: 'Toll Event 455668694: Illinois Tollway Army Trail Rd',
          amount: '$0.95'
        },
        {
          date: '2019-09-16',
          description: 'Toll Event 455668694: Illinois Tollway Eola Rd',
          amount: '$0.55'
        },
        {
          date: '2019-09-15',
          description: 'Toll Event 455668694: Illinois Tollway Farnsworth Rd',
          amount: '$0.55'
        },
        {
          date: '2019-09-15',
          description: 'Toll Event 455668694: Illinois Tollway Army Trail Rd',
          amount: '$0.95'
        },
        {
          date: '2019-09-12',
          description:
            'Toll Event 455668694: Illinois Tollway Boughton Rd (Main)',
          amount: '$0.95'
        }
      ])
      // mock violation history
      .onGet(new RegExp(`/vehicle/violations/*`))
      .reply(200, [
        {
          date: '2018-08-14',
          violation: '9193647098',
          reason: 'PARKING',
          paid_date: '2018-10-05',
          location: 'IL',
          amount: '$50.00'
        },
        {
          date: '2018-07-05',
          violation: '0069564060',
          reason: 'MOVING',
          paid_date: '2018-08-27',
          location: 'IL',
          amount: '$60.00'
        },
        {
          date: '2018-05-10',
          violation: '0069564061',
          reason: 'PARKING',
          paid_date: '2018-06-25',
          location: 'IL',
          amount: '$75.00'
        },
        {
          date: '2018-05-10',
          violation: '0069457033',
          reason: 'PARKING',
          paid_date: '2018-06-25',
          location: 'IL',
          amount: '$75.00'
        }
      ])
      // mock odometer history
      .onGet(new RegExp(`/vehicle/odometer/*`))
      .reply(200, [
        {
          date: '2019-09-24',
          odometer: '43300',
          type: 'FUEL'
        },
        {
          date: '2019-09-18',
          odometer: '42900',
          type: 'FUEL'
        },
        {
          date: '2019-09-16',
          odometer: '42600',
          type: 'FUEL'
        },
        {
          date: '2019-09-12',
          odometer: '42200',
          type: 'FUEL'
        },
        {
          date: '2019-07-06',
          odometer: '40600',
          type: 'MAINT'
        }
      ])
      // mock driver history
      .onGet(new RegExp(`/vehicle/drivers/*`))
      .reply(200, [
        {
          date: '2016-09-15',
          effective_date: '2016-09-15',
          driver_reference_number: '210696',
          driver: 'KLONOWSKI, JAMES'
        }
      ])
      // mock vehicle notes
      .onGet(new RegExp(`/vehicle/notes/*`))
      .reply(200, [
        {
          date: '2019-10-04',
          subject: 'Wash your car',
          note: 'It is an eyesore',
          user: 'JCK'
        },
        {
          date: '2019-09-11',
          subject: 'Strange Smell',
          note:
            'Did something die in/around your vehicle?  The smell is ghastly...',
          user: 'JCK'
        }
      ])
      // mock vehicle documents
      .onGet(new RegExp(`/vehicle/documents/*`))
      .reply(200, [
        {
          type: 'Registration',
          date: '2019-09-09',
          download: 'path/to/item.pdf'
        },
        {
          type: 'Renewal Requirement',
          date: '2019-02-17',
          download: 'path/to/item2.pdf'
        },
        {
          type: 'POA-VIN Specific',
          date: '2019-02-26',
          download: 'path/to/item3.pdf'
        }
      ])
      // mock zip code requests
      .onGet(new RegExp(`/postalcode/60143`))
      .reply(200, {
        county: 'DuPage',
        city: 'Itasca',
        state_province: 'IL'
      })
      // mock order status
      .onGet(new RegExp(`/order-status/*`))
      .reply(200, {
        driver: 'Klonowski, James',
        vehicle_number: '123456',
        vehicle_description: '2020 Tesla Model X',
        factory_order_number: 'FO123',
        serial_number: 'S123',
        ship_to_dealer_info: 'This will be shipped to some dealer at some time...',
        priority_code: 'PRIOX',
        comments: 'asdf',
        timeline: {
          emkay_ordered_date: '2019-01-01',
          emkay_received_date: '2019-01-02',
          zone_received_date: '2019-01-03',
          dealer_ordered_date: '2019-01-04',
          sent_to_plant: '2019-01-05',
          ship_to_dealer: '2019-01-06',
          production_scheduled: '2019-01-07',
          build_date: '2019-01-08',
          shipped_to_body_co: '2019-01-09',
          at_body_co: '2019-01-10',
          shipped_from_body_co: '2019-01-11',
          back_at_manufacturer: '2019-01-12',
          shipped_to_dealer: '2019-01-13',
          release_to_convoy: '2019-01-14',
          delivery_to_dealer: '2019-01-15',
          delivery_date: '2019-01-16',
        }
      })
      // mock transport status
      .onGet(new RegExp(`/transtor/status/*`))
      .reply(200, [
        {
          order_date: '2019-10-25',
          order_number: '123',
          pickup_location: 'Denver, CO',
          delivery_location: 'Reno, NV'
        }
      ])
      // mock transport quote
      .onPost('/transtor/quote')
      .reply(config => {
        let data = JSON.parse(config.data)
        let quote = {
          vehicle_description: '2019 Jeep Compass',
          transport_method: data.transport_method,
          pickup_postal_code: data.origin_postal_code,
          delivery_postal_code: data.destination_postal_code,
          estimated_distance: '1500 mi',
          estimated_cost: '$1965.97'
        }
        return [200, quote]
      })
      // .reply(200, {
      //   vehicle_description: '2019 Jeep Compass',
      //   transport_method: 'driven',
      //   pickup_postal_code: '60189',
      //   delivery_postal_code: '60143',
      //   estimated_distance: '1500 mi',
      //   estimated_cost: '$1965.97'
      // })
      // mock transtor vehicle summary 
      .onGet(new RegExp(`/vehicle/summary/*`))
      .reply(function(config) {
        let vehicle_number = config.url.split('/').pop() || 'ERR'
        
        let vehicle_summary = {
          vehicle_number,
          client_vehicle_number: 'CVE22444',
          vin: 'THISISALONGVINNUMBER',
          vehicle_description: '2019 JEEP Compass',
          vehicle_color: 'Black',
          plate: 'VANITYPL8',
          plate_state_province: 'IL',
          driver: 'James Klonowski',
          center: '001'
        }
        return [200, {vehicle_summary}]
      })
      // mock /test/post
      .onPost('/test/post')
      .reply(400, { error: 'error occurred' })
      // passthrough all other requests
      .onAny()
      .passThrough()
  }
}

export default MockService