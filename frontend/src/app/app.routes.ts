import { Routes } from '@angular/router';
import { Dashboard } from './pages/dashboard/dashboard';
import { Stats } from './pages/stats/stats';
import { Transactions } from './pages/transactions/transactions';

export const routes: Routes = [

    {path: "", component: Dashboard},
    {path: "stats", component: Stats},
    {path: "transactions", component: Transactions}
];
