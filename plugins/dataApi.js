export default function (context, inject) {
  const appId = '20TT3H3J0T'
  const apiKey = 'a2ab745a479ac514dd5769f72997579d'
  const headers = {
    'X-Algolia-API-Key': apiKey,
    'X-Algolia-Application-Id': appId,
  }

  inject('dataApi', {
    getHome,
    getReviewsByHomeId,
    getUserByHomeId,
    getHomesByLocation,
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

  async function getReviewsByHomeId(homeId) {
    try {
      return unWrap(
        await fetch(
          `https://${appId}-dsn.algolia.net/1/indexes/reviews/query`,
          {
            headers,
            method: 'POST',
            body: JSON.stringify({
              filters: `homeId:${homeId}`,
              hitsPerPage: 6,
              attributesToHighlight: [],
            }),
          }
        )
      )
    } catch (error) {
      return getErrorResponse(error)
    }
  }

  async function getUserByHomeId(homeId) {
    try {
      return unWrap(
        await fetch(`https://${appId}-dsn.algolia.net/1/indexes/users/query`, {
          headers,
          method: 'POST',
          body: JSON.stringify({
            filters: `homeId:${homeId}`,
            attributesToHighlight: [],
          }),
        })
      )
    } catch (error) {
      return getErrorResponse(error)
    }
  }

  async function getHomesByLocation(Lat, Lng, radiusInMeters = 1500) {
    try {
      return unWrap(
        await fetch(`https://${appId}-dsn.algolia.net/1/indexes/homes/query`, {
          headers,
          method: 'POST',
          body: JSON.stringify({
            aroundRadius: radiusInMeters,
            aroundLatLng: `${Lat}, ${Lng}`,
            hitsPerPage: 10,
            attributesToHighlight: [],
          }),
        })
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
