<template>
  <div class="rounded overflow-hidden shadow-lg">
    <router-link :to="{ name: 'Movie', params: { movieId: movie.imdbID } }">
      <img
        class="object-cover h-48 w-full"
        :src="movie.Poster"
        alt="Movie Cover"
      />
      <div class="px-6 py-4">
        <div class="font-bold text-xl mb-2">Actors</div>
        <p class="text-gray-700 text-base line-clamp-2">
          {{ movie.Actors }}
        </p>
      </div>
      <div class="px-6 pt-4 pb-2">
        <span
          class="
            inline-block
            bg-gray-200
            rounded-full
            px-3
            py-1
            text-sm
            font-semibold
            text-gray-700
            mr-2
            mb-2
          "
          v-for="(genre, index) in movieGenres"
          :key="`genre-${index}`"
        >
          {{ genre }}
        </span>
      </div>
    </router-link>
    <div class="text-right pr-10 pb-2" v-if="isUserLoggedIn">
      <button @click="toggleLike()" class="mr-2">
        <i
          :id="currentLikeIconID"
          class="fa-thumbs-up"
          :class="{ fas: isLiked, far: !isLiked }"
        ></i>
        {{ isLiked }}
      </button>
      <button @click="toggleBookmark()">
        <i
          :id="currentBookmarkID"
          class="far fa-bookmark"
          :class="{ fas: isBookMarked, far: !isBookMarked }"
        ></i>
        {{ isBookMarked }}
      </button>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
export default {
  name: "Card",
  props: {
    movieData: {
      Object,
      required: true,
    },
  },
  computed: {
    isUserLoggedIn() {
      return (
        !!this.$store.state.user.is_logged_in ||
        !!JSON.parse(localStorage.getItem("user"))
      );
    },
    movie() {
      return this.movieData;
    },
    currentLikeIconID() {
      return `like${this.movieData.imdbID}`;
    },
    currentBookmarkID() {
      return `bookMarker${this.movieData.imdbID}`;
    },
    isLiked() {
      if (this.movieData.likes == 0) {
        $('#' + this.currentLikeIconID).attr("data-prefix", "far");
      } else {
        $('#' + this.currentLikeIconID).attr("data-prefix", "fas");
      }
      return this.movieData.likes > 0;
    },
    isBookMarked() {
      if (this.movieData.bookmark == 0) {
        $('#' + this.currentBookmarkID).attr("data-prefix", "far");
      } else {
        $('#' + this.currentBookmarkID).attr("data-prefix", "fas");
      }
      return this.movieData.bookmark > 0;
    },
    movieGenres() {
      return this.movieData.Genre.split(",");
    },
  },
  methods: {
    toggleLike() {
      return this.$store.dispatch("updateMovieLikes", {
        imdbID: this.movie.imdbID,
      });
    },
    toggleBookmark() {
      return this.$store.dispatch("updateMovieBookmark", {
        imdbID: this.movie.imdbID,
      });
    },
  },
};
</script>
