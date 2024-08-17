const localImgPrefix = '/static/image/category';
export function getCategoryList() {
  return [
    {
      groupId: '10001',
      name: '煎炒',
      // thumbnail: 'https://example.com/soup.png',
      children: [
        {
          groupId: '100011',
          name: '荤菜',
          // thumbnail: 'https://example.com/clear_soup.png',
          children: [
            {
              groupId: '1000111',
              name: '肉类',
              thumbnail: '/static/image/category}/huiguorou.png',
            },
            {
              groupId: '1000112',
              name: '海鲜',
              thumbnail: '/static/image/category}/yanjianxia.png',
            },
          ],
        },
        {
          groupId: '100012',
          name: '素菜',
          // thumbnail: 'https://example.com/clear_soup.png',
          children: [
            {
              groupId: '1000121',
              name: '时蔬',
              thumbnail: '/static/image/category}/qingcai.png',
            },
            {
              groupId: '1000122',
              name: '菌菇',
              thumbnail: '/static/image/category}/chaomogu.png',
            },
          ],
        },
        {
          groupId: '100013',
          name: '主食',
          // thumbnail: 'https://example.com/clear_soup.png',
          children: [
            {
              groupId: '1000131',
              name: '炒饭',
              thumbnail: '/static/image/category}/chaofan.jpeg',
            },
            {
              groupId: '1000132',
              name: '炒面',
              thumbnail: '/static/image/category}/chaomian.png',
            },
          ],
        },
      ],
    },
    {
      groupId: '10002',
      name: '炖煮',
      // thumbnail: 'https://example.com/soup.png',
      children: [
        {
          groupId: '100021',
          name: '荤菜',
          // thumbnail: 'https://example.com/clear_soup.png',
          children: [
            {
              groupId: '1000211',
              name: '肉类',
              thumbnail: '/static/image/category}/dunrou.jpeg',
            },
            {
              groupId: '1000212',
              name: '海鲜',
              thumbnail: '/static/image/category}/baizhuoxia.jpeg',
            },
          ],
        },
        {
          groupId: '100022',
          name: '主食',
          // thumbnail: 'https://example.com/clear_soup.png',
          children: [
            {
              groupId: '1000221',
              name: '粥',
              thumbnail: '/static/image/category}/zhou.jpeg',
            },
            {
              groupId: '1000222',
              name: '饭',
              thumbnail: '/static/image/category}/fan.jpeg',
            },
          ],
        },
      ],
    },
    {
      groupId: '10003',
      name: '蒸烤',
      // thumbnail: 'https://example.com/soup.png',
      children: [
        {
          groupId: '100031',
          name: '荤菜',
          // thumbnail: 'https://example.com/clear_soup.png',
          children: [
            {
              groupId: '1000311',
              name: '肉类',
              thumbnail: '/static/image/category}/kaorou.jpeg',
            },
            {
              groupId: '1000312',
              name: '海鲜',
              thumbnail: '/static/image/category}/zhengyu.jpeg',
            },
          ],
        },
        {
          groupId: '100032',
          name: '主食',
          // thumbnail: 'https://example.com/clear_soup.png',
          children: [
            {
              groupId: '1000321',
              name: '面食',
              thumbnail: '/static/image/category}/miantiao.jpeg',
            },
            {
              groupId: '1000322',
              name: '粗粮',
              thumbnail: '/static/image/category}/zhuyumi.jpeg',
            },
          ],
        },
      ],
    },
  ];
}
