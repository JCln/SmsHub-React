export const ENRoutes = {
    Root: '/',
    SMSHub: '/sms-hub',
    role: '/sms-hub/role',
    SendManager: '/sms-hub/sendManager',
    TwoStepVerification: '/login',
    Sidebar: '/sidebar',
    Announcement: '/announcement',
    serveruser: '/sms-hub/serveruser',
    userAll: '/sms-hub/userall',
    line: '/sms-hub/line',
    lineDynamic: 'line/*',
    lineCreate: '/sms-hub/createLine',
    UserLineCreate: '/sms-hub/createUserLine',
    userLineGetSearch: '/sms-hub/userLineSearch',
    templateCategroy: '/sms-hub/templateCategory',
    templateCategroyDynamic: 'templateCategory/*',
    template: '/sms-hub/templateCategory/template',
    templateCreate: '/sms-hub/templateCreate',
    provider: '/sms-hub/provider',
    consumerLine: '/sms-hub/consumerLine',
    ConfigTypeGroup: '/sms-hub/ConfigTypeGroup',
    CCSend: '/sms-hub/ccsend',
    Permittedtime: '/sms-hub/permittedTime',
    safeIP: '/sms-hub/safeIP',
    disallowedPhrase: '/sms-hub/disallowedPhrase',
}

export const getRoutesAndOptions = () => {
    return [
        { field: 'sms-hub', header: 'خانه', icon: '', link: ENRoutes.SMSHub },
        { field: 'role', header: 'نقش ها', icon: '', link: ENRoutes.role },
        { field: 'SendManager', header: 'ارسال پیام', icon: '', link: ENRoutes.SendManager },
        { field: 'line', header: 'همه خطوط', icon: '', link: ENRoutes.line },
        { field: 'serveruser', header: 'کاربر سرور', icon: '', link: ENRoutes.serveruser },
        { field: 'userAll', header: 'همه کاربران', icon: '', link: ENRoutes.userAll },
        { field: 'lineDynamic', header: 'اطلاعات خط', icon: '', link: ENRoutes.line },
        { field: 'lineCreate', header: 'افزودن خط', icon: '', link: ENRoutes.lineCreate },
        { field: 'UserLineCreate', header: 'افزودن کاربر- خط', icon: '', link: ENRoutes.UserLineCreate },
        { field: 'userLineGetSearch', header: 'جستجو', icon: '', link: ENRoutes.userLineGetSearch },
        { field: 'templateCategroy', header: 'نمایش دسته‌بندی', icon: '', link: ENRoutes.templateCategroy },
        { field: 'templateCategroyDynamic', header: 'اطلاعات دسته‌بندی', icon: '', link: ENRoutes.templateCategory },
        { field: 'template', header: 'نمایش قالب', icon: '', link: ENRoutes.template },
        { field: 'templateCreate', header: 'افزودن قالب', icon: '', link: ENRoutes.templateCreate },
        { field: 'provider', header: 'سرویس دهندگان', icon: '', link: ENRoutes.provider },
        { field: 'consumerLine', header: '', icon: '', link: ENRoutes.consumerLine },
        { field: 'ConfigTypeGroup', header: 'تنظیم گروه', icon: '', link: ENRoutes.ConfigTypeGroup },
        { field: 'CCSend', header: 'ارسال مجدد', icon: '', link: ENRoutes.CCSend },
        { field: 'Permittedtime', header: 'بازه مجاز', icon: '', link: ENRoutes.Permittedtime },
        { field: 'safeIP', header: 'IP مجاز', icon: '', link: ENRoutes.safeIP },
        { field: 'disallowedPhrase', header: 'کلمات غیرمجاز', icon: '', link: ENRoutes.disallowedPhrase },
    ]
}
export const adminSidebar = () => {
    return [
        {
            field: '', header: 'خانه', icon: 'pi pi-home', link: ENRoutes.SMSHub, hasIcon: true, hasSubRoutes: false
        },
        {
            field: '', header: 'کاربران', icon: 'user1.png', link: ENRoutes.SMSHub, hasIcon: false, hasSubRoutes: true, subRoutes: [
                { field: 'userAll', header: 'همه کاربران', icon: '', link: ENRoutes.userAll },
                { field: 'role', header: 'نقش ها', icon: '', link: ENRoutes.role },
            ]
        },
        {
            field: '', header: 'خطوط', icon: 'simcrd.png', link: ENRoutes.SMSHub, hasIcon: false, hasSubRoutes: true, subRoutes: [
                { field: 'line', header: 'همه خطوط', icon: '', link: ENRoutes.line },
                { field: 'lineCreate', header: 'افزودن خط', icon: '', link: ENRoutes.lineCreate },
                { field: 'UserLineCreate', header: 'افزودن کاربر- خط', icon: '', link: ENRoutes.UserLineCreate },
                { field: 'userLineGetSearch', header: 'جستجو', icon: '', link: ENRoutes.userLineGetSearch },
            ]
        },
        {
            field: '', header: 'سرویس دهندگان', icon: 'pi pi-building', link: ENRoutes.provider, hasIcon: true, hasSubRoutes: false
        },
        {
            field: '', header: 'تنظیمات', icon: 'setting.png', link: ENRoutes.SMSHub, hasIcon: false, hasSubRoutes: true, subRoutes: [
                { field: 'ConfigTypeGroup', header: 'تنظیم گروه', icon: '', link: ENRoutes.ConfigTypeGroup },
                { field: 'CCSend', header: 'ارسال مجدد', icon: '', link: ENRoutes.CCSend },
                { field: 'Permittedtime', header: 'بازه مجاز', icon: '', link: ENRoutes.Permittedtime },
                { field: 'safeIP', header: 'IP مجاز', icon: '', link: ENRoutes.safeIP },
                { field: 'disallowedPhrase', header: 'کلمات غیرمجاز', icon: '', link: ENRoutes.disallowedPhrase },
            ]
        },
        {
            field: '', header: 'ارسال', icon: 'message.png', link: ENRoutes.SendManager, hasIcon: false, hasSubRoutes: false
        },
        {
            field: '', header: 'قالب', icon: 'message2.png', link: ENRoutes.SMSHub, hasIcon: false, hasSubRoutes: true, subRoutes: [
                { field: 'templateCategroy', header: 'نمایش دسته‌بندی', icon: '', link: ENRoutes.templateCategroy },
                { field: 'template', header: 'نمایش قالب', icon: '', link: ENRoutes.template },
                { field: 'templateCreate', header: 'افزودن قالب', icon: '', link: ENRoutes.templateCreate },
            ]
        },
        // {
        //     field: '', header: 'گزارش ها', icon: 'report.png', link: ENRoutes.'', hasIcon: false, hasSubRoutes: false
        // },
        // {
        //     field: '', header: 'توسعه دهندگان', icon: 'developer.png', link: ENRoutes.'', hasIcon: false, hasSubRoutes: false
        // },
        // {
        //     field: '', header: 'ثبت نشان', icon: 'refresh.png', link: ENRoutes.'', hasIcon: false, hasSubRoutes: false
        // },
    ]
}
export const simpleUserSidebar = () => {
    return [
        {
            field: '', header: 'خانه', icon: 'pi pi-home', link: ENRoutes.SMSHub, hasIcon: true, hasSubRoutes: false
        },
        {
            field: '', header: 'خطوط', icon: 'simcrd.png', link: ENRoutes.SMSHub, hasIcon: false, hasSubRoutes: true, subRoutes: [
                { field: 'line', header: 'همه خطوط', icon: '', link: ENRoutes.line },
                { field: 'lineCreate', header: 'افزودن خط', icon: '', link: ENRoutes.lineCreate },
                { field: 'UserLineCreate', header: 'افزودن کاربر- خط', icon: '', link: ENRoutes.UserLineCreate },
                { field: 'userLineGetSearch', header: 'جستجو', icon: '', link: ENRoutes.userLineGetSearch },
            ]
        },
        {
            field: '', header: 'سرویس دهندگان', icon: 'pi pi-building', link: ENRoutes.provider, hasIcon: true, hasSubRoutes: false
        },
        {
            field: '', header: 'ارسال', icon: 'message.png', link: ENRoutes.SendManager, hasIcon: false, hasSubRoutes: false
        }
    ]
}
export const getSidebar = (role) => {
    if (role === 'admin' || role === 'Programmer') {
        return adminSidebar();
    }
    return simpleUserSidebar();

}