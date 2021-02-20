import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// Servicio Generico
import { CommonService } from 'src/app/core/services/common.service';
// Enviroment
import { API_URL } from 'src/environments/environment';
// Modelo
import { Modelo } from "src/app/core/models/modelo";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ModeloService extends CommonService<Modelo, String> {
  protected URL_API: string = `${API_URL}/modelos`;
  constructor(protected http: HttpClient) { super(http); }

  obtenerModeloConStock(): Observable<Modelo[]> {
    return this.http.get<Modelo[]>(`${this.URL_API}/with-stock`);
  }
}
