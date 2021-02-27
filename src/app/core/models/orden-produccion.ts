import { Modelo } from "./modelo"
import { Transformador } from "./transformador";

export class OrdenProduccion {
  constructor(
    public idProductionOrder: string = null,
    public numeroOrden: string = null,
    public description: string = null,
    public cantidad: string= null,
    public createAt: Date = null,
    public inProduction: boolean = null,
    public modelo: Modelo = null,
    public transformadores: Array<Transformador> = null,
  ){}
}
