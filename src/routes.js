const routes = {
    '/': 'خانه',
    '/dashboard': 'داشبورد',
    '/profile': 'حساب کاربری',

    '/projects': 'لیست پروژه‌ها',
    '/projects/:id/view': 'نمایش پروژه',
    '/projects/:id': ':id',
    '/projects/:id/manage': 'مدیریت پروژه',
    '/projects/:id/manage/things': 'اشیا',
    '/projects/:id/manage/things/new': 'ساخت شی',
    '/projects/:id/manage/things/:tid': ':id',

    '/admin/global-codecs': 'قالب‌های عمومی',
    '/admin/global-codecs/new': 'ساخت قالب عمومی',
    '/admin/global-codecs/:id': ':id',

    '/things': 'لیست اشیا',
    '/things/edit': 'ویرایش شی',
    '/things/edit/$$': 'ویرایش شی',
    '/things/new': 'ایجاد شی',
    '/things/new/$$': 'ایجاد شی',
    '/things/excel': 'آپلود فایل Excel',
    '/things/excel/$$': 'آپلود فایل Excel',

    '/codec': 'ارسال کدک',
    '/codec/$$': 'ارسال کدک',
    '/scenario': 'ارسال سناریو',
    '/scenario/$$': 'ارسال سناریو',
    '/template': 'ارسال قالب',
    '/template/$$': 'ارسال قالب',

    '/gateways': 'لیست گذرگاه‌ها',
    '/gateways/new': 'افزودن گذرگاه',
    '/gateways/:id': ':id',

    '/device-profiles': 'لیست پروفایل اشیا',
    '/device-profiles/new': 'افزودن پروفایل اشیا',
    '/device-profiles/:id': ':id',

    '/packages': 'خرید بسته',
    '/transactions': 'تراکنش‌ها',

    '/admin': 'حوزه مدیریت',
    '/admin/packages': 'مدیریت بسته‌ها',
    '/admin/packages/new': 'افزودن بسته جدید',
    '/admin/packages/:id': ':id',

    '/admin/users': 'مدیریت کاربران سیستم',
    '/admin/users/:user': ':user',

    '/admin/transactions': 'مدیریت تراکنش‌های سیستم',
    '/admin/roles': 'مدیریت نقش‌ها',
    '/admin/links': 'سامانه‌های نظارتی',
    '/portals': 'مدیریت پرتال پرداخت'
};
export default routes
