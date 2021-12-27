import getApis from './apis';
import stripeLib from 'stripe'
import { rejectHitBadRequest } from '../helpers'

export default function(){
  const algoliaConfig = this.options.privateRuntimeConfig.algolia
  const apis = getApis(algoliaConfig)
  const secretKey = this.options.privateRuntimeConfig.secretKey
  const stripe =stripeLib(secretKey)
  
  this.nuxt.hook('render:setupMiddleware', (app) => {
    app.use('/api/stripe/create-session', createSession)
  })

  async function createSession(req, res){
    const body = req.body
    if(!body || !body.home.Id || !body.start || !body.end || !body.start >= body.end){
      return rejectHitBadRequest(res)
    }
  }

}