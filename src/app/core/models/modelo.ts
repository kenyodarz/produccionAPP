import { Design } from "./design"

export class Modelo {
  constructor(
    public idModelo: string = null,
    public nombreModelo: string = null,
    public kva:number = null,
    public fase:number = null,
    public peso:number = null,
    public cantidadAceite:number = null,
    public tipoAceite: string = null,
    public tipoTransformador: string = null,
    public stock:number = null,
    public design: Design =null
  ){}
}
