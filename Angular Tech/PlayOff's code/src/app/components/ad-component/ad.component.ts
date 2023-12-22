import { Component, Directive, Input, OnDestroy, OnInit } from '@angular/core';
import {AdMob, BannerAdOptions, BannerAdSize, BannerAdPosition, BannerAdPluginEvents, AdMobBannerSize } from '@capacitor-community/admob';

@Directive({selector: '.adContainer'})
export class adContainer {
  @Input() id!: string;
}

@Component({
  selector: 'ad-component',
  templateUrl: 'ad.component.html',
  styleUrls: ['./ad.component.css']
})

export class AdComponent implements OnInit, OnDestroy {
  
 
  window: any;
  adsbygoogle: any;

  ngOnInit(): void {
    this.window = window;
    this.initialize();
  }

  ngOnDestroy(): void {
    this.destroy()
  }

async destroy(){
  await AdMob.removeBanner();
}

  async initialize(): Promise<void> {
    const { status } = await AdMob.trackingAuthorizationStatus();
   
    await AdMob.initialize({
      requestTrackingAuthorization: true,
      testingDevices: ['2077ef9a63d2b398840261c8221a0c9b'],
      initializeForTesting: true,
    });
    this.banner();
  }

  async banner(): Promise<void> {
    const options: BannerAdOptions = {
      adId: 'ca-app-pub-4684230794171193~1677534517',
      adSize: BannerAdSize.ADAPTIVE_BANNER,
      position: BannerAdPosition.BOTTOM_CENTER,
      margin: 0,
      isTesting: true
      // npa: true
    };
    AdMob.initialize({
      requestTrackingAuthorization: true,
      testingDevices: ['2077ef9a63d2b398840261c8221a0c9b'],
      initializeForTesting: true,
    });
    await AdMob.showBanner(options);
    // await AdMob.prepareInterstitial(options);
    // await AdMob.showInterstitial();
  }
}

