<template>
  <div>
    <nuxt-link :to="link" class="text-link">
      {{ text }}
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </nuxt-link>
  </div>
</template>

<script>
export default {
  props: {
    link: {
      type: String,
      default: () => {
        return "";
      }
    },
    text: {
      type: String,
      default: () => {
        return "";
      }
    }
  }
};
</script>

<style scoped>
.text-link {
  text-decoration: none;
  color: black;
  font-family: "Montserrat";
  margin: 0 8px;
  position: relative;
  overflow: hidden;
  padding: 8px;
  display: block;
}

.text-link span {
  display: block;
  background: #333333;
  transition: 0.2s;
}

.text-link span:nth-child(1),
.text-link span:nth-child(3) {
  position: absolute;
  height: 2px;
  width: 100%;
}

.text-link span:nth-child(2),
.text-link span:nth-child(4) {
  position: absolute;
  height: 100%;
  width: 2px;
}

.text-link span:nth-child(1) {
  top: 0;
  left: -100%;
}

.text-link span:nth-child(2) {
  top: -100%;
  right: 0;
}

.text-link span:nth-child(3) {
  bottom: 0;
  right: -100%;
}

.text-link span:nth-child(4) {
  bottom: -100%;
  left: 0;
}

.text-link:hover span:nth-child(1) {
  top: 0;
  left: 0;
}

.text-link:hover span:nth-child(2) {
  top: 0;
  right: 0;
  transition-delay: 0.2s;
}

.text-link:hover span:nth-child(3) {
  bottom: 0;
  right: 0;
  transition-delay: 0.4s;
}

.text-link:hover span:nth-child(4) {
  bottom: 0;
  left: 0;
  transition-delay: 0.6s;
}
</style>
