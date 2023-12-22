import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-select-language',
  templateUrl: './select-language.component.html',
  styleUrls: ['./select-language.component.css']
})

export class SelectLanguageComponent implements OnInit {
  language: string = 'en-US';
  title!: string;



  constructor(public translate: TranslateService){
    // Register translation languages
    translate.addLangs(['Eng', 'Fra', 'Hin', 'Tam']);
    // Set default language
    translate.setDefaultLang('Eng');
    this.getTranslateString();
  } 

  getTranslateString() {
    // asynchronous - gets translations then completes.
    this.translate.get(['logo', 'slogan', 'login', 'signup'])
      .subscribe(translations => {
        this.title = translations['logo'];
        
      });
  }
 
  translateLanguageTo(lang: string) {
    this.translate.use(lang);
  }

  ngOnInit(): void {
  }

}
