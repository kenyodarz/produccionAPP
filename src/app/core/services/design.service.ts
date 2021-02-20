import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// Servicio Generico
import { CommonService } from 'src/app/core/services/common.service';
// Enviroment
import { API_URL } from 'src/environments/environment';
// Modelo
import { Design } from 'src/app/core/models/design';

@Injectable({
  providedIn: 'root'
})
export class DesignService extends CommonService<Design, string> {
  protected URL_API: string = `${API_URL}/designs`
  constructor(protected http: HttpClient) { super(http) }
}
