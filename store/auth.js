export const state = () =>({
  isLoggedIn: !true,
  user: {}
})

export const mutations = {
  user(state,user){
    state.isLoggedIn = !!user
    state.user = user || {}
  }
}