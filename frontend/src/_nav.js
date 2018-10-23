export default {
  items: [
    {
      name: '체리카드',
      url: '/news',
      icon: 'fa fa-newspaper-o',
      children: [
        {
          name: 'SKY’s Pick',
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
          name: '제테크',
          url: '/news/financial'
        },
        {
          name: '트랜드',
          url: '/news/trend'
        }
      ]
    },
    {
      name: '질문하기',
      url: '/question',
      icon: 'fa fa-quora',
      children: [
        {
          name: '인기',
          url: '/question?sort=like'
        },
        {
          name: '최신',
          url: '/question?sort=new'
        },
        {
          name: 'Top',
          url: '/question?sort=top'
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
