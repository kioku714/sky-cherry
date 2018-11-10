<template>
  <div class="animated fadeIn">
    <div class="row" v-for="i in Math.ceil(cherryCardList.length/2)" :key="i.id">
      <div class="col-sm-6 bg-white p-0" v-for="item in cherryCardList.slice((i-1) * 2, i*2)" :key="item.id">
        <a v-bind:href="$route.params.category + '/' + item.id">
          <img class="w-100" :src="item.mainImage">
          <div style="position: relative; top: -10px; left: 15px; width: 20px; height: 20px; background: url(http://menu.mt.co.kr/ttimes/images/renew/bg_diamond.png) no-repeat 0 0; background-size: 100%;"/>
          <div class="text-body pl-3 pb-4 pr-3" style="color:#1a1a1a; text-decoration: none; font-size: 18px;">
            {{ item.title }}
          </div>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'News',
  created () {
    this.fetchCardList(this.$route.params.category)
  },
  data () {
    return {
      cherryCardList: []
    }
  },
  beforeRouteUpdate (to, from, next) {
    this.fetchCardList(to.params.category)
    next()
  },
  methods: {
    fetchCardList (category) {
      this.cherryCardList = []
      this.$http.get('/api/news/' + category)
        .then((response) => {
          this.cherryCardList = response.data
        })
    }
  }
}
</script>
