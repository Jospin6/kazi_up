export interface User {
    id: string;
    username: string;
    email: string;
    password?: string;
    accountType?: AccountType;
    role?: UserRole;
    avatar?: Uint8Array;
    location?: string;
    residencyCountry?: string;
    nationality?: string;
    gender?: string;
    website?: string;
    github?: string;
    twitter?: string;
    linkedin?: string;
    bio?: string;
    skills?: string;
    languages?: string;
    available?: string;
    timezone?: string;
    annualpay?: string;
    hourlypay?: string;
    companyId?: Company;
    jobs?: Job[];
    createdAt?: Date;
    updatedAt?: Date;
    UserActivity?: UserActivity[];
}

export interface Company {
    id: string;
    name: string;
    description?: string;
    logo?: string;
    website?: string;
    location?: string;
    industry?: string;
    foundedYear?: number;
    employees?: number;
    owner: User;
    ownerId: string;
    jobs?: Job[];
    createdAt?: Date;
    updatedAt?: Date;
}

export interface JobCategory {
    id: string;
    title: string;
    tags: string;
    jobs: Job[];
}

export interface EmploymentType {
    id: string;
    title: string;
    jobs: Job[];
}

export interface Job {
    id: string;
    position: string;
    companyName: string
    description: string;
    primaryTag: string;
    tags: string;
    jobRestricted: string;
    remote: string;
    companyLogo: Buffer;
    howToApply: string;
    salaryRange: string;
    website: string;
    jobCategoryId: string;
    employementTypeId: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface UserActivity {
    id: string;
    type: ActivityType;
    yearStart?: string;
    yearEnd?: string;
    title?: string;
    company?: string;
    url?: string;
    email?: string;
    description?: string;
    user: User;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
}

export enum UserRole {
    USER = "USER",
    ADMIN = "ADMIN",
    SUPERADMIN = "SUPERADMIN"
}

export enum AccountType {
    EMPLOYEE = "EMPLOYEE",
    COMPANY = "COMPANY"
}

export enum ActivityType {
    EXPERIENCE = "EXPERIENCE",
    EDUCATION = "EDUCATION",
    SIDE_PROJECT = "SIDE_PROJECT"
}