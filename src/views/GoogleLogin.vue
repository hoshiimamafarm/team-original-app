<template>
  <div class="login">
    <div>This is a login page</div>
    <button @click="on_click">Google login</button>
  </div>
</template>

<script>
import { getAuth, signInWithPopup, GoogleAuthProvider } from "../firebase";

export default {
  methods: {
    async on_click() {
      const provider = await new GoogleAuthProvider();
      const auth = await getAuth();

      await signInWithPopup(auth, provider)
        .then((result) => {
          const user = result.user;
          console.log(user);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
