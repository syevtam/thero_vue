<template>
  <div class="content">
    <section class="line" v-for="artist in musicData" :key="artist.artistName">
      <h2>{{ artist.artistName }}</h2>
      <div class="line_card_group">
        <vs-card
          class="line_card"
          v-for="release in artist.artistData"
          :key="release.trackId"
        >
          <template #img>
            <img
              :src="release.artworkUrl100.replace('100x100', '1000x1000')"
              alt=""
            />
          </template>
          <template #text>
            <p style="display: none">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
            </p>
            <p>Genre: {{ release.primaryGenreName }}</p>
            <p>Album: {{ release.collectionName }}</p>
          </template>
          <template #title>
            <h3>{{ release.trackName }}</h3>
          </template>
          <!-- <template #buttons>
           
          </template> -->
          <template #interactions>
            <vs-button v-if="release.contentAdvisoryRating" danger icon>
              {{ release.contentAdvisoryRating }}
            </vs-button>
            <vs-button class="btn-chat" shadow primary>
              <span class="span">{{ fmtDate(release.releaseDate) }}</span>
            </vs-button>
          </template>
        </vs-card>
      </div>
    </section>
  </div>
</template>

<style lang="stylus" scoped>
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
  min-width: fit-content;
  margin: 0 1em;
  text-align: left;
}

.line {
  min-width: 100vw;
  min-height: 10em;
  position: relative;
}
</style>

<script>
const musicians = [
  "LP",
  "Wildways",
  "50 cent",
  "Ed Sheeran",

];
export default {
  name: "Music",
  data() {
    return {
      musicData: [],
    };
  },
  methods: {
    fmtDate(d) {
      let c = new Date(d);
      return `${c.getDate()}/${c.getMonth() + 1}/${c.getFullYear()}`;
    },
  },
  created() {
    musicians.forEach((m) => {
      let tr = [];
      this.$axios
        .get(
          `https://itunes.apple.com/search?term=${m.split` `
            .join`+`}&limit=25&entity=song&attribute=allArtistTerm`
        )
        .then((r) => {
          r.data.results.map((d) => tr.push(d));
        });
      this.musicData.push({ artistName: m, artistData: tr });
    });
  },
};
</script>

<style>
</style>