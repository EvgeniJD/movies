<template>
  <div
    class="mx-auto p-10"
  >
    <MovieDetails :movieData="movie"></MovieDetails>
  </div>
</template>

<script>
import MovieDetails from "../components/MovieDetails.vue";

export default {
  name: "Movie",
  components: { MovieDetails },
  computed: {
    movie() {
      return this.$store.getters.getMovieById(this.$route.params.movieId) || {};
    },
  },
};
</script>
