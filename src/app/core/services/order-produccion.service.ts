import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// Servicio Generico
import { CommonService } from 'src/app/core/services/common.service';
// Enviroment
import { API_URL } from 'src/environments/environment';
// Modelo
import { OrdenProduccion } from 'src/app/core/models/orden-produccion';
import { Observable } from 'rxjs';
import { Transformador } from '../models/transformador';

@Injectable({
  providedIn: 'root',
})
export class OrderProduccionService extends CommonService<
  OrdenProduccion,
  string
> {
  protected URL_API: string = `${API_URL}/ordenes`;
  constructor(protected http: HttpClient) {
    super(http);
  }

  obtenerSerie(): Observable<any> {
    return this.http.get<any>(`${this.URL_API}/serie`);
  }

  agregarTransformador(
    idOrdenProduccion: string,
    transformador: Transformador
  ): Observable<OrdenProduccion> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    return this.http.put<OrdenProduccion>(`${this.URL_API}/${idOrdenProduccion}/asignar-transformadores`, transformador, {headers: headers});
  }

  eliminarTransformador(
    idOrdenProduccion: string,
    transformador: Transformador
  ): Observable<OrdenProduccion> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    return this.http.put<OrdenProduccion>(`${this.URL_API}/${idOrdenProduccion}/eliminar-transformadores`, transformador, {headers: headers});
  }
}
