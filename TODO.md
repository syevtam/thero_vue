## Landing

### Authentication

- [ ] Login
- [ ] Register
- [ ] Present?

Serverless structure w/
`OAUTH + EXPRESS + MONGO`

## Application

- UI:
  - [x] [Vuesax](https://vuesax.com/docs/components/)

### Layout

- [x] Layout
  - [x] Navigation
  - [ ] ?Dark/Lght

---

### Audio module

iTunes Store API REQ e.g.

```
https://itunes.apple.com/search?term=seven+nation+army&entity=song&limit=1
```

#### Music

- [x] Card
- [x] Dialog
- [ ] Style dialog

#### Podcasts

- [x] Card
- [X] Dialog
- [ ] Style dialog
- [ ] ?Only lookup

#### Audiobooks

- [x] Card
- [x] Dialog
- [ ] Style dialog

---

### Video module

!Hookup themoviedb API (Cinema, series)
!Hook up YT API (Movies)

```
https://developers.themoviedb.org/3/tv-episodes/get-tv-episode-details
```

### Series

META

```
https://api.themoviedb.org/3/tv/84958?api_key=0&language=ru-RU
```

CAST

```
https://api.themoviedb.org/3/tv/84958/credits?api_key=0&language=ru-RU

```

- [x] Card
- [x] Dialog
  - [ ] Trailer player
- [ ] Style dialog

#### Cinema

META

```
https://api.themoviedb.org/3/movie/497819?api_key=0&language=ru-RU
```

CAST

```
https://api.themoviedb.org/3/movie/637649/credits?api_key=0&language=en-EN
```

TRAILER ?v-if video?

```
https://api.themoviedb.org/3/movie/637649/videos?api_key=0&language=ru-RU
```

- [x] Card
- [x] Dialog
  - [ ] Trailer player
- [ ] Style dialog

```
no cross-req required
```

#### Movies

- [x] Card
- [x] Dialog
  - [ ] YT-VIDEO
- [ ] Style dialog
  - [ ] Recommendatioins?

---

# !!!

- [ ] State mgmt
  - [x] USER
  - [ ] DATA
- [x] OAUTH + EXPRESS + MONGO
- [ ] Card line: fetch multiple pages
- [ ] FAVS
