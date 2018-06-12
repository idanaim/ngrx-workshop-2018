import {Component} from '@angular/core';
import {Observable} from 'rxjs';
import * as fromRoot from '../../reducers/index';
import * as fromCore from '../../core/reducers/core.reducer';
import * as fromAuth from '../../auth/reducers/auth.reducer';

import {select, Store} from '@ngrx/store';
import {Logout} from '../../auth/actions/auth.actions';

@Component({
  selector: 'app-root',
  template: `
    <app-header *ngIf="loggedIn | async" (logout)="logout()"></app-header>

    <main class="container">
      <router-outlet></router-outlet>
      <app-loader *ngIf="loading | async"></app-loader>
      <app-snackbar [notifications]="notifications | async"></app-snackbar>
    </main>

    <app-footer></app-footer>
  `,
})

export class AppComponent {

  loading: Observable<boolean>;
  notifications: Observable<string[]>;
  loggedIn: Observable<boolean>;

  constructor(private store: Store<fromRoot.State>) {
    this.loading = this.store.pipe(select(fromCore.isLoading));
    this.notifications = this.store.pipe(select(fromCore.getNotifications));
    this.loggedIn = this.store.pipe(select(fromAuth.getLoogedIn));
  }

  logout() {
    this.store.dispatch(new Logout());
  }

}
