<template>
  <div>
    <label :for="nameProps | toKebabCase">{{ labelProps }}</label>
    <input v-model="dataModel" type="text" :name="nameProps | toKebabCase" />
  </div>
</template>

<script>
export default {
  filters: {
    toKebabCase: function(value) {
      return value
        .replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, "$1-$2")
        .toLowerCase();
    }
  },
  props: {
    nameProps: {
      type: String,
      default: () => {
        return "";
      }
    },
    labelProps: {
      type: String,
      default: () => {
        return "";
      }
    },
    dataModel: {
      type: String,
      default: () => {
        return "";
      }
    }
  }
};
</script>

<style></style>
