export class Veiculo {
    id: number
    capacidade: number
    modelo: string
    placa: string

    constructor(id: number, capacidade: number, modelo: string, placa: string) {
        this.id = id;
        this.capacidade = capacidade;
        this.modelo = modelo;
        this.placa = placa;
    }
}