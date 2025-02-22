import { Input } from './../components/Input';
import { ColumnMetaS, ENCellTypes } from './../constants/interface';

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
export const template = [
    // { field: 'id', header: 'id' },
    { field: 'title', header: 'عنوان', types: ENCellTypes.inputs },
    { field: 'expression', header: 'عبارت', types: ENCellTypes.inputs },
    { field: 'templateCategoryId', header: 'دسته‌بندی', types: ENCellTypes.inputs },
    { field: 'isActive', header: 'فعال', types: ENCellTypes.booleans },
    { field: 'minCredit', header: 'حداقل اعتبار', types: ENCellTypes.inputs },
    { field: 'configTypeGroupId', header: 'گروه دسته‌بندی', types: ENCellTypes.inputs }
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
    { field: 'dynamicId', header: 'سرویس دهنده' },
    // { field: 'providerId', header: 'سرویس دهنده' },
];
export const consumerLine = [
    { field: 'title', header: 'نام' },
    { field: 'consumerId', header: 'کانفیگ' },
    { field: 'lineId', header: 'توضیحات' },
];
export const configTypeGroup = [
    { field: 'title', header: 'نام' },
    { field: 'description', header: 'توضیحات' },
];
export const ccSend: ColumnMetaS[] = [
    { field: 'mobile', header: 'موبایل', types: ENCellTypes.inputs },
    // { field: 'dynamicId', header: 'گروه دسته‌بندی', types: ENCellTypes.dropdowns },
    { field: 'configTypeGroupId', header: 'گروه دسته‌بندی', types: ENCellTypes.dropdowns },
];
export const permittedTime: ColumnMetaS[] = [
    { field: 'fromTime', header: 'از زمان', types: ENCellTypes.inputs },
    { field: 'toTime', header: 'تا زمان', types: ENCellTypes.inputs },
    { field: 'configTypeGroupId', header: 'گروه دسته‌بندی', types: ENCellTypes.dropdowns },
    // { field: 'dynamicId', header: 'گروه دسته‌بندی', types: ENCellTypes.dropdowns },
];
export const consumerSafeIp: ColumnMetaS[] = [
    { field: 'dynamicId', header: 'کاربر', types: ENCellTypes.dropdowns },
    { field: 'fromIp', header: 'از IP', types: ENCellTypes.inputs },
    { field: 'toIp', header: 'تا IP', types: ENCellTypes.inputs },
    { field: 'isV6', header: 'تا IP', types: ENCellTypes.booleans },
    // { field: 'consumerId', header: 'گروه دسته‌بندی', types: ENCellTypes.dropdowns },
];
export const disallowedPhrase: ColumnMetaS[] = [
    { field: 'phrase', header: 'کلمه', types: ENCellTypes.inputs },
    { field: 'configTypeGroupId', header: 'گروه دسته‌بندی', types: ENCellTypes.dropdowns },
    // { field: 'dynamicId', header: 'گروه دسته‌بندی', types: ENCellTypes.dropdowns },
];
export const userLineGetByUserId = [
    // { field: 'id', header: '' },
    { field: 'lineId', header: 'شناسه خط' },
    { field: 'lineNumber', header: 'شماره خط' },
];
export const lineGetByUserId = [
    // { field: 'id', header: '' },
    // { field: 'userId', header: 'کاربری' },
    { field: 'fullName', header: 'نام کامل' },
];
export const userAll = [
    { field: 'displayName', header: 'نام نمایشی', types: ENCellTypes.inputs },
    { field: 'fullName', header: 'نام کامل', types: ENCellTypes.inputs },
    { field: 'username', header: 'نام کاربری', types: ENCellTypes.inputs },
    { field: 'mobile', header: 'موبایل', types: ENCellTypes.inputs },
    { field: 'mobileConfirmed', header: 'موبایل تایید شده', types: ENCellTypes.booleans },
    { field: 'hasTwoStepVerification', header: 'دومرحله ای', types: ENCellTypes.booleans },
    { field: 'lockTimespan', header: 'قفل', types: ENCellTypes.inputs },
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
    return line.map((item: { field: string; }) => item.field);
}
export const getGlobalFilterfieldsTemplateCategory = () => {
    return templateCategory.map((item: { field: string; }) => item.field);
}
export const getGlobalFilterfieldsTemplate = () => {
    return template.map((item: { field: string; }) => item.field);
}
export const getGlobalFilterfieldsConfigTypeGroup = () => {
    return configTypeGroup.map((item: { field: string; }) => item.field);
}
export const getGlobalFilterfieldsCcSend = () => {
    return ccSend.map((item: { field: string; }) => item.field);
}
export const getGlobalFilterfieldsPermittedTime = () => {
    return permittedTime.map((item: { field: string; }) => item.field);
}
export const getGlobalFilterfieldsSafeIp = () => {
    return consumerSafeIp.map((item: { field: string; }) => item.field);
}
export const getGlobalFilterfieldsDisallowedPhrase = () => {
    return disallowedPhrase.map((item: { field: string; }) => item.field);
}