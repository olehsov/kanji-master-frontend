import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import {KanjiComponent} from "./pages/kanji/kanji.component";

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'kanji', component: KanjiComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}