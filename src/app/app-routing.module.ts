import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {KanjiesComponent} from "./pages/kanjies/kanjies.component";
import {KanjiComponent} from "./pages/kanji/kanji.component";
import {SearchKanjiByRadicalsComponent} from "./pages/search-kanji-by-radicals/search-kanji-by-radicals.component";

const routes: Routes = [
    {path: 'kanji', component: KanjiesComponent},
    {path: 'kanji/:id', component: KanjiComponent},
    {path: 'search-kanji-by-radical', component: SearchKanjiByRadicalsComponent},
    {path: '', redirectTo: '/kanji', pathMatch: 'full'},
    {path: 'index.html/home', redirectTo: '/kanji'}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {
}