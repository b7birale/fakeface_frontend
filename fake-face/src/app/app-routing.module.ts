import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { 
    path: 'friends', 
    loadChildren: () => import('./pages/friends/friends.module').then(m => m.FriendsModule) 
  },
  { 
    path: 'feed', 
    loadChildren: () => import('./pages/feed/feed.module').then(m => m.FeedModule) 
  },
  { 
    path: 'not-found', 
    loadChildren: () => import('./pages/not-found/not-found.module').then(m => m.NotFoundModule) 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
