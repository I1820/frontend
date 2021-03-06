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
            icon: 'fab fa-docker',
            type: 'user'
        },
        {
            name: 'اشیا و گذرگاه ها',
            type: 'user',
            icon: 'icon-feed',
            children: [
                {
                    name: 'اشیا',
                    url: '/things',
                    icon: 'icon-screen-smartphone',
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
                    url: '/device-profiles',
                    icon: 'icon-grid',
                    type: 'user'
                }]
        },
        {
            name: 'بخش مالی',
            type: 'user',
            icon: 'fas fa-coins',
            children: [
                {
                    name: 'تراکنش‌ها',
                    url: '/transactions',
                    icon: 'far fa-credit-card',
                    type: 'user'
                },
                {
                    name: 'بسته‌ها',
                    url: '/packages',
                    icon: 'fas fa-shopping-cart',
                    type: 'user'
                }]
        },
        {
            name: 'مدیریت پلتفرم',
            type: 'admin',
            icon: 'icon-briefcase',
            children: [
                {
                    name: 'مدیریت بسته‌ها',
                    url: '/admin/packages',
                    icon: 'fas fa-shopping-cart',
                    type: 'admin'
                },
                {
                    name: 'مدیریت کاربران',
                    url: '/admin/users',
                    icon: 'icon-people',
                    type: 'admin'
                }, {
                    name: 'تراکنش‌های سیستم',
                    url: '/admin/transactions',
                    icon: 'far fa-credit-card',
                    type: 'admin'
                },
                {
                    name: 'مدیریت نقش‌ها',
                    url: '/admin/roles',
                    icon: 'icon-mustache',
                    type: 'admin'
                },
                {
                    name: ' قالب های عمومی',
                    url: '/admin/global-codecs',
                    icon: 'icon-docs',
                    type: 'admin'
                }, {
                    name: 'سامانه‌های نظارتی',
                    url: '/admin/links',
                    icon: 'icon-link',
                    type: 'admin'
                }
            ]
        }
    ]
}
