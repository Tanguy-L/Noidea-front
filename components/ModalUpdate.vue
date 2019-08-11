<template>
  <div class="modal">
    <h4 class="margin-height-24">Ajouter une maj</h4>
    <div class="modal-container">
      <div class="modal-input margin-top-16">
        <label for="category-name">Nom de la maj: </label>
        <input v-model="update.name" type="text" name="category-name" />
      </div>
      <div class="modal-input margin-top-16">
        <label for="category-name">version de la maj: </label>
        <input v-model="update.version" type="text" name="category-name" />
      </div>
      <div class="modal-input margin-top-16">
        <label for="category-name">date de la maj: </label>
        <vue-datepicker-local
          v-model="update.date"
          :local="local"
        ></vue-datepicker-local>
      </div>
      <div style="width:100%;display:flex;justify-content:center">
        <button
          class="button-add-task green margin-height-16"
          @click="SendUpdate"
        >
          Valider
        </button>
        <button class="red" @click="exitModal()">quitter</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "~/plugins/axios";

export default {
  data() {
    return {
      update: {
        name: "",
        version: "",
        date: new Date()
      },
      local: {
        dow: 1, // Monday is the first day of the week
        hourTip: "Select Hour", // tip of select hour
        minuteTip: "Select Minute", // tip of select minute
        secondTip: "Select Second", // tip of select second
        yearSuffix: "", // format of head
        monthsHead: "January_February_March_April_May_June_July_August_September_October_November_December".split(
          "_"
        ), // months of head
        months: "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"), // months of panel
        weeks: "Su_Mo_Tu_We_Th_Fr_Sa".split("_"), // weeks
        cancelTip: "Cancel", // default text for cancel button
        submitTip: "Submit" // default text for submit button
      }
    };
  },
  methods: {
    exitModal() {
      this.$emit("closeModal");
    },
    async SendUpdate() {
      const update = this.update;
      try {
        await axios.post("/v1/projects", {
          name: update.name,
          version: update.version,
          date: update.date
        });
      } catch (error) {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log("Error", error.message);
        }
        console.log(error);
      }
    }
  }
};
</script>

<style scoped>
.modal {
  position: absolute;
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

.modal-input {
  width: 80%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.row-buttons {
  width: 100%;
  display: flex;
  justify-content: center;
}

h4 {
  width: 100%;
  text-align: center;
}
</style>
