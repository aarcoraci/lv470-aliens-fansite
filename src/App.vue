 

<template>
  <header>
    <nav>
      <ul>
        <li>
          <router-link :to="{ name: 'Home' }">Home</router-link>
          <router-link :to="{ name: 'About' }">About</router-link>
        </li>
        <li></li>
      </ul>
    </nav>
  </header>
  <main>
    <router-view />
  </main>
</template>

<style lang="scss">
@import "./assets/scss/main.scss";
</style>

<style lang="scss" scoped>
header {
  background-color: white;
  opacity: 0.5;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
