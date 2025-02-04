import { Role } from "./role.model";

export interface Usuario {
    id: number;
    nome: string;
    username: string;
    password: string;
    roles: Role[];
}