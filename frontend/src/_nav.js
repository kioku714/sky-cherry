export default {
  items: [
    {
      name: '체리카드',
      url: '/news',
      icon: 'fa fa-newspaper-o',
      children: [
        {
          name: 'SKY’S PICK',
          url: '/news/pick'
        },
        {
          name: 'BEAUTY',
          url: '/news/beauty'
        },
        {
          name: 'FOOD',
          url: '/news/gourmet'
        },
        {
          name: 'CULTURE',
          url: '/news/movie'
        },
        {
          name: 'FINANCE',
          url: '/news/financial'
        },
        {
          name: 'LIFE STYLE',
          url: '/news/trend'
        }
      ]
    },
    {
      name: '질문하기',
      url: '/questions',
      icon: 'fa fa-quora',
      children: [
        {
          name: '인기',
          url: '/questions?sort=like'
        },
        {
          name: '최신',
          url: '/questions?sort=new'
        },
        {
          name: 'Top',
          url: '/questions?sort=top'
        }
      ]
    },
    {
      name: '컬럼&Live',
      url: '/serial',
      icon: 'fa fa-film',
      children: [
        {
          name: '컬럼',
          url: '/serial/column'
        },
        {
          name: 'Live',
          url: '/serial/live'
        }
      ]
    },
    {
      name: 'Tags',
      url: '/tags',
      icon: 'fa fa-hashtag'
    }
  ]
}
