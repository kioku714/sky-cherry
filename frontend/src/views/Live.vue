<template>
  <div class="animated fadeIn">
    <b-row>
      <b-col sm="10">
        <div class="mb-3">
          <b-embed type="iframe"
              aspect="16by9"
              src="https://www.youtube.com/embed/YAb8WR-GmJY?rel=0">
          </b-embed>
        </div>
        <h3>[Live] 현직은행원이 말해주는 2030 재테크...</h3>
        <div class="text-right">
          <span class="mr-2">참여자 35명</span>
          <span class="likes"><i class="fa fa-heart-o" /> 93</span>
        </div>
        <hr>
        <div v-bind:style="{ background: 'white' }">
          <div class="p-3">
            <b-row>
              <b-col sm="1" cols="2">
                <div class="header-icon-text" v-bind:style="{ background: '#1769ff' }">O</div>
              </b-col>
              <b-col>
                사...사랑합니다!!! 마인드가 너무 좋으시고 말씀도 듣는 사람 느낌 좋게 너무 사근사근 잘하세요. 완전 꿈의 이상형입니다.^^
              </b-col>
            </b-row>
          </div>
          <div class="p-3">
            <b-row>
              <b-col sm="1" cols="2">
                <div class="header-icon-text" v-bind:style="{ background: '#026466' }">현</div>
              </b-col>
              <b-col>
                안녕하세요!!! ♥️<br>
                하.. 정말이지 너무너무 재밌어서 매일매일 업데이트될 때마다 알림 맞춰놓고 보게되용<br>
                저는 25살 여자입니당 24살 때 대학교 졸업하자마자 계약직으로 왔던 직장에서 1년 근무하고 올해 운이좋게 정규직 전환이 되서 나름 준공무원 자리로 오게 됐어용
              </b-col>
            </b-row>
          </div>
        </div>
      </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  name: 'Live',
  created () {
  },
  data () {
    return {
    }
  },
  methods: {
  }
}
</script>
