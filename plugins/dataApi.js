export default function (context, inject) {
  const appId = '20TT3H3J0T'
  const apiKey = 'a2ab745a479ac514dd5769f72997579d'
  const headers = {
    'X-Algolia-API-Key': apiKey,
    'X-Algolia-Application-Id': appId,
  }

  inject('dataApi', {
    getHome,
  })

  async function getHome(homeId) {
    try {
      return unWrap(
        await fetch(
          `https://${appId}-dsn.algolia.net/1/indexes/homes/${homeId}`,
          { headers }
        )
      )
    } catch (error) {
      return getErrorResponse(error)
    }
  }

  async function unWrap(response) {
    const json = await response.json()
    const { ok, status, statusText } = response
    return {
      json,
      ok,
      status,
      statusText,
    }
  }

  function getErrorResponse(error) {
    return {
      ok: !true,
      status: 500,
      statusText: error.message,
      json: {},
    }
  }
}
