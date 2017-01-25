import "reflect-metadata"
import "zone.js/dist/zone";
import "materialize-css";
import "angular2-materialize";
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './appModules';  

document.addEventListener('DOMContentLoaded', function main(): void {
  platformBrowserDynamic().bootstrapModule(AppModule);
});