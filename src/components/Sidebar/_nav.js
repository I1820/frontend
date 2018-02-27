export default {
  items: [

    {
        name: 'داشبورد',
        url: '/dashboard',
        icon: 'icon-screen-desktop',
    },

    {
        name: 'حساب کاربری',
        url: '/profile',
        icon: 'icon-user',
    },

    {
        name: 'پروژه ها',
        url: '/projects',
        icon: 'icon-layers',
        children: [
            {
                name: 'لیست پروژه ها',
                url: '/projects/list',
                icon: 'icon-arrow-left'
            },
            {
                name: 'افزودن پروژه',
                url: '/projects/new',
                icon: 'icon-arrow-left'
            },
        ]
    },

    {
        name: 'اشیاء',
        url: '/things',
        icon: 'icon-puzzle',
        children: [
            {
                name: 'لیست اشیاء',
                url: '/things/list',
                icon: 'icon-arrow-left'
            },
            {
                name: 'افزودن شی',
                url: '/things/new',
                icon: 'icon-arrow-left'
            },
            {
                name: 'آپلود فایل Excel',
                url: '/things/excel',
                icon: 'icon-arrow-left'
            },
        ]
    },

    {
        name: 'Gateways',
        url: '/gateways',
        icon: 'icon-direction',
    },

  ]
};
