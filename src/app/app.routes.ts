import { Routes } from '@angular/router';
import { GalleryComponent } from './components/gallery/gallery.component';
import { UploadFormComponent } from './components/upload-form/upload-form.component';

export const routes: Routes = [
  { path: '', redirectTo: 'gallery', pathMatch: 'full' },
  { path: 'upload', component: UploadFormComponent },
  { path: 'gallery', component: GalleryComponent },
];
