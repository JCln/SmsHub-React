export const role = [
    // { field: 'id', header: 'id' },
    { field: 'name', header: 'نام' },
    { field: 'title', header: 'عنوان' }
]
export const serverUser = [
    { field: 'username', header: 'نام کاربری' },
    { field: 'isAdmin', header: 'ادمین', isCheckbox: true },
    { field: 'createDateTime', header: 'تاریخ ایجاد' },
    { field: 'deleteDateTime', header: 'تاریخ حذف' },
    // { field: 'apiKeyHash', header: 'موبایل' }
];
export const templateCategory = [
    // { field: 'id', header: 'id' },
    { field: 'title', header: 'عنوان' },
    { field: 'description', header: 'توضیحات' },
]
export const provider = [
    { field: 'title', header: 'نام' },
    { field: 'website', header: 'وب سایت' },
    { field: 'defaultPreNumber', header: 'پیش شماره پیشفرض' },
    { field: 'batchSize', header: 'تعداد دسته' },
    { field: 'baseUri', header: 'آدرس' },
    { field: 'fallbackBaseUri', header: 'fallback' }
];
export const line = [
    // { field: 'id', header: 'id' },
    { field: 'number', header: 'تعداد' },
    { field: 'providerId', header: 'سرویس دهنده' },
];
export const consumerLine = [
    { field: 'title', header: 'نام' },
    { field: 'consumerId', header: 'کانفیگ' },
    { field: 'lineId', header: 'توضیحات' },
];
export const configTypeGroup = [
    { field: 'title', header: 'نام' },
    { field: 'configTypeId', header: 'کانفیگ' },
    { field: 'description', header: 'توضیحات' },
];
export const userLineGetByUserId = [
    // { field: 'id', header: '' },
    { field: 'lineId', header: 'شناسه خط' },
    { field: 'lineNumber', header: 'شماره خط' },
];
export const lineGetByUserId = [
    // { field: 'id', header: '' },
    { field: 'userId', header: 'کاربری' },
    { field: 'fullName', header: 'نام کامل' },
];
export const userAll = [
    { field: 'displayName', header: 'نام نمایشی' },
    { field: 'fullName', header: 'نام کامل' },
    { field: 'username', header: 'نام کاربری' },
    { field: 'mobile', header: 'موبایل' },
    { field: 'mobileConfirmed', header: 'موبایل تایید شده' },
    { field: 'hasTwoStepVerification', header: 'دومرحله ای' },
    { field: 'lockTimespan', header: 'قفل' },
    // { field: 'invalidLoginAttemptCount', header: '' }
    // { field: 'latestLoginDateTime', header: '' }
];

export const getGlobalFilterfields = () => {
    return userAll.map((item: { field: string; }) => item.field);
}
export const getGlobalFilterfieldsRole = () => {
    return role.map((item: { field: string; }) => item.field);
}
export const getGlobalFilterfieldsProvider = () => {
    return provider.map((item: { field: string; }) => item.field);
}
export const getGlobalFilterfieldsLine = () => {
    return provider.map((item: { field: string; }) => item.field);
}
export const getGlobalFilterfieldsTemplate = () => {
    return templateCategory.map((item: { field: string; }) => item.field);
}