import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// Servicio Generico
import { CommonService } from 'src/app/core/services/common.service';
// Enviroment
import { API_URL } from 'src/environments/environment';
// Modelo
import { Transformador } from '../models/transformador';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TransformadorService extends CommonService<Transformador, string> {
  protected URL_API: string = `${API_URL}/transformadores`;
  constructor(protected http: HttpClient) { super(http); }

  obtenerTranformacionTerminados(): Observable<Transformador[]>{
    return this.http.get<Transformador[]>(`${this.URL_API}/terminados`);
  }
}
