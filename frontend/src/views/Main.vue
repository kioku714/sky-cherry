<template>
  <div class="movies">
    <ul class="list_p1">
      <div class="row">

        <div class="col-sm-6 col-lg-6">
          <li id="2018101616497710856" class="bundle" style="">
            <a href="view.html?no=2018101616497710856">
              <img class="card-img-bottom" src="http://menu.mt.co.kr/ttimes/img/201810/2018101616497710856_61168.png/dims/optimize/" alt="물을 전기분해하면 산소·수소가 되지만, 둘을 합치면 전기가 된다" style="display: block;">
              <span class="cont">
                <strong class="tit">물을 전기분해하면 산소·수소가 되지만, 둘을 합치면 전기가 된다</strong>
              </span>
            </a>
          </li>
        </div>

        <div class="col-sm-6 col-lg-6">
          <li id="2018101915447745635" class="bundle" style="">
            <a href="view.html?no=2018101915447745635">
              <span class="thum">
                <img class="card-img-bottom" src="http://menu.mt.co.kr/ttimes/img/201810/2018101915447745635_53643.png/dims/optimize/" alt="1만명 집단지성이 만든 나무도마" style="display: block;">
              </span>
              <span class="cont">
                <strong class="tit">1만명 집단지성이 만든 나무도마</strong>
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
    this.$http.get('/api/test')
      .then((response) => {
        this.movies = response.data
      })
  },
  data () {
    return {
      movies: []
    }
  }
}
</script>
