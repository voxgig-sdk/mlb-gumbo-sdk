
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { MlbGumboSDK } from '..'


describe('exists', async () => {

  test('test-mode', async () => {
    const testsdk = await MlbGumboSDK.test()
    equal(null !== testsdk, true)
  })

})
