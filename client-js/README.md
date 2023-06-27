# @tuneup/client-js

The Tuneup client library provides convenient access to the Tuneup API.

See [API Documentaion](http://doc.tuneup.cc) for more access.

## Installation

```
npm install @tuneup/client-js
# or
yarn add @tuneup/client-js
```

## Usage

The library must be configured with your API key, which is available in the [Tuneup Developer Menu](https://tuneup.cc/developers). Be sure to set domain restriction if you are using it in a browser.

Example Usage. It should work with react, vue, etc.

```javascript
import { createClient } from '@tuneup/client-js'

const apiKey = 'xxxxxxxxx'
const tuneup = createClient(apiKey)
// the collection you want to use as data source.
const collectionId = 'collection-uuid'

const TuneupInput = () => {

  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState('')

  const submit = async () => {
    if(!question) return

    await tuneup.ask({
      question,
      // it will be fired every 1000ms (default) with the latest content.
      onReceiveContent: (latest) => setAnsert(latest),
      onCompleted: (last)=> {
        // maybe set only once
      },
      collectionId,
    })
  }

  return (
    <>
      <TextInput
        label='Ask AI'
        value={question}
        onChangeText={setQuestion}
        onSubmitEditing={submit}
      />
      <Text>{answer}</Text>
    </>
  )

}
```

Currently we only have `client.ask`, `client.fragments.create`, `client.fragments.read`, `client.fragments.polling`,

## Support

If you need more options, functionality or have a question, please visit the github repository and submit an issue.
