export default (context, inject) => {
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
      return getErrorRepsonse(error)
    }
  }

  async function unwrap(repsonse) {
    const json = await repsonse.json()
    const { ok, status, statusText } = repsonse
    return {
      json,
      ok,
      status,
      statusText,
    }
  }

  function getErrorRepsonse(error) {
    return {
      ok: !true,
      status: 500,
      statusText: error.message,
      json: {},
    }
  }
}
