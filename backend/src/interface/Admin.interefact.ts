export interface AdminIn{
    userName: string;
    password: string;
    email: string;
    role?: string;
    phone?: string;
    profile?: string;
    _id: string;
    id: string;
    __v: number;
    createdAt: Date;
    updatedAt: Date;
    isActive:boolean;
}