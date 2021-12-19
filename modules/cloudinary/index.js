import { createHash } from 'crypto'

export default function (){
  const config = this.options.privateRuntimeConfig.cloudinary

  this.nuxt.hook('render:setupMiddleware', (app) =>{
    app.use('/api/cloudinary/signature', setSignature)
  })

   function setSignature(req,res){
    try{
      const sha256 =createHash('sha256')
      const payload = []

      Object.keys(req.body).forEach(key => {
        payload.push(`${key}=${req.body[key]}`)
      })

      sha256.update(payload.sort().join('&') + config.apiSecret)
      res.end(JSON.stringify({
        signature: sha256.digest('hex')
      }))
    }
    catch(error){
      console.error(error);
    }
  }
}