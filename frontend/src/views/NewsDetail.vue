<template>
  <div class="animated fadeIn">
    <div class="col-sm-12">
      <div class="d-flex">
        <b-carousel id="carousel1"
                  style="z-index:0;margin: 0 auto;position: relative;max-width: 500px;"
                  controls
                  :interval="0"
                  v-model="slide"
        >
          <div v-for="item in cherryCard.coverflow" :key="item">
              <b-carousel-slide v-bind:img-src="item"/>
          </div>
          <div class="d-flex justify-content-end">
            Imagetoday {{ slide + 1 }} / {{ cherryCard.coverflow.length }}
          </div>
        </b-carousel>
      </div>
      <div class="row">
        <div class="mt-4 col-sm-8" v-bind:style="{ margin: 'auto' }">
            <h4>고양이 대신 화초에 빠진 밀레니얼세대</h4>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import bCarousel from 'bootstrap-vue/es/components/carousel/carousel'
import bCarouselSlide from 'bootstrap-vue/es/components/carousel/carousel-slide'

export default {
  name: 'NewsDetail',
  created () {
    this.$http.get('/api/news/' + this.$route.params.category + '/' + this.$route.params.id)
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
