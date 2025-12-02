import { defineStore } from 'pinia'
import { ref } from 'vue'
import pb from '@/lib/pb'


export const useAuthStore = defineStore('auth', () => {
  // Try to refresh an existing auth session. authRefresh() returns a Promise,
  // so handle rejections to avoid an uncaught promise error (401 when no valid token).
  pb.collection("users").authRefresh()
    .then((res) => {
      // authRefresh will update pb.authStore internally; onChange handler below will pick it up
      console.debug('auth refresh succeeded', res)
    })
    .catch((e) => {
      // common case: no valid token / unauthorized — handle quietly
      console.debug("No valid auth to refresh", e)
      try { pb.authStore.clear() } catch (_) { }
    })


  const is_logged_in = ref(pb.authStore.isValid && pb.authStore.user);
  console.debug(is_logged_in.value, pb.authStore)
  const user = ref(null);

  async function login(email, password) {
    console.debug("login called", pb.authStore.isValid)
    try {
      const authdata = await pb.collection("users").authWithPassword(email, password);
      if (authdata) {
        user.value = authdata.record;
        is_logged_in.value = true
      }
      console.debug("login called end", pb.authStore.isValid)
      return authdata
    } catch (err) {
      console.debug('login failed', err)
      throw err
    }
  }

  function logout() {
    pb.authStore.clear();
  }


  pb.authStore.onChange((token, record) => {
    console.debug("change called")
    if (pb.authStore.isValid) {
      is_logged_in.value = true;
      user.value = record;
    } else {
      is_logged_in.value = false;
      user.value = null;
    }
    pb.authStore.exportToCookie()
  })


  return { login, logout, is_logged_in, user }
})
