import { Modelo } from './modelo';

export class Transformador {
  constructor(
    public numeroSerieInterno: string = null,
    public numeroSerie: string = null,
    public kva: number = null,
    public fase: number = null,
    public peso: number = null,
    public cantidadAceite: number = null,
    public tipoAceite: string = null,
    public tipoTransformador: string = null,
    public fecha: number = null,
    public nominalPosition: number = null,
    public modelo: Modelo = null,
    public createAt: Date = null,
    public inProduction: boolean = null,
    public cliente: string = null
  ) {}
}
