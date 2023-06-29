<template>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link
    href="https://fonts.googleapis.com/css2?family=Inter:wght@900&family=Rampart+One&display=swap"
    rel="stylesheet"
  />
  <Header>
    <div class="Head">
      <nav>
        <h2>JobHunt</h2>
        <div class="head">
          <router-link to="/" class="link">Home</router-link>
          <router-link to="/postselfpr" class="link">postselfpr</router-link>
          <router-link to="/todolist" class="link">todolist</router-link>
          <router-link to="/mypage" class="link">My Page</router-link>
        </div>
      </nav>
    </div>
  </Header>
</template>
<style scoped>
body {
  font-family: "Inter", sans-serif;
  background-color: gray;
  margin-top: 0;
}

nav {
  z-index: 2;
  text-align: end;
  position: fixed;
  width: 100%;
  height: 8%;
  display: flex;
  top: 0;
  margin-bottom: 100px;
  left: 0;
  background-color: rgb(125, 127, 128);
}
nav h2 {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-left: 2%;
  color: rgb(37, 37, 37);
}

.head {
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
