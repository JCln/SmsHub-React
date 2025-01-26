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
    { field: 'name', header: 'نام' },
    { field: 'title', header: 'عنوان' }
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
export const userAll = [
    { field: 'displayName', header: 'نام نمایشی' },
    { field: 'fullName', header: 'نام کامل' },
    { field: 'username', header: 'نام کاربری' },
    { field: 'mobile', header: 'موبایل' }
];