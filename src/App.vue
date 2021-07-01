<template>
  <div>
    <Navbar />
    <router-view />
    <Footer />
  </div>
</template>

<script>
import axios from "axios";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default {
  name: "App",
  components: {
    Navbar,
    Footer,
  },
  data() {
    return {
      movieIds: [
        "tt6902332",
        "tt10648342",
        "tt9208876",
        "tt0788227",
        "tt7715722",
        "tt11559766",
      ],
    };
  },
  mounted() {
    console.log("Mounted");
    this.movieIds.forEach((movieId) => {
      axios
        .get("http://www.omdbapi.com/?i=" + movieId + "&apikey=2cbab1d9&")
        .then((response) => {
          this.$store.dispatch("addMovie", { movie: response.data });
          console.log("Movie added to store");
        })
        .catch((err) => {
          console.log(err);
        });
    });
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
