import { Component } from '@angular/core';
import { SwPush } from '@angular/service-worker';
import { PushNotificationService } from './pushNotification.service';

//сюда вставляем public key
const VAPID_PUBLIC = 'BNBwFQC2sZUeXgA9g5x4QZYybhX5i5Z5-jiE0psb9RV9JDdHCsg6LG1rZQcQ1hv9YsuoOf61EFxjAt_UfuDUQls';
  

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ang-geonotipwa';
  constructor(swPush: SwPush, pushService: PushNotificationService) {
    if (swPush.isEnabled) {
      swPush
        .requestSubscription({
          serverPublicKey: VAPID_PUBLIC,
        })
        .then(subscription => {
          // send subscription to the server
          //здесь отправляется запрос серверу через сервис
          pushService.sendSubscriptionToTheServer(subscription).subscribe()
        })
        .catch(console.error)
    }
  }
}
