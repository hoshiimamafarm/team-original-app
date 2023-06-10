<template>
  <div class="page">
    <div>{{ username }}</div>
    <img v-bind:src="userphoto" />
  </div>
</template>

<script>
import { getAuth, signInWithPopup, GoogleAuthProvider } from "../firebase";
export default {
  data() {
    return {
      userphoto: "",
      username: "",
      login_fin: true,
    };
  },
  mounted() {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        console.log(user);
        this.userphoto = user.photoURL;
        this.username = user.displayName;
        this.login_fin = false;
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
</script>
