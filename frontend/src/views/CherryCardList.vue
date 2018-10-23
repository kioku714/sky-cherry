<template>
  <div class="animated fadeIn">
    <ul class="list_p1">
      <div class="row" v-for="i in Math.ceil(cherryCardList.length/2)" :key="i.id">
        <div class="col-sm-6 col-lg-6" v-for="item in cherryCardList.slice((i-1) * 2, i*2)" :key="item.id">
          <li v-bind:id="item.id" class="bundle" style="">
            <a v-bind:href="'cherryCardDetail/' + item.id">
              <span class="thum">
                <img class="card-img-bottom" :src="item.mainImage" style="display: block;">
              </span>
              <span class="cont">
                <strong class="tit">{{ item.title }}</strong>
              </span>
            </a>
          </li>
        </div>
      </div>
    </ul>

  </div>
</template>

<script>
export default {
  created () {
    this.$http.get('/api/cherryCard')
      .then((response) => {
        this.cherryCardList = response.data
      })
  },
  data () {
    return {
      cherryCardList: []
    }
  }
}
</script>
