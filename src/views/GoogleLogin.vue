<template>
  <div class="myprofile"></div>
  <div class="login">
    <div v-show="canLogin">This is a login page</div>
    <button v-show="canLogin" @click="onClick">Google login</button>
  </div>
</template>

<script>
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  setPersistence,
  browserSessionPersistence,
} from "../firebase";

export default {
  data() {
    return {
      canLogin: true,
    };
  },
  methods: {
    async onClick() {
      const auth = await getAuth();
      setPersistence(auth, browserSessionPersistence)
        .then(() => {
          const provider = new GoogleAuthProvider();
          signInWithPopup(auth, provider)
            .then((result) => {
              const user = result.user;
              console.log(user);
              this.canLogin = false;
            })
            .catch((error) => {
              console.log(error);
            });
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
