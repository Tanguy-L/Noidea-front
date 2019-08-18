<template>
  <div class="container-bar">
    <div ref="bar" class="progress-bar"></div>
    <div class="blue green-bar" :style="widthPercentage"></div>
  </div>
</template>

<script>
import Vue from "vue";

export default {
  props: {
    total: {
      type: Number,
      default: () => {
        return 0;
      }
    },
    value: {
      type: Number,
      default: () => {
        return 0;
      }
    }
  },
  data() {
    return {
      isMounted: false,
      widthPercentage: {}
    };
  },
  computed: {
    percentage() {
      let result = (100 * this.value) / this.total;
      return result;
    }
  },
  watch: {
    total: function() {
      this.matchHeight(); // or this.openPopup(newVal) is this suits
    },
    value: function() {
      this.matchHeight(); // or this.openPopup(newVal) is this suits
    }
  },
  mounted() {
    this.matchHeight();
  },
  methods: {
    matchHeight() {
      const result = (this.$refs.bar.clientWidth * this.percentage) / 100;
      let widthString = result + "px";
      Vue.set(this.widthPercentage, "width", widthString);
    }
  }
};
</script>

<style scoped>
.container-bar {
  position: relative;
}

.progress-bar {
  width: 100%;
  z-index: 5;
  background-color: rgb(151, 151, 151);
  height: 8px;
  position: absolute;
  top: 0;
  left: 0;
}

.green-bar {
  z-index: 15;
  height: 8px;
  position: absolute;
  top: 0;
  left: 0;
}
</style>
