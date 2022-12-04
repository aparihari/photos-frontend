import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';

import { switchMap, tap } from 'rxjs/operators';

import { AppConfig, APP_CONFIG } from '../../../config/app-config.module';
import { User } from '../models/User';
import { LocalStorageService } from './local-storage.service';

export interface AuthResponse {
  user: User;
  tokens: {
    accessToken: string;
    refreshToken: string;
  };
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user$: any = new BehaviorSubject(null);

  constructor(
    private http: HttpClient,
    @Inject(APP_CONFIG) private config: AppConfig,
    private localStorageService: LocalStorageService
  ) {}

  public login(payload: {
    email: string;
    password: string;
  }): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${this.config.apiEndpoint}/auth/login`, payload)
      .pipe(
        tap((response) => {
          this.user$.next(response.user);
          this.setItem('accessToken', response.tokens.accessToken);
          this.setItem('refreshToken', response.tokens.refreshToken);
        })
      );
  }

  public signup(payload: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${this.config.apiEndpoint}/auth/signup`, payload)
      .pipe(
        tap((response) => {
          this.user$.next(response.user);
          this.setItem('accessToken', response.tokens.accessToken);
          this.setItem('refreshToken', response.tokens.refreshToken);
        })
      );
  }

  public logout(): void {
    this.user$.next(null);
    this.localStorageService.removeItem('accessToken');
    this.localStorageService.removeItem('refreshToken');
  }

  public refreshToken(): Observable<{
    accessToken: string;
    refreshToken: string;
  }> {
    const refreshToken = this.localStorageService.getItem('refreshToken');
    return this.http
      .post<{ accessToken: string; refreshToken: string }>(
        `${this.config.apiEndpoint}/token/refresh-token`,
        refreshToken
      )
      .pipe(
        tap((response) => {
          this.setItem('accessToken', response.accessToken);
          this.setItem('refreshToken', response.refreshToken);
        })
      );
  }

  public getCurrentUser(): Observable<User> {
    return this.user$.pipe(
      switchMap((user) => {
        // check if we already have user data
        if (user) {
          return of(user);
        }

        const accessToken = this.localStorageService.getItem('accessToken');
        // if there is token then fetch the current user
        if (accessToken) {
          return this.fetchCurrentUser();
        }

        return of(null);
      })
    );
  }

  public fetchCurrentUser(): Observable<User> {
    return this.http.get<User>(`${this.config.apiEndpoint}/user`).pipe(
      tap((response) => {
        // save data to this.user$
        this.user$.next(response);
        return response;
      })
    );
  }

  private setItem(key: string, token: string): void {
    this.localStorageService.setItem(key, token);
  }
}
