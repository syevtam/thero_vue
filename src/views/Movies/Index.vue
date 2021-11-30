<template>
  <div class="pageContent">
    <div class="container">
      <div v-for="(movie, movieIndex) in movies" :key="movie.id">
        <vs-card
          class="line_card"
          @click="
            dialogs.data[movieIndex][movie.id] =
              !dialogs.data[movieIndex][movie.id]
          "
        >
          <template #img>
            <img
              :src="
                movie.snippet.thumbnails.standard !== undefined
                  ? movie.snippet.thumbnails.standard.url
                  : `https://content.architecting.it/wp-images/su_p2fg_featured_o.jpg`
              "
              alt=""
            />
          </template>
          <template #text>
            <p style="display: none">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
            </p>
            <p>Channel: {{ movie.snippet.channelTitle }}</p>
            <p>Date: {{ fmtDate(movie.snippet.publishedAt) }}</p>
            <!-- <p>Альбом: {{ release.collectionName }}</p> -->
          </template>
          <template #title>
            <h3>
              {{
                movie.snippet.title.length > 24
                  ? `${movie.snippet.title.substring(0, 25)}...`
                  : movie.snippet.title
              }}
            </h3>
          </template>
          <!-- <template #buttons>
        
            </template> -->
          <template #interactions>
            <vs-button danger icon>
              {{ movie.statistics.likeCount }}
            </vs-button>
            <vs-button class="btn-chat" shadow primary>
              {{ movie.statistics.viewCount }}
            </vs-button>
          </template>
        </vs-card>
        <vs-dialog
          scroll
          overflow-hidden
          blur
          not-close
          auto-width
          v-model="dialogs.data[movieIndex][movie.id]"
        >
          <template #header>
            <h3>{{ movie.snippet.title }}</h3>
          </template>
          <div class="con-content">
            <p>{{ movie.snippet.description }}</p>
            <p>
              {{ movie.snippet.publishedAt }}
            </p>
            <p>
              {{ movie.statistics }}
            </p>
          </div>
        </vs-dialog>
      </div>
    </div>
    <vs-button
      v-if="nextPageToken"
      @click="loadMore()"
      class="load_more"
      danger
      icon
    >
      Load More
    </vs-button>
  </div>
</template>

<script>
const API_KEY = "AIzaSyALHl2pCCZK3XCrH77-9CwAI9HnLpH0FLM";
export default {
  Name: "Movies",
  data() {
    return {
      movies: [],
      dialogs: {
        data: [],
      },
      nextPageToken: null,
    };
  },
  methods: {
    fmtDate(d) {
      let c = new Date(d);
      return `${c.getDate()}/${c.getMonth() + 1}/${c.getFullYear()}`;
    },
    loadMore() {
      axios
        .get(
          `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&regionCode=US&key=${API_KEY}&maxResults=50${
            this.nextPageToken !== null
              ? `&pageToken=${this.nextPageToken}`
              : ``
          }`
        )
        .then((r) => {
          let delta = [];
          r.data.items.map((e) => {
            try {
              let obj = new Object();
              obj[`${e.id}`] = false;
              delta.push(obj);
              this.movies.push(e);
            } catch (error) {
              console.log(`ERR: `, error);
            }
          });
          this.dialogs.data = delta;
          this.nextPageToken = r.data.nextPageToken;
        });
    },
  },
  created() {
    this.loadMore();
  },
};
</script>

<style lang="stylus" scoped>
.container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  grid-gap: 2em;
  max-width: 1800px;
  margin: 0 auto;
}

.pageContent {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.vs-card__img {
  max-height: 200px !important;
}

.load_more {
  max-width: 128px;
  margin: 4em;
}
</style>