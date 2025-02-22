export enum ENCellTypes {
    inputs = 'input',
    dropdowns = 'dropdown',
    booleans = 'boolean'
}
export interface ColumnMeta {
    field: string;
    header: string;
}
export interface ColumnMetaS {
    field: string;
    header: string;
    types: ENCellTypes;
}
export interface IRole {
    id: string;
    name: string;
    title: string
}
export interface ILoginForm {
    username: string,
    password: string,
    clientDateTime: string,
    appVersion: string,
    captchaText: string,
    captchaInputText: string
}
export interface IUserAll {
    id: string,
    fullName: string,
    displayName: string,
    username: string,
    mobile: string,
    roleIds: number[],
    mobileConfirmed: boolean,
    hasTwoStepVerification: boolean,
    invalidLoginAttemptCount: number,
    latestLoginDateTime: string,
    lockTimespan: string
}

export interface ITableOutput {
    dataSource: any,
    columns: any,
    fileName: string,
    onClicked?: any,
    hasClick: boolean,
    tableRefresh: any,
}
export interface IProvider {
    id?: number,
    title: string,
    website: string,
    defaultPreNumber: number | null,
    batchSize: number | null,
    baseUri: string,
    fallbackBaseUri: string,
    credentialTemplate: string
}
export interface ITableHeader {
    dataSource: any,
    visibleColumns: any,
    setVisibleColumns: any,
    filters: any,
    setFilters: any,
    option: any,
    fileName: any,
    onClicked?: any
    hasClick: boolean,
    tableRefresh: any,
    hasOutput?: boolean
}
export interface ILine {
    id?: number,
    dynamicId?: any,
    providerId: number,
    number: string,
    credential: string,
}
export interface IConsumerSafeIp {
    dynamicId?: any,
    consumerId: number,
    fromIp: string,
    toIp: string,
    isV6: boolean
}
export interface ICreateUserLineDto {
    lineId: number,
    userId: string,
}
export interface ITemplateCategoryDTO {
    id?: number,
    title: string,
    description: string
}
export interface ITemplateDTO {
    id?: number,
    expression: string,
    title: string,
    templateCategoryId: number,
    isActive: boolean,
    minCredit: number,
    configTypeGroupId: number
}
export interface IConfigeTypeGroupDTO {
    id?: number,
    title: string,
    description: string
}
export interface ICcSend {
    id?: number,
    mobile: string,
    configTypeGroupId: number
    dynamicId?: any
}
export interface IPermittedTime {
    id?: number,
    configTypeGroupId: number
    dynamicId?: any
    fromTime: string,
    toTime: string
}
export interface IDisallowedPhrase {
    id?: number,
    configTypeGroupId: number
    dynamicId?: any
    phrase: string
}
export interface ISendManagerDTO {
    id?: number,
    text: any
}
export interface IUserClaims {
    givenName: string,
    role: string
}