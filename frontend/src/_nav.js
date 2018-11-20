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
          name: 'STYLE',
          url: '/news/beauty'
        },
        {
          name: 'PLACE',
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
          name: 'LIFE',
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
      name: '컬럼&라이브',
      url: '/serial',
      icon: 'fa fa-film',
      children: [
        {
          name: '컬럼',
          url: '/serial/column'
        },
        {
          name: '라이브',
          url: '/serial/live'
        }
      ]
    },
    {
      name: '태그',
      url: '/tags',
      icon: 'fa fa-hashtag'
    }
  ]
}
