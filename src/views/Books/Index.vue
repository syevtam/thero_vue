<template>
  <div class="content">
    <section
      class="line"
      v-for="(artist, artistIndex) in booksData"
      :key="artist.artistName"
    >
      <h2>{{ artist.artistName }}</h2>
      <div class="line_card_group">
        <div
          v-for="(release, releaseIndex) in artist.artistData"
          :key="release.collectionId"
        >
          <vs-card
            class="line_card"
            @click="
              dialogs.data[artistIndex][releaseIndex][release.collectionId] =
                !dialogs.data[artistIndex][releaseIndex][release.collectionId]
            "
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
              <p>Collection: {{ release.collectionName }}</p>
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
          <vs-dialog
            scroll
            overflow-hidden
            blur
            not-close
            auto-width
            v-model="
              dialogs.data[artistIndex][releaseIndex][release.collectionId]
            "
          >
            <template #header>
              <h3>{{ release.collectionName }}</h3>
            </template>
            <div class="con-content">
              <p v-html="release.description"></p>
              <p>{{ release.copyright }}</p>
            </div>
          </vs-dialog>
        </div>
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

<script>
const musicians = [
  "Pushkin", 
  "Esenin", 
  "Leo", 
];
export default {
  name: "Books",
  data() {
    return {
      booksData: [],
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
  },
  created() {
    let xd = [];
    musicians.forEach((m) => {
      let tr = [];
      let delta = [];
      this.$axios
        .get(
          `https://itunes.apple.com/search?term=${m.split` `
            .join`+`}&limit=25&entity=audiobook&attribute=authorTerm`
        )
        .then((r) => {
          r.data.results.map((d) => {
            let obj = new Object();
            obj[`${d.collectionId}`] = false;
            delta.push(obj);
            tr.push(d);
          });
        });
      this.dialogs.data.push(delta);
      this.booksData.push({ artistName: m, artistData: tr });
    });
  },
};
</script>

<style>
</style>