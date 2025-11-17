import { defineStore } from 'pinia'
import { ref } from 'vue'
import pb from '@/lib/pb'


export const useAuthStore = defineStore('auth', () => {
  try {
    pb.collection("users").authRefresh()
  }
  catch (e) {
    console.debug("No valid auth to refresh", e)
  }


  const is_logged_in = ref(pb.authStore.isValid && pb.authStore.user);
  console.debug(is_logged_in.value, pb.authStore)
  const user = ref(null);

  async function login(email, password) {
    console.debug("login called", pb.authStore.isValid)
    const authdata = await pb.collection("users").authWithPassword(email, password);
    if (authdata) {
      user.value = authdata.record;
      is_logged_in.value = true
    }
    console.debug("login called end", pb.authStore.isValid)
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
