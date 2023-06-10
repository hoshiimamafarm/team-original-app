<template>
  <div class="myprofile"></div>
  <div class="login">
    <div v-show="login_fin">This is a login page</div>
    <button v-show="login_fin" @click="on_click">Google login</button>
  </div>
</template>

<script>
import { getAuth, signInWithPopup, GoogleAuthProvider } from "../firebase";

export default {
  data() {
    return {
      login_fin: true,
    };
  },
  methods: {
    async on_click() {
      const provider = await new GoogleAuthProvider();
      const auth = await getAuth();

      await signInWithPopup(auth, provider)
        .then((result) => {
          const user = result.user;
          console.log(user);
          this.login_fin = false;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
