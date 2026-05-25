import { Component } from '@angular/core';
import {  IonTabs, IonTabButton, IonIcon, IonTabBar} from '@ionic/angular/standalone';

import { addIcons } from 'ionicons';
import { home, albumsOutline, peopleOutline } from 'ionicons/icons';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
  standalone: true,
  imports: [ IonTabs, IonTabButton, IonIcon, IonTabBar]
})
export class TabsPage {

  constructor() {


     addIcons({ home, albumsOutline, peopleOutline})
   }

  ngOnInit() {
  }

}
