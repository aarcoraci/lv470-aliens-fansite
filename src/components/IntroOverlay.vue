<script setup></script>

<template>
  <div class="intro-overlay">
    <div class="intro container">
      <div class="wy-logo"></div>
      <h2>Welcome to LV&#8209;470</h2>
      <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iusto iste cumque ratione officiis nostrum reprehenderit temporibus cupiditate cum hic eaque, fugit sit odio natus nobis impedit obcaecati, atque modi deleniti.</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.intro-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: $padding;

  .wy-logo {
    width: 100px;
    height: 30px;
    margin: 0 auto;
    background-image: url("~@/assets/img/wy-logo-variant.svg");
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
  }
  .intro {
    border-radius: $border-radius;
    padding: 30px;
    background-color: $color-blue;
    color: $color-white;
    box-shadow: 0px 10px 20px -5px rgba(darken($color-blue, 4), 1);
    transition-duration: 270ms;
    transition-property: border-color, background-color;
    transition-timing-function: ease-in-out;
    text-align: center;
    @include font-general;

    @include respond-to("large") {
      padding: 90px;
    }

    h2 {
      margin-bottom: 18px;
      @include respond-to("large") {
        margin-bottom: 28px;
      }
    }

    &:hover {
      background-color: lighten($color-blue, 0.75);
    }
  }
}
</style>