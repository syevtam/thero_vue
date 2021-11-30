<template>
  <div class="content">
    <section
      class="line"
      v-for="(artist, artistIndex) in podcastsData"
      :key="artist.artistName"
    >
      <h2>{{ artist.artistName }}</h2>
      <div class="line_card_group">
        <div
          v-for="(release, releaseIndex) in artist.artistData"
          :key="release.trackId"
        >
          <vs-card
            @click="
              dialogs.data[artistIndex][releaseIndex][release.collectionId] =
                !dialogs.data[artistIndex][releaseIndex][release.collectionId]
            "
            class="line_card"
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
              <h3>
                {{ release.artistName }} - {{ release.collectionName }} -
                {{ release.primaryGenreName }}
              </h3>
            </template>
            <div class="con-content">
              <h4>Genre</h4>
              <p>{{ release.genres.join(", ") }}</p>
              <h4>Country</h4>
              <p>{{ release.country }}</p>
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

.audio_player {
  width: 100% !important;
  background: none !important;
}
</style>

<script>
const podcasters = [
  "Luke",
  "",
];
export default {
  name: "Podcasts",
  data() {
    return {
      podcastsData: [],
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
    async listEpisodes(z) {
      const r = await this.$axios.get(
        `https://itunes.apple.com/lookup?id=${z}&country=US&media=podcast&entity=podcastEpisode&limit=100`
      );
      return r.data;
    },
  },
  created() {
    podcasters.forEach((m) => {
      let tr = [];
      let delta = [];
      this.$axios
        .get(
          `https://itunes.apple.com/search?term=${m.split` `
            .join`+`}&limit=25&entity=podcast&attribute=authorTerm`
        )
        .then((r) => {
          r.data.results.forEach((d) => {
            Promise.resolve(this.listEpisodes(d.collectionId)).then(
              (y) => (d.episodesData = y)
            );
            let obj = new Object();
            obj[`${d.collectionId}`] = false;
            delta.push(obj);
            tr.push(d);
          });
        });
      this.dialogs.data.push(delta);
      this.podcastsData.push({ artistName: m, artistData: tr });
    });
  },
};
</script>

<style>
</style>