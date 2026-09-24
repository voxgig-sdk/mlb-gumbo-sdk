
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { MlbGumboSDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = MlbGumboSDK.test()
    equal(testsdk instanceof MlbGumboSDK, true,
      'MlbGumboSDK.test() must return a client synchronously')
  })

})
