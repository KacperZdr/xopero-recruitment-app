import { Routes } from '@angular/router';

import { UsersComponent } from './users/users.component';
import { AlbumsComponent } from './albums/albums.component';

export const routes: Routes = [
    {path: '', component: UsersComponent},
    {path: 'users', component: UsersComponent},
    {path: 'albums', component: AlbumsComponent},
];
