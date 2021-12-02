export default (context, inject) => {
  const appId = '20TT3H3J0T'
  const apiKey = 'a2ab745a479ac514dd5769f72997579d'

  inject('dataApi', {
    getHome,
  })

  async function getHome(homeId) {
    const repsonse = await fetch(
      `https://${appId}-dsn.algolia.net/1/indexes/homes/${homeId}`,
      {
        headers: {
          'X-Algolia-API-Key': apiKey,
          'X-Algolia-Application-Id': appId,
        },
      }
    )
    const json = await repsonse.json()
    return json
  }
}
