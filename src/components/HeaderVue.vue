<template>
  <Header>
    <h2>JobHunt</h2>
    <div class="headContent">
      <router-link to="/" class="link">Home</router-link>
      <router-link to="/postselfpr" class="link">postselfpr</router-link>
      <router-link to="/todolist" class="link">todolist</router-link>
      <router-link to="/mypage" class="link">My Page</router-link>
    </div>
  </Header>
</template>

<style scoped>
Header {
  position: sticky;
  top: 0;
  width: 100%;
  height: 10vh;
  display: flex;
  background-color: rgb(125, 127, 128);
}

Header h2 {
  display: flex;
  align-items: center;
  margin-left: 2%;
  color: rgb(37, 37, 37);
}

.headContent {
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.link {
  color: #ffffffa5;
  margin-right: 3%;
}
</style>
