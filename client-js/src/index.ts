
const baseUrl = "https://api.tuneup.cc"

type CreateParams = {
  input: string
  model: 'gpt-3.5-turbo' | 'gpt-4'
  collectionId: string
}

type AskParams = {
  question: string
  onReceiveContent: (content: string) => void
  onCompleted?: (content: string) => void
  collectionId: string
  model?: 'gpt-3.5-turbo' | 'gpt-4'
}

const createHeaders = (apiKey: string) => ({
  'api-key': apiKey,
  'Content-Type': 'application/json'
})

const sleep = async(ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export const createClient = (apiKey: string)=> {

  const create = async(params: CreateParams) => {
    const body = JSON.stringify(params)
    const response = await fetch(`${baseUrl}/v1/fragments`, {
      method: 'POST',
      headers: createHeaders(apiKey),
      body
    })
    const data = await response.json()
    return data
  }

  const read = async(uuid: string) => {
    const response = await fetch(`${baseUrl}/v1/fragments/${uuid}`, {
      headers: createHeaders(apiKey),
    })
    const data = await response.json()
    return data
  }

  const polling = async (
    fragmentId: string,
    onReceiveContent: (content: string) => void,
    onCompleted?: (content: string) => void
  ) => {
    let data = await read(fragmentId);

    while (data?.fragment?.updatingFrom) {
      await sleep(1000);
      data = await read(fragmentId);
      const output = data?.fragment?.output;
      onReceiveContent(output || '');
    }

    if (!data?.fragment?.updatingFrom) {
      const output = data?.fragment?.output || '';
      onReceiveContent(output);
      onCompleted && onCompleted(output);
    }
  };

  const ask = async({
    question,
    onReceiveContent,
    onCompleted,
    collectionId,
    model = 'gpt-3.5-turbo'
  }: AskParams) => {

    const data = await create({
      input: question,
      model,
      collectionId,
    })

    const id = data.fragment?.id
    if(!id) {
      console.log('id not found')
      return
    }

    await polling(id, onReceiveContent, onCompleted)
  }

  return {
    ask,
    fragments: {
      create,
      read,
      polling,
    },
  }
}

