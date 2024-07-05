import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { BrowseComponent } from './pages/browse/browse.component';
import { MoviesComponent } from './pages/movies/movies.component';  
import { SavedComponent } from './pages/saved/saved.component';  
import { SingledataComponent } from './pages/singledata/singledata.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'browse', component: BrowseComponent },
  { path: 'home', component: BrowseComponent },
  { path: 'movies', component: MoviesComponent },
  { path: 'my_list', component: SavedComponent },
  { path: 'detail/:id', component: SingledataComponent },  // Add detail route
];