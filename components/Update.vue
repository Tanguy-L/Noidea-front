<template>
  <div class="column-update">
    <h3>{{ update.name }}</h3>
    <p class="text-full-width">{{ update.date | formatDate }}</p>
    <p class="text-full-width">{{ update.versionProject }}</p>
    <Category
      v-for="(el, index) in tasksByCategories"
      :key="index"
      :category="el"
      :id-update="update._id"
    />
    <ModalCategory
      v-if="showModalCategory"
      :id-update="update._id"
      @closeModal="showModalCategory = false"
    />
    <button
      class="add-category text-big-button"
      @click="showModalCategory = true"
    >
      Ajouter une catégorie
    </button>
  </div>
</template>

<script>
import Category from "@/components/CategoryCard.vue";
import ModalCategory from "@/components/ModalCategory.vue";

export default {
  components: {
    Category,
    ModalCategory
  },
  filters: {
    formatDate: function(value) {
      if (!value) return "";
      let currentDate = new Date(value);
      let monthNames = [
        "Janvier",
        "Février",
        "Mars",
        "Avril",
        "Mai",
        "Juin",
        "Juillet",
        "Août",
        "Septembre",
        "Octobre",
        "Novembre",
        "Décembre"
      ];

      let day = currentDate.getDate();
      let monthIndex = currentDate.getMonth();
      let year = currentDate.getFullYear();

      if (day === 1) {
        day = "1er";
      }

      return day + " " + monthNames[monthIndex] + " " + year;
    }
  },
  props: {
    categories: {
      type: Array,
      default: () => {
        return [];
      }
    },
    update: {
      type: Object,
      default: () => {
        return "";
      }
    }
  },
  data() {
    return {
      showModalCategory: false
    };
  },
  computed: {
    tasksByCategories() {
      let array = [];
      array = this.categories.map(el => {
        let object = {};
        object.tasks = this.update.tasks.filter(
          task => task.category === el._id
        );
        object.name = el.name;
        object._id = el._id;
        return object;
      });
      return array;
    }
  }
};
</script>

<style scoped>
.column-update {
  width: 380px;
  height: 800px;
  background-color: #242e3e;
  margin-left: 50px;
  display: inline-block;
  box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.308);
  overflow-y: auto;
}

.text-full-width {
  width: 100%;
  text-align: center;
}

.add-category {
  background-color: #242e3e00;
  display: block;
  margin-left: auto;
  margin-right: auto;
  transition: all 0.3s;
  border: 1px white solid;
  height: 75px;
  width: 235px;
}

.add-category:hover {
  cursor: pointer;
  background-color: rgba(70, 133, 228, 0.589);
}

.add-category:focus {
  outline: 0;
}
</style>
