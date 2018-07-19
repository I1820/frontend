export default {
  items: [

    {
      name: 'داشبورد',
      url: '/dashboard',
      icon: 'icon-screen-desktop',
      type: 'global'
    },

    {
      name: 'پروژه ها',
      url: '/projects',
      icon: 'icon-layers',
      type: 'user'
    },
    {
      name: 'اشیا و گذرگاه ها',
      type: 'user',
      icon: 'icon-puzzle',
      children: [
        {
          name: 'اشیا',
          url: '/things',
          icon: 'icon-feed',
          type: 'user'
        },
        {
          name: 'گذرگاه ها',
          url: '/gateways',
          icon: 'icon-direction',
          type: 'user'
        },

        {
          name: 'پروفایل اشیا',
          url: '/device-profile/list',
          icon: 'icon-grid',
          type: 'user'
        }]
    },
    {
      name: 'بخش مالی',
      type: 'user',
      icon: 'icon-puzzle',
      children: [
        {
          name: 'تراکنش ها',
          url: '/transactions',
          icon: 'icon-grid',
          type: 'user'
        },
        {
          name: 'خرید بسته',
          url: '/packages',
          icon: 'icon-grid',
          type: 'user'
        }]
    },
    {
      name: 'مدیریت پلتفرم',
      url: '/things',
      type: 'admin',
      icon: 'icon-puzzle',
      children: [
        {
          name: 'مدیریت پرتال پرداخت',
          url: '/portals',
          icon: 'icon-grid',
          type: 'admin'
        },
        {
          name: 'مدیریت بسته‌ها',
          url: '/admin/packages',
          icon: 'icon-grid',
          type: 'admin'
        },
        {
          name: 'مدیریت کاربران',
          url: '/admin/users',
          icon: 'icon-grid',
          type: 'admin'
        }, {
          name: 'تراکنش‌های سیستم',
          url: '/admin/transactions',
          icon: 'icon-grid',
          type: 'admin'
        },
        {
          name: 'مدیریت نقش ها',
          url: '/admin/roles',
          icon: 'icon-grid',
          type: 'admin'
        },
        {
          name: ' قالب های عمومی',
          url: '/admin/globalCodec',
          icon: 'icon-grid',
          type: 'admin'
        },
      ]
    }
    // {
    //     name: 'اشیاء',
    //     url: '/things',
    //     icon: 'icon-puzzle',
    //     children: [
    //         {
    //             name: 'لیست اشیاء',
    //             url: '/things/list',
    //             icon: 'icon-arrow-left'
    //         },
    //         {
    //             name: 'افزودن شی',
    //             url: '/things/new',
    //             icon: 'icon-arrow-left'
    //         },
    //         {
    //             name: 'آپلود فایل Excel',
    //             url: '/things/excel',
    //             icon: 'icon-arrow-left'
    //         },
    //     ]
    // },
    //
    // {
    //     name: 'Gateways',
    //     url: '/gateways',
    //     icon: 'icon-direction',
    // },

  ]
};
