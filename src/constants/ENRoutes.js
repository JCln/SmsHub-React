export const Root = '/';
export const SMSHub = '/smshub';
export const role = '/smshub/role';
export const SendManager = '/smshub/sendManager';
export const TwoStepVerification = '/login';
export const Sidebar = '/sidebar';
export const Announcement = '/announcement';
export const serveruser = '/smshub/serveruser';
export const userAll = '/smshub/userall';
export const line = '/smshub/line';
export const lineDynamic = 'line/*';
export const lineCreate = '/smshub/createLine';
export const UserLineCreate = '/smshub/createUserLine';
export const userLineGetSearch = '/smshub/userLineSearch';
export const templateCategroy = '/smshub/templateCategory';
export const templateCategroyDynamic = 'templateCategory/*';
export const template = '/smshub/templateCategory/template';
export const templateCreate = '/smshub/templateCreate';
export const provider = '/smshub/provider';
export const consumerLine = '/smshub/consumerLine';
export const ConfigTypeGroup = '/smshub/ConfigTypeGroup';
export const CCSend = '/smshub/ccsend';
export const Permittedtime = '/smshub/permittedTime';
export const safeIP = '/smshub/safeIP';
export const disallowedPhrase = '/smshub/disallowedPhrase';

export const getRoutesAndOptions = () => {
    return [
        { field: 'SMSHub', header: 'خانه', icon: '', link: SMSHub },
        { field: 'role', header: 'نقش ها', icon: '', link: role },
        { field: 'SendManager', header: 'ارسال پیام', icon: '', link: SendManager },
        { field: 'line', header: 'همه خطوط', icon: '', link: line },
        { field: 'serveruser', header: 'کاربر سرور', icon: '', link: serveruser },
        { field: 'userAll', header: 'همه کاربران', icon: '', link: userAll },
        { field: 'lineDynamic', header: 'اطلاعات خط', icon: '', link: 'line/' },
        { field: 'lineCreate', header: 'افزودن خط', icon: '', link: lineCreate },
        { field: 'UserLineCreate', header: 'افزودن کاربر- خط', icon: '', link: UserLineCreate },
        { field: 'userLineGetSearch', header: 'جستجو', icon: '', link: userLineGetSearch },
        { field: 'templateCategroy', header: 'نمایش دسته‌بندی', icon: '', link: templateCategroy },
        { field: 'templateCategroyDynamic', header: 'اطلاعات دسته‌بندی', icon: '', link: 'templateCategory/' },
        { field: 'template', header: 'نمایش قالب', icon: '', link: template },
        { field: 'templateCreate', header: 'افزودن قالب', icon: '', link: templateCreate },
        { field: 'provider', header: 'سرویس دهندگان', icon: '', link: provider },
        { field: 'consumerLine', header: '', icon: '', link: consumerLine },
        { field: 'ConfigTypeGroup', header: 'تنظیم گروه', icon: '', link: ConfigTypeGroup },
        { field: 'CCSend', header: 'ارسال مجدد', icon: '', link: CCSend },
        { field: 'Permittedtime', header: 'بازه مجاز', icon: '', link: Permittedtime },
        { field: 'safeIP', header: 'IP مجاز', icon: '', link: safeIP },
        { field: 'disallowedPhrase', header: 'کلمات غیرمجاز', icon: '', link: disallowedPhrase },
    ]
}
export const adminSidebar = () => {
    return [
        {
            field: '', header: 'خانه', icon: 'pi pi-home', link: SMSHub, hasIcon: true, hasSubRoutes: false
        },
        {
            field: '', header: 'کاربران', icon: 'user1.png', link: SMSHub, hasIcon: false, hasSubRoutes: true, subRoutes: [
                { field: 'userAll', header: 'همه کاربران', icon: '', link: userAll },
                { field: 'role', header: 'نقش ها', icon: '', link: role },
            ]
        },
        {
            field: '', header: 'خطوط', icon: 'simcrd.png', link: SMSHub, hasIcon: false, hasSubRoutes: true, subRoutes: [
                { field: 'line', header: 'همه خطوط', icon: '', link: line },
                { field: 'lineCreate', header: 'افزودن خط', icon: '', link: lineCreate },
                { field: 'UserLineCreate', header: 'افزودن کاربر- خط', icon: '', link: UserLineCreate },
                { field: 'userLineGetSearch', header: 'جستجو', icon: '', link: userLineGetSearch },
            ]
        },
        {
            field: '', header: 'سرویس دهندگان', icon: 'pi pi-building', link: provider, hasIcon: true, hasSubRoutes: false
        },
        {
            field: '', header: 'تنظیمات', icon: 'setting.png', link: SMSHub, hasIcon: false, hasSubRoutes: true, subRoutes: [
                { field: 'ConfigTypeGroup', header: 'تنظیم گروه', icon: '', link: ConfigTypeGroup },
                { field: 'CCSend', header: 'ارسال مجدد', icon: '', link: CCSend },
                { field: 'Permittedtime', header: 'بازه مجاز', icon: '', link: Permittedtime },
                { field: 'safeIP', header: 'IP مجاز', icon: '', link: safeIP },
                { field: 'disallowedPhrase', header: 'کلمات غیرمجاز', icon: '', link: disallowedPhrase },
            ]
        },
        {
            field: '', header: 'ارسال', icon: 'message.png', link: SendManager, hasIcon: false, hasSubRoutes: false
        },
        {
            field: '', header: 'قالب', icon: 'message2.png', link: SMSHub, hasIcon: false, hasSubRoutes: true, subRoutes: [
                { field: 'templateCategroy', header: 'نمایش دسته‌بندی', icon: '', link: templateCategroy },
                { field: 'template', header: 'نمایش قالب', icon: '', link: template },
                { field: 'templateCreate', header: 'افزودن قالب', icon: '', link: templateCreate },
            ]
        },
        // {
        //     field: '', header: 'گزارش ها', icon: 'report.png', link: '', hasIcon: false, hasSubRoutes: false
        // },
        // {
        //     field: '', header: 'توسعه دهندگان', icon: 'developer.png', link: '', hasIcon: false, hasSubRoutes: false
        // },
        // {
        //     field: '', header: 'ثبت نشان', icon: 'refresh.png', link: '', hasIcon: false, hasSubRoutes: false
        // },
    ]
}
export const simpleUserSidebar = () => {
    return [
        {
            field: '', header: 'خانه', icon: 'pi pi-home', link: SMSHub, hasIcon: true, hasSubRoutes: false
        },
        {
            field: '', header: 'خطوط', icon: 'simcrd.png', link: SMSHub, hasIcon: false, hasSubRoutes: true, subRoutes: [
                { field: 'line', header: 'همه خطوط', icon: '', link: line },
                { field: 'lineCreate', header: 'افزودن خط', icon: '', link: lineCreate },
                { field: 'UserLineCreate', header: 'افزودن کاربر- خط', icon: '', link: UserLineCreate },
                { field: 'userLineGetSearch', header: 'جستجو', icon: '', link: userLineGetSearch },
            ]
        },
        {
            field: '', header: 'سرویس دهندگان', icon: 'pi pi-building', link: provider, hasIcon: true, hasSubRoutes: false
        },
        {
            field: '', header: 'ارسال', icon: 'message.png', link: SendManager, hasIcon: false, hasSubRoutes: false
        }
    ]
}
export const getSidebar = (role) => {
    if (role === 'admin' || role === 'Programmer') {
        return adminSidebar();
    }
    return simpleUserSidebar();

}