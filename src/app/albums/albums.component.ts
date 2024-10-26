import { Component, inject, Inject, OnInit, input } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { HttpClient } from '@angular/common/http';
import {MatDividerModule} from '@angular/material/divider';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list'
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';


@Component({
  selector: 'app-albums',
  standalone: true,
  imports: [MatSidenavModule, MatListModule, MatIconModule, MatDividerModule, MatButtonModule, MatCardModule],
  templateUrl: './albums.component.html',
  styleUrl: './albums.component.scss'
})
export class AlbumsComponent implements OnInit {

http = inject(HttpClient)
albumList: any = [];
albumPhotosList: any = [];
filteredPhotosList: any = [];

ngOnInit(): void {
      this.fetchAlbums();
    }

fetchAlbums() {
      this.http.get('https://jsonplaceholder.typicode.com/albums')
      .subscribe((albumList: any) => {
        this.albumList = albumList;
      });
    }

  albumPhotos(id: any) {
      this.http.get('https://jsonplaceholder.typicode.com/photos')
      .subscribe((albumPhotosList: any) => {
        this.albumPhotosList = albumPhotosList;
        this.filteredPhotosList = this.albumPhotosList.filter((album: { albumId: number; }) => album.albumId == id);
      });
    }


}

