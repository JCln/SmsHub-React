export interface ColumnMeta {
    field: string;
    header: string;
}
export interface IRole {
    id: string;
    name: string;
    title: string
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
export interface IProvider {
    id: number,
    title: string,
    website: string,
    defaultPreNumber: number | null,
    batchSize: number | null,
    baseUri: string,
    fallbackBaseUri: string,
    credentialTemplate: string
}
export interface ILine {
    id?: number,
    providerId: number,
    number: string,
    credential: string,
}