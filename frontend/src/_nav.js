export default {
  items: [
    {
      name: 'Main',
      url: '/main',
      icon: 'icon-speedometer'
    },
    {
      name: '체리카드',
      url: '/cherryCard',
      icon: 'icon-puzzle',
      children: [
        {
          name: 'SKY’s Pick',
          url: '/cherryCard/pick',
          icon: 'icon-people'
        },
        {
          name: '뷰티',
          url: '/cherryCard/beauty',
          icon: 'icon-people'
        },
        {
          name: '고메',
          url: '/cherryCard/gourmet',
          icon: 'icon-people'
        },
        {
          name: '영화',
          url: '/cherryCard/movie',
          icon: 'icon-people'
        },
        {
          name: '제테크',
          url: '/cherryCard/financial',
          icon: 'icon-people'
        },
        {
          name: '트랜드',
          url: '/cherryCard/trend',
          icon: 'icon-people'
        }
      ]
    }
  ]
}
