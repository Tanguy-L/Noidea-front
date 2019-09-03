<template>
  <div>
    <button class="blue center-block button">
      <span> {{ textButton }}</span>
    </button>
  </div>
</template>

<script>
export default {
  props: {
    textButton: {
      type: String,
      default: () => {
        return "";
      }
    }
  }
};
</script>

<style>
.button {
  position: relative;
  z-index: 1;
}

.button:before {
  background-color: rgb(22, 47, 70);
  content: "";
  width: 0%;
  height: 100%;
  top: 0;
  left: 0;
  position: absolute;
  transition: 0.2s ease-in-out;
  z-index: -1;
  border-bottom: 1px solid white;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.315);
}

.button:hover:before {
  width: 100%;
}
</style>
