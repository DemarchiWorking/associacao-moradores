import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { InicialComponent } from './pages/inicial/inicial.component';
import { BazarComponent } from './pages/bazar/bazar.component';
import { IndexComponent } from './pages/index/index.component';
import { QuemSomosComponent } from './pages/quem-somos/quem-somos.component';
import { DemandasComponent } from './pages/demandas/demandas.component';
import { ContatoComponent } from './pages/contato/contato.component';

export const routes: Routes = [
    {
        path: '',
        component: IndexComponent
    },
    {
        path: 'entrar',
        component: LoginComponent
    },
    {
        path: 'registrar',
        component: RegisterComponent
    },
    {
        path: 'quem-somos',
        component: QuemSomosComponent
    },
    {
        path: 'demandas',
        component: DemandasComponent
    },
    {
        path: 'inicio',
        component: IndexComponent
    },
    {
        path: 'bazar',
        component: BazarComponent
    },
    {
        path: 'demanda',
        component: DemandasComponent
    },
    {
        path: 'contato',
        component: ContatoComponent
    }
];
