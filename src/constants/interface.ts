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