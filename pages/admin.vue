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


<template>
  <div>
    admin
    <div class="bg-slate-200">
      <NuxtLink to="/admin/homes/">Homes</NuxtLink>
    </div>
    <NuxtChild/>
  </div>
</template>