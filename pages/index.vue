<template>
  <div class="parent-container">
    <div class="main-index">
      <div class="container-content">
        <h1 class="margin-height-16 title">
          Bienvenue sur <span class="text-blue"> No-Idea 🙂</span>
        </h1>
        <p class="margin-height-16 text">
          No-idea est un projet qui permet de manipuler des tickets. Il n'y a
          pour l'instant pas d'authentification nécessaire, ce site est une
          démo, vous êtes libre de l'essayer comme vous souhaitez.
        </p>
        <p class="margin-height-16 text">
          Le site est tout simplement un kanban, chaque colonne représente des
          "mises à jours", pour chacune d'entre elles, il est possible d'ajouter
          des catégories, et chaque catégorie a ses propres tâches.
        </p>
      </div>
      <div class="container-techno-card">
        <h3 class="title-techno">Ce que j'ai appris avec ce projet</h3>
        <div class="techno-card">
          <p class="black">
            Backend :
          </p>
          <ul>
            <li>API NodeJS et koaJS</li>
            <li>BDD MongoDB et Mongoose</li>
            <li>Dockerisation de l'application pour un déploiement rapide</li>
            <li>Jest pour les tests</li>
            <li>
              Le projet est sur Git:
              <a href="https://github.com/Tanguy-L/api-noidea">Cliquer ici !</a>
            </li>
          </ul>
        </div>
        <div class="techno-card">
          <p class="black">
            Frontend :
          </p>
          <ul>
            <li>
              Nuxt-JS (VueJS coté serveur)
            </li>
            <li>VueX</li>
            <li>Dockerisation de l'application pour un déploiement rapide</li>
            <li>Requête Axios</li>
            <li>Rythme verticale et Design</li>
            <li>Pas encore responsive (mais c'est prévu)</li>
            <li>
              Le projet est sur Git:
              <a href="https://github.com/Tanguy-L/noidea-front"
                >Cliquer ici !</a
              >
            </li>
          </ul>
        </div>
        <div class="techno-card">
          <p class="black">
            Environnement de dévelopement :
          </p>
          <ul>
            <li>Windows 10 avec sous-système Ubuntu pour l'API et Mongo</li>
            <li>Visual Studio Code Community</li>
            <li>Postman, Robo3T, Inkscape, AdobeXD, Gitkraken</li>
            <li>Serveur VPS OVH</li>
            <li>Versionning Git</li>
            <li>ESlint</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.parent-container {
  background-color: rgb(243, 243, 243);
  min-height: calc(100% - 56px);
}

.container-techno-card {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  min-height: 0;
  margin-top: 48px;
}

.techno-card {
  padding: 16px;
  background: #5c258d; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to right,
    #4389a2,
    #5c258d
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to right,
    #4389a2,
    #5c258d
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  color: white;
  margin: 16px 32px;
  border-radius: 2px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.342);
}

.techno-card > p {
  color: white;
}

h3 {
  width: 100%;
  color: black;
}

ul {
  padding: 0;
}

a {
  color: white;
  background-color: #4389a2;
  padding: 8px;
  text-decoration: none;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.137);
  transition: all 0.2s ease-in;
  margin-left: 8px;
}

a:hover {
  background-color: #85d1ec;
}

.main-index {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.title-techno {
  position: relative;
}

.title-techno::before {
  content: "";
  width: 20%;
  height: 2px;
  position: absolute;
  bottom: -16px;
  left: 40%;
  background-color: #4389a2;
}

.container-content {
  display: flex;
  width: 65%;
  flex-wrap: wrap;
  align-items: center;
  flex-direction: column;
  min-height: 0;
  background: linear-gradient(#e66465, #9198e5);
  border-radius: 4px;
  box-shadow: 0 6px 12px #00000040;
  margin-top: 24px;
}

ul {
  list-style-type: none;
}

li {
  margin-top: 8px;
  font-family: "Montserrat", sans-serif;
  font-size: 14px;
  line-height: 24px;
}

.text-blue {
  color: #dbbe5e;
}

.black {
  color: rgb(22, 58, 87);
  text-align: center;
  font-weight: 600;
}

.text {
  color: black;
  max-width: 65%;
  text-align: center;
}

@media screen and (max-width: 640px) {
  .container-content {
    width: 90%;
  }
  h1 {
    text-align: center;
    font-size: 24px;
  }
}

@media screen and (max-width: 340px) {
  .text {
    min-width: 80%;
    font-size: 12px;
  }

  h3 {
    font-size: 18px;
  }

  p {
    font-size: 14px;
  }

  li {
    font-size: 12px;
  }
}
</style>
