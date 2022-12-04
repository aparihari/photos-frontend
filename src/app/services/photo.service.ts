import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

import { AppConfig, APP_CONFIG } from '../config/app-config.module';
import { Photo } from '@app/modules/core/models/Photo';

@Injectable({
  providedIn: 'root',
})
export class PhotoService {
  constructor(
    private http: HttpClient,
    @Inject(APP_CONFIG) private config: AppConfig
  ) {}

  public getPhotos(): Observable<Array<Photo>> {
    return this.http.get<Array<Photo>>(`${this.config.apiEndpoint}/photo`).pipe(
      tap((response) => {
        return response;
      })
    );
  }

  public uploadPhoto(payload: any): Observable<Array<Photo>> {
    const body = new FormData();
    body.append('photo', payload);

    return this.http
      .post<any>(`${this.config.apiEndpoint}/photo`, body)
      .pipe(switchMap(() => this.getPhotos()));
  }

  public deletePhoto(photo: Photo): Observable<Array<Photo>> {
    return this.http
      .delete(`${this.config.apiEndpoint}/photo`, {
        body: { id: photo.id, userId: photo.userId },
      })
      .pipe(switchMap(() => this.getPhotos()));
  }
}
