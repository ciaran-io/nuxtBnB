import fetch from 'node-fetch'
import { getHeaders } from '../helpers'
import { unWrap, getErrorResponse } from '../../../utils/fetchUtils'

export default (algoliaConfig)=> {
const headers = getHeaders(algoliaConfig)
  return {
    delete: async (homeId, payload)=>{
      try {
        return unWrap(
          await fetch(`https://${algoliaConfig.appId}-dsn.algolia.net/1/indexes/homes/${homeId}`, {
            headers,
            method: 'DELETE',
          }))
      } catch (error) {
        return getErrorResponse(error)
      }
    },

    create: async (homeId, payload)=>{
      try {
        // add timestamps to availablity in date picker
        const availablity = []
        payload.availabilityRanges.forEach(range => {
          const start = new Date(range.start).getTime() / 1000
          const end = new Date(range.end).getTime() / 1000
          // increment by 1 day, seconds in day
          for(var day = start; day <= end; day += 86400){
            availablity.push(day)
          }
        });

        delete payload.availabilityRanges
        payload.availablity = availablity

        return unWrap(
          await fetch(`https://${algoliaConfig.appId}-dsn.algolia.net/1/indexes/homes/${homeId}`, {
            headers,
            method: 'PUT',
            body: JSON.stringify(payload),
          }))
      } catch (error) {
        return getErrorResponse(error)
      }
    },

    getByUserId: async (userId) => {
      try {
        return unWrap(
          await fetch(`https://${algoliaConfig.appId}-dsn.algolia.net/1/indexes/homes/query`, {
            headers,
            method: 'POST',
            body: JSON.stringify({
              filters: `userId:${userId}`,
              attributesToRetrieve: [
                'objectID',
                'title'
              ],
              attributesToHighlight:[]
            }),
          }))
      } catch (error) {
        return getErrorResponse(error)
      }
    },
    
  }
}