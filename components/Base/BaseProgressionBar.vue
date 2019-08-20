<template>
  <div class="container-bar">
    <div ref="bar" class="progress-bar"></div>
    <div class="blue green-bar" :style="widthPercentage"></div>
    <p
      v-if="percentage === 100"
      class="bar-text"
      style="width:100%;text-align:center;padding-top:16px;"
    >
      Terminé
    </p>
    <p
      v-if="percentage > 0 && percentage < 100"
      class="bar-text"
      :style="positionLeft"
    >
      <i class="material-icons">arrow_drop_up</i>
      {{ percentage | roundNumber }} %
    </p>
  </div>
</template>

<script>
import Vue from "vue";

export default {
  filters: {
    roundNumber(value) {
      return Math.floor(value);
    }
  },
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
      widthPercentage: {},
      positionLeft: {}
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
      let resultMargin = result - 40;
      let marginString = resultMargin + "px";
      Vue.set(this.widthPercentage, "width", widthString);
      if (resultMargin < 0) {
        Vue.set(this.positionLeft, "margin-left", widthString);
      } else {
        Vue.set(this.positionLeft, "margin-left", marginString);
      }
    }
  }
};
</script>

<style scoped>
.container-bar {
  position: relative;
  height: 56px;
}

.bar-text {
  text-align: center;
  padding-top: 8px;
  color: #f2d388;
  width: 75px;
  display: flex;
  flex-direction: column;
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
