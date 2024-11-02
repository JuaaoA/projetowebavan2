import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { ServicoListas } from './lista-item/lista-item.service';
import { HttpClient, HttpClientModule, provideHttpClient } from '@angular/common/http';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), 
    provideHttpClient(), 
    { provide: ServicoListas }]
};
 