import { Veiculo } from './veiculo';

export class Empresa {
    id: number
    cnpj: number
    email: string
    nome: string
    telefone: string
    recefitur: string
    veiculos: Array<Veiculo>

    constructor(id: number, cnpj: number, email: string, nome: string, telefone: string, recefitur: string, veiculos: Array<Veiculo>) {
        this.id = id;
        this.cnpj = cnpj;
        this.email = email;
        this.nome = nome;
        this.telefone = telefone;
        this.recefitur = recefitur;
        this.veiculos = veiculos;
    }
}