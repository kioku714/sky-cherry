export default {
  items: [
    {
      name: '체리카드',
      url: '/news',
      icon: 'fa fa-newspaper-o',
      children: [
        {
          name: 'SKY\'s Pick',
          url: '/news/pick'
        },
        {
          name: '뷰티',
          url: '/news/beauty'
        },
        {
          name: '고메',
          url: '/news/gourmet'
        },
        {
          name: '영화',
          url: '/news/movie'
        },
        {
          name: '재태크',
          url: '/news/financial-technology'
        },
        {
          name: '트렌드',
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
