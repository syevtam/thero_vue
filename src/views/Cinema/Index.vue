<template>
  <div class="content">
    <section class="line" v-for="(genre, genreIndex) in genres" :key="genre.id">
      <h2>{{ genre.name }}</h2>
      <div class="line_card_group">
        <div v-for="(movie, movieIndex) in genre.movies" :key="movie.id">
          <vs-card
            @click="
              dialogs.data[genreIndex][movieIndex][movie.id] =
                !dialogs.data[genreIndex][movieIndex][movie.id]
            "
            v-if="movie.poster_path !== null"
            class="line_card"
          >
            <template #img>
              <img
                :src="`https://www.themoviedb.org/t/p/w600_and_h900_bestv2/${movie.poster_path}`"
                alt=""
              />
            </template>
            <template #text>
              <p style="display: none">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              </p>
              <p>Genre: {{ movie.genre_ids.join(" ") }}</p>
              <!-- <p>Альбом: {{ release.collectionName }}</p> -->
            </template>
            <template #title>
              <h3>{{ movie.original_title }}</h3>
            </template>
            <!-- <template #buttons>
           
          </template> -->
            <template #interactions>
              <vs-button danger icon>
                {{ movie.vote_average }}
              </vs-button>
              <vs-button class="btn-chat" shadow primary>
                <span class="span">{{ fmtDate(movie.release_date) }}</span>
              </vs-button>
            </template>
          </vs-card>
          <vs-dialog
            scroll
            overflow-hidden
            blur
            not-close
            auto-width
            v-model="dialogs.data[genreIndex][movieIndex][movie.id]"
          >
            <template #header>
              <h3>{{ movie.name }}</h3>
            </template>
            <div class="con-content">
              <h4>Cast Data</h4>
              <p>
                {{ movie.castData }}
              </p>

              <h4>Meta Data</h4>

              <p>
                {{ movie.metaData }}
              </p>
            </div>
          </vs-dialog>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
const API_KEY = "52217232f795bbefbb1b7c951aae98ad";

export default {
  name: "Cinema",
  data() {
    return {
      genres: [],
      movies: [],
      dialogs: {
        data: [],
      },
    };
  },
  methods: {
    fmtDate(d) {
      let c = new Date(d);
      return `${c.getDate()}/${c.getMonth() + 1}/${c.getFullYear()}`;
    },
    async getMovieCast(mID) {
      try {
        const r = await axios.get(
          `https://api.themoviedb.org/3/movie/${mID}/credits?api_key=52217232f795bbefbb1b7c951aae98ad&language=ru-RU`
        );
        return r.data;
      } catch (error) {
        return error;
      }
    },
    async getMovieMeta(mID) {
      try {
        const r = await axios.get(
          `https://api.themoviedb.org/3/movie/${mID}?api_key=52217232f795bbefbb1b7c951aae98ad&language=ru-RU`
        );
        return r.data;
      } catch (error) {
        return error;
      }
    },
  },
  created() {
    axios
      .get(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`
      )
      .then((r) => {
        r.data.genres.map((g) => {
          axios
            .get(
              `https://api.themoviedb.org/3/discover/movie?with_genres=${g.id}&sort_by=release_date.desc&api_key=${API_KEY}`
            )
            .then((x) => {
              let delta = [];
              g.movies = x.data.results;
              this.genres.push(g);
              x.data.results.forEach((z) => {
                try {
                  Promise.resolve(
                    this.getMovieCast(z.id).then((y) => (z.castData = y))
                  );
                  Promise.resolve(
                    this.getMovieMeta(z.id).then((y) => (z.metaData = y))
                  );
                  let obj = new Object();
                  obj[`${z.id}`] = false;
                  delta.push(obj);
                } catch (error) {
                  console.log(`ERR: `, error);
                }
              });
              this.dialogs.data.push(delta);
            });
        });
      });
  },
};
</script>

<style lang="stylus">
h2 {
  text-align: left;
}

.line_card_group {
  display: flex;
  min-width: 100vw;
  padding: 2em;
  overflow-y: auto;
}

.line_card {
  display: inline-block;
  width: fit-content;
  min-width: 330px;
  margin: 0 1em;
  text-align: left;
}

.line {
  min-width: 100vw;
  min-height: 10em;
  position: relative;
}
</style>
