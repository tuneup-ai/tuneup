import { createClient } from '@/index'
import fetchMock from 'jest-fetch-mock'
fetchMock.enableMocks()

describe('createClient', () => {

  it('should return an object with create, read, polling and ask methods', () => {
    const client = createClient('apiKey')
    expect(client).toHaveProperty('ask')
    const fragments = client.fragments
    expect(fragments).toHaveProperty('create')
    expect(fragments).toHaveProperty('read')
    expect(fragments).toHaveProperty('polling')
  })

  describe('ask', () => {
    it('should call create with the correct params', async () => {
      const client = createClient('apiKey')

      const onReceiveContent = jest.fn()
      const onCompleted = jest.fn()
      const collectionId = 'collection-uuid'

      // create
      fetchMock.mockResponseOnce(
        JSON.stringify({ fragment: { id: 'fragment-uuid', updatingFrom: Date.now() } })
      )

      // read by polling (continues)
      fetchMock.mockResponseOnce(
        JSON.stringify({ fragment: { id: 'fragment-uuid', updatingFrom: Date.now(), output: 'output' } })
      )
      // read by polling (finished)
      fetchMock.mockResponseOnce(
        JSON.stringify({
          fragment: { id: 'fragment-uuid', updatingFrom: null, output: 'output finished' }
        })
      )

      await client.ask({
        question: 'question',
        onReceiveContent,
        onCompleted,
        collectionId,
      })

      expect(onReceiveContent).toHaveBeenCalledTimes(2)
      expect(onCompleted).toHaveBeenCalledWith('output finished')
    })
  })

})
