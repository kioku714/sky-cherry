<template>
  <div class="animated fadeIn">
    <div class="col-sm-6 col-lg-6">
      <div class="row">
        <b-carousel id="carousel1"
                  style="text-shadow: 1px 1px 2px #333;"
                  controls
                  :interval="0"
                  v-model="slide"
        >
          <div v-for="item in cherryCard.coverflow" :key="item">
              <b-carousel-slide v-bind:img-src="item"/>
          </div>
        </b-carousel>
      </div>
      <div class="row">
        <div class="col">
          <div class="photo_info">
            <span class="source">Imagetoday</span>
            <span class="num_page">
              {{ slide + 1 }} / {{ cherryCard.coverflow.length }}
            </span>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="textBody">
            <h1 class="tit">{{ cherryCard.title }}</h1>
            <p class="cont">{{ cherryCard.content }}</p>
            <br><br><br>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import bCarousel from 'bootstrap-vue/es/components/carousel/carousel'
import bCarouselSlide from 'bootstrap-vue/es/components/carousel/carousel-slide'

export default {
  created () {
    this.$http.get('/api/cherryCard/' + this.$route.params.category + '/' + this.$route.params.id)
      .then((response) => {
        this.cherryCard = response.data
      })
  },
  components: {
    bCarousel,
    bCarouselSlide
  },
  data () {
    return {
      cherryCard: {},
      slide: 0,
      sliding: null
    }
  }
}
</script>
