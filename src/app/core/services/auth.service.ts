import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
/* RxJS */
import { Observable } from 'rxjs';
/* Environment */
import { API_URL } from 'src/environments/environment';

const AUTH_API = `${API_URL}/auth`;
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(credenciales: any): Observable<any> {
    return this.http.post(
      `${AUTH_API}/signin`,
      {
        username: credenciales.username,
        password: credenciales.password,
      },
      httpOptions
    );
  }

  register(user: any): Observable<any> {
    return this.http.post(
      `${AUTH_API}/signup`,
      {
        username: user.username,
        name: user.name,
        email: user.email,
        password: user.password,
      },
      httpOptions
    );
  }
}
