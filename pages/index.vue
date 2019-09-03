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
        <h3>Ce que j'ai appris avec ce projet</h3>
        <div>
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
        <div>
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
        <div>
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

h3 {
  width: 100%;
  color: #568bc8;
}

.main-index {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.container-content {
  display: flex;
  width: 65%;
  flex-wrap: wrap;
  align-items: center;
  flex-direction: column;
  min-height: 0;
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
  color: #568bc8;
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
    width: 100%;
  }
}

@media screen and (max-width: 340px) {
  .text {
    min-width: 80%;
    font-size: 12px;
  }
  h1 {
    text-align: center;
    font-size: 24px;
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
