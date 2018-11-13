<template>
  <div class="animated fadeIn">
    <h3>태그는 여러분들의 질문을 다른, 비슷한 내용의 질문들과 함께 분류하는 키워드입니다. 적절한 태그를 사용하면 여러분의 질문을 다른 사람들이 더 잘 찾아 답변할 수 있습니다. 또한 관심 있는 칼럼이나 리포트를 찾아볼 수 있습니다.</h3>
    <b-form-input class="border-success mb-4" type="text" v-model="search" placeholder="Search for tags" style="background: url('/static/img/magnifying-glass.png') no-repeat center; background-size: 26px 26px; background-position: right 13px center; padding: 8px 48px 8px 8px;" />
    <div class="d-flex flex-wrap mt-3">
      <div class="border border-dark rounded mb-2 mr-2 p-1 align-middle text-muted" v-for="tag in filteredList" :key="tag">
        {{ tag }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Tags',
  created () {
  },
  data () {
    return {
      search: ''
    }
  },
  computed: {
    filteredList () {
      return this.$store.state.tags.filter(tas => {
        return tas.toLowerCase().includes(this.search.toLowerCase())
      })
    }
  },
  methods: {
  }
}
</script>
