type FormType = 'login' | 'register';

export type User = {
    id: string;
    name: string;
    email: string;
}


export type Question = {
    id: string;
    title: string;
    body: string
    answers: Answers[];
    createdAt: string;
    updatedAt: string;
    user: User
}


export type Answers = {
    id: string;
    body: string;
    createdAt: string;
    updatedAt: string;
    user: User;
}
