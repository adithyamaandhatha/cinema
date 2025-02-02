// // import { NgModule } from '@angular/core';
// import { BrowserModule } from '@angular/platform-browser';
// import {  HttpClientModule } from '@angular/common/http';
// import { AppRoutingModule } from './app-routing.module';
// import { AppComponent } from './app.component';
// import { MovieListComponent } from './movie-list/movie-list.component';
// import { MovieAddComponent } from './movie-add/movie-add.component';
// import { MovieEditComponent } from './movie-edit/movie-edit.component';
// import { MovieViewComponent } from './movie-view/movie-view.component';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { RouterModule } from '@angular/router';
// import { NgModule } from '@angular/core';

// @NgModule({
//   declarations: [
//     AppComponent,
//     MovieListComponent,
//     MovieAddComponent,
//     MovieEditComponent,
//     MovieViewComponent
//   ],
//   imports: [
//     BrowserModule,
//     AppRoutingModule,
//     NgModule,
//     ReactiveFormsModule,
//     HttpClientModule,
//     // HttpClient,
//     FormsModule,
//     RouterModule

//   ],
//   providers: [],
//   bootstrap: [AppComponent]
// })
// export class AppModule { }
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { MovieListComponent } from './movie-list/movie-list.component';
import { MovieAddComponent } from './movie-add/movie-add.component';
import { MovieEditComponent } from './movie-edit/movie-edit.component';
import { MovieViewComponent } from './movie-view/movie-view.component';
import { PpPipe } from './pp.pipe';

@NgModule({
  declarations: [
    AppComponent,
    MovieListComponent,
    MovieAddComponent,
    MovieEditComponent,
    MovieViewComponent,
    PpPipe
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }