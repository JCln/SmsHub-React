export const Root = '/';
export const SMSHub = '/smshub';
export const role = '/smshub/role';
export const SendManager = '/smshub/sendManager';
export const line = '/smshub/line';
export const TwoStepVerification = '/login';
export const Sidebar = '/sidebar';
export const Announcement = '/announcement';
export const serveruser = '/smshub/serveruser';
export const userAll = '/smshub/userall';
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
        { field: 'SMSHub', header: 'خانه', icon: '', link: '/smshub' },
        { field: 'role', header: 'نقش ها', icon: '', link: '/smshub/role' },
        { field: 'SendManager', header: 'ارسال پیام', icon: '', link: '/smshub/sendManager' },
        { field: 'line', header: 'همه خطوط', icon: '', link: '/smshub/line' },
        { field: 'serveruser', header: 'کاربر سرور', icon: '', link: '/smshub/serveruser' },
        { field: 'userAll', header: 'همه کاربران', icon: '', link: '/smshub/userall' },
        { field: 'lineDynamic', header: 'اطلاعات خط', icon: '', link: 'line/' },
        { field: 'lineCreate', header: 'افزودن خط', icon: '', link: '/smshub/createLine' },
        { field: 'UserLineCreate', header: 'افزودن کاربر- خط', icon: '', link: '/smshub/createUserLine' },
        { field: 'userLineGetSearch', header: 'جستجو', icon: '', link: '/smshub/userLineSearch' },
        { field: 'templateCategroy', header: 'نمایش دسته‌بندی', icon: '', link: '/smshub/templateCategory' },
        { field: 'templateCategroyDynamic', header: 'اطلاعات دسته‌بندی', icon: '', link: 'templateCategory/' },
        { field: 'template', header: 'نمایش قالب', icon: '', link: '/smshub/templateCategory/template' },
        { field: 'templateCreate', header: 'افزودن قالب', icon: '', link: '/smshub/templateCreate' },
        { field: 'provider', header: 'سرویس دهندگان', icon: '', link: '/smshub/provider' },
        { field: 'consumerLine', header: '', icon: '', link: '/smshub/consumerLine' },
        { field: 'ConfigTypeGroup', header: 'تنظیم گروه', icon: '', link: '/smshub/ConfigTypeGroup' },
        { field: 'CCSend', header: 'ارسال مجدد', icon: '', link: '/smshub/ccsend' },
        { field: 'Permittedtime', header: 'بازه مجاز', icon: '', link: '/smshub/permittedTime' },
        { field: 'safeIP', header: 'IP مجاز', icon: '', link: '/smshub/safeIP' },
        { field: 'disallowedPhrase', header: 'کلمات غیرمجاز', icon: '', link: '/smshub/disallowedPhrase' },
    ]
}