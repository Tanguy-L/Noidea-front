<template>
  <div class="main-page">
    <h1>{{ statusState }}</h1>
    <h2>{{ user }}</h2>
    <input
      v-model="text"
      type="text"
    />
    <button @click="sendToSocket">Envoyer au serveur</button>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { mapState } from "vuex";

export default {
  data () {
    return {
      progress: 0,
      text: "",
      user: ""
    };
  },
  computed: {
    ...mapState({
      progressState: state => state.progress,
      statusState: state => state.status
    })
  },
  mounted () {
    this.socket = this.$nuxtSocket({
      channel: "/",
      reconnection: false
    });
    this.socket.emit("connect");
    this.socket.emit("authenticate", "Moustique", "motdepasse", resp => {
      console.log(resp);

      this.user = resp
    })
    this.socket.emit("message", "this is a beautiful message !");
    this.socket.emit("getData", {}, resp => {
      this.progress = resp;
    });
  },
  methods: {
    sendToSocket () {
      this.socket.emit("newMessage", { message: this.text, test: "asd" });
    }
  }
};
</script>

<style scoped>
.main-page {
  background-color: #d6d6d6;
  padding: 24px 0px;
  display: flex;
  flex-wrap: wrap;
}

@media screen and (max-width: 640px) {
  .main-page {
    flex-wrap: nowrap;
    overflow-y: auto;
  }
}
</style>
