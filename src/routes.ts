interface IRoute {
    name: string;
    enable: boolean;
}

interface IRoutes {
    [key: string]: IRoute;
}

const routes: IRoutes = {
    '/': {
        name: 'خانه',
        enable: true,
    },

    '/dashboard': {
        name: 'داشبورد',
        enable: true,
    },
    '/profile': {
        name: 'حساب کاربری',
        enable: true,
    },

    '/projects': {
        name: 'لیست پروژه‌ها',
        enable: true,
    },
    '/projects/:id/view': {
        name: 'نمایش پروژه',
        enable: true,
    },
    '/projects/:id': {
        name: ':id',
        enable: true,
    },
    '/projects/:id/manage': {
        name: 'مدیریت پروژه',
        enable: true,
    },
    '/projects/:id/manage/things': {
        name: 'اشیا',
        enable: false,
    },
    '/projects/:id/manage/things/new': {
        name: 'ساخت شی',
        enable: true,
    },
    '/projects/:id/manage/things/:tid': {
        name: ':id',
        enable: true,
    },
    '/projects/:id/manage/scenarios': {
        name: 'سناریو‌ها',
        enable: false,
    },
    '/projects/:id/manage/scenarios/new': {
        name: 'ساخت سناریو',
        enable: true,
    },
    '/projects/:id/manage/scenarios/:sid': {
        name: ':sid',
        enable: true,
    },
    '/projects/:id/manage/things/:tid/codec': {
        name: 'ارسال کدک',
        enable: true,
    },

    '/admin/global-codecs': {
        name: 'قالب‌های عمومی',
        enable: true,
    },
    '/admin/global-codecs/new': {
        name: 'ساخت قالب عمومی',
        enable: true,
    },
    '/admin/global-codecs/:id': {
        name: ':id',
        enable: true,
    },

    '/things': {
        name: 'لیست اشیا',
        enable: true,
    },

    '/template': {
        name: 'ارسال قالب',
        enable: true,
    },

    '/gateways': {
        name: 'لیست گذرگاه‌ها',
        enable: true,
    },
    '/gateways/new': {
        name: 'افزودن گذرگاه',
        enable: true,
    },
    '/gateways/:id': {
        name: ':id',
        enable: true,
    },

    '/device-profiles': {
        name: 'لیست پروفایل اشیا',
        enable: true,
    },
    '/device-profiles/new': {
        name: 'افزودن پروفایل اشیا',
        enable: true,
    },
    '/device-profiles/:id': {
        name: ':id',
        enable: true,
    },

    '/packages': {
        name: 'بسته‌ها',
        enable: true,
    },
    '/packages/:id': {
        name: ':id',
        enable: true,
    },
    '/transactions': {
        name: 'تراکنش‌ها',
        enable: true,
    },

    '/admin': {
        name: 'حوزه مدیریت',
        enable: false,
    },
    '/admin/packages': {
        name: 'مدیریت بسته‌ها',
        enable: true,
    },
    '/admin/packages/new': {
        name: 'افزودن بسته جدید',
        enable: true,
    },
    '/admin/packages/:id': {
        name: ':id',
        enable: true,
    },

    '/admin/users': {
        name: 'مدیریت کاربران سیستم',
        enable: true,
    },
    '/admin/users/:user': {
        name: ':user',
        enable: true,
    },

    '/admin/transactions': {
        name: 'مدیریت تراکنش‌های سیستم',
        enable: true,
    },
    '/admin/roles': {
        name: 'مدیریت نقش‌ها',
        enable: true,
    },
    '/admin/links': {
        name: 'سامانه‌های نظارتی',
        enable: true,
    },
};
export default routes
