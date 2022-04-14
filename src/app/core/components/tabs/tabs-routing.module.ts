import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadChildren: () => import('../../../features/pages/home/home.module').then(m => m.HomePageModule)
      },
      {
        path: 'profile',
        children: [
          {
            path: '',
            loadChildren: () => import('../../../features/pages/profile/profile.module').then((m) => m.ProfilePageModule),
          },
          {
            path: 'review',
            loadChildren: () => import('../../../features/pages/review/review.module').then((m) => m.ReviewPageModule),
          },
          {
            path: 'edit-review/:reviewId',
            loadChildren: () => import('../../../features/pages/edit-review/edit-review.module').then((m) => m.EditReviewPageModule),
          },
          {
            path: 'create-review/:pathId',
            loadChildren: () => import('../../../features/pages/create-review/create-review.module').then((m) => m.CreateReviewPageModule),
          },
        ],
      },
      {
        path: 'travel',
        loadChildren: () => import('../../../features/pages/travel/travel.module').then(m => m.TrvelPageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/home',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule { }
