<template>
  <div class="column-update">
    <h3>{{ currentUpdate.name }}</h3>
    <i
      class="material-icons delete-category red"
      @click="removeProject(idUpdate)"
      >delete_forever</i
    >
    <p class="text-full-width">{{ currentUpdate.date | formatDate }}</p>
    <p class="text-full-width">{{ currentUpdate.versionProject }}</p>
    <CategoryCard
      v-for="(el, index) in categories"
      :id="idUpdate"
      :key="index"
      :category="el"
    />
    <ModalCategory
      v-if="showModalCategory"
      :id-update="idUpdate"
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
import CategoryCard from "@/components/Cards/CategoryCard.vue";
import ModalCategory from "@/components/Modals/ModalCategory.vue";
import { mapGetters, mapActions } from "vuex";

export default {
  components: {
    CategoryCard,
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
    idUpdate: {
      type: String,
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
    ...mapGetters(["categories", "updateByIndex", "updates"]),
    currentUpdate() {
      return this.updateByIndex(this.idUpdate);
    }
  },
  methods: {
    ...mapActions(["removeProject"])
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
  position: relative;
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

.delete-category {
  position: absolute;
  right: 0;
  top: 0;
  color: white;
}

.delete-category:hover {
  cursor: pointer;
}
</style>
