import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { TokenService } from "./token.service";
import { ILogin, ILoginResponse, IRegister } from "../models/auth.model";
import { apiEndpoint } from "../constants/constants";
import { map } from "rxjs";
import { response } from "express";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  constructor(private http: HttpClient, private tokenService: TokenService) {}

  onRegister(data: IRegister) {
    return this.http
      .post<ILoginResponse>(`${apiEndpoint.AuthEndpoint.register}`, data)
      .pipe(
        map((response) => {
          if (response) {
            this.tokenService.setToken(response.token);
          }
          return response;
        })
      );
  }

  onLogin(data: ILogin) {
    return this.http
      .post<ILoginResponse>(`${apiEndpoint.AuthEndpoint.login}`, data)
      .pipe(
        map((response) => {
          if (response) {
            this.tokenService.setToken(response.token);
          }
          return response;
        })
      );
  }

  onLogout() {
    this.http.get(`${apiEndpoint.AuthEndpoint.logout}`).subscribe({
      next: (response) => {
        this.tokenService.removeToken();
      },
    });
  }
}
