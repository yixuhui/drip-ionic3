import { Component,ViewChild } from '@angular/core';
import { NavController,Tabs,IonicPage,PopoverController} from 'ionic-angular';
import { UserProvider } from '../../providers/user/user'

import { SettingModel } from '../../models/setting.model'

@IonicPage({
  name:'home',
  segment:'home'
})
@Component({
  templateUrl: 'home.html'
})
export class HomePage {
  public viewTitle:string = "今天";
  public setting:SettingModel;

  public events:any;
  public goals:any;

  constructor(public navCtrl: NavController,
              private popoverCtrl: PopoverController,
              private userProvider:UserProvider
  ) {
    this.events = Array(6).fill(0).map((x,i)=>i);

    this.userProvider.getSetting().then((settingData) => {
      console.log(settingData);
      if(settingData) {
        this.setting = settingData;
      } else {
        this.setting = this.userProvider.getDefaultSetting();
      }
    });
  }

  ngAfterViewInit() {

  }


  ionViewDidLoad() {
    this.getGoals();
  }

  getGoals() {
    this.userProvider.getGoals().then((data)=>{
      this.goals =  data.goals;
    });
  }

  onViewTitleChanged(title) {
    this.viewTitle = title;
  }

  onDaySelected(day) {
    console.log(day);
  }

  goGoalAddPage() {
    this.navCtrl.push('goal-add',{});
  }

  goGoalDetailPage() {
    this.navCtrl.push('goal-detail',{'homePage':this});
  }

  setRemindTime() {

  }

  openMenu($event) {
    let popover = this.popoverCtrl.create('home-menu', {
      viewMode:this.setting.viewMode,
      calendarMode:this.setting.calendarMode,
    },{
      showBackdrop:true,
    });

    popover.present({
      ev: $event
    });

    popover.onDidDismiss((settingData) => {
      if(settingData) {
        this.setting = settingData;
        this.userProvider.updateSetting(this.setting);
      }
    })
  }

  // doRefresh(refresher) {
  //   console.log('Begin async operation', refresher);
  //
  //   setTimeout(() => {
  //     console.log('Async operation has ended');
  //     refresher.complete();
  //   }, 2000);
  // }

}
