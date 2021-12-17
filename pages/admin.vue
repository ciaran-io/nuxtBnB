<script>
import Cookie from 'js-cookie'
export default {
asyncData({$config, redirect}){
  if(!Cookie.get($config.auth.cookieName)){
    redirect('/deny-access/')
    return
  }
}
}

</script>

export default {

}

<template>
  <div>
    admin
    <NuxtChild/>
  </div>
</template>