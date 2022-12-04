import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';
import { share } from 'rxjs/operators';

import { Photo } from '@app/modules/core/models/Photo';
import { AuthService } from '@app/modules/core/services/auth.service';
import { PhotoService } from '@app/services/photo.service';
import { User } from '@app/modules/core/models/User';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  photo!: any;
  photos: Array<Photo> = [];
  user$!: Observable<User>;

  constructor(
    private photoService: PhotoService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.photoService.getPhotos().subscribe((photos) => {
      this.photos = photos.map((photo: Photo) => ({
        ...photo,
        data: `data:image/jpg;base64, ${photo.data}`,
      }));
    });

    this.user$ = this.authService.getCurrentUser().pipe(share());
  }

  public logout() {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }

  public upload(event: any) {
    this.photo = event.target.files.item(0);
    this.photoService.uploadPhoto(this.photo).subscribe((photos) => {
      this.photos = photos.map((photo: Photo) => ({
        ...photo,
        data: `data:image/jpg;base64, ${photo.data}`,
      }));
    });
  }

  public delete(photo: Photo) {
    this.photoService.deletePhoto(photo).subscribe((photos) => {
      this.photos = photos.map((photo: Photo) => ({
        ...photo,
        data: `data:image/jpg;base64, ${photo.data}`,
      }));
    });
  }
}
