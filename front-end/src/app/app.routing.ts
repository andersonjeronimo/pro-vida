import  { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from "app/home/home.component";
import { AudioComponent } from "app/audio/audio.component";
import { BooksComponent } from "app/books/books.component";
import { ImagesComponent } from "app/images/images.component";
import { VideoComponent } from "app/video/video.component";
import { ArticlesComponent } from "app/articles/articles.component";

const APP_ROUTES: Routes = [
    { path: '', component: HomeComponent },
    { path: 'artigos', component: ArticlesComponent },
    { path: 'audios', component: AudioComponent },
    { path: 'livros', component: BooksComponent },
    { path: 'imagens', component: ImagesComponent },
    { path: 'videos', component: VideoComponent }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(APP_ROUTES);