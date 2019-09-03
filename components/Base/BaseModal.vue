<template>
  <div class="background-modal">
    <div class="modal">
      <h4 class="margin-height-24">{{ titleModal }}</h4>
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    titleModal: {
      type: String,
      default: () => {
        return "test";
      }
    }
  }
};
</script>

<style scoped>
.background-modal {
  background: rgba(0, 0, 0, 0.322);
  position: absolute;
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  overflow: hidden;
  z-index: 5;
}

.modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 50%;
  background-color: white;
  box-shadow: 0 3px 12px black;
  z-index: 20;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 12px;
}

input,
p,
label {
  color: black;
}

.modal-container {
  width: 70%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  font-family: "Montserrat", sans-serif;
}
</style>
