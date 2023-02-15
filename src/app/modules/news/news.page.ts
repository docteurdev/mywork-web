import { ChangeDetectionStrategy, ChangeDetectorRef, Component ,OnInit, NgZone} from '@angular/core';
import { NavController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { NewsArtService } from './news-art.service';
import {Article, Weather, ArticleFavoris} from '../../../mocks/article.mocks';
import { NavigationExtras } from '@angular/router';
import { Observable, Subject,of } from 'rxjs';
import { GeneralFunctions } from 'src/app/services/general-functions';

@Component({
  selector: 'app-tab2',
  templateUrl: 'news.page.html',
  styleUrls: ['news.page.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class Tab2Page implements OnInit{

 now: string;
 today= new Date();
 articles: Article[] = [];
 temp: string;
 post: string;
 desc: string;
 weather = null;
 img: string;
 imgItem1: string;
 imgItem2: string;
 imgItem3: string;
 ArrayArt= true;
 imgBoolean=true;
 imgItemBoolean=true;
 iviplaylogo: string;
 favorisHide=false;
 favorisShow=true;
 favorisArray: ArticleFavoris[] = [];
 commentColor;
 subject = new Subject();
 currentWeather: Weather = {
   city : '',
   temp : 0,
   logo : ''
 };
 isCommentColorActive:boolean=false;
 mapSalleReunion = {
   id:1,
   mapWizeId:'5d8a1922618902a02a7c7053'
  }
 mapBox = {
    id:2,
    mapWizeId:'5d8a1922618902a02a7c704f'
  }
  observer:Observable<any>;

 constructor(public alertController: AlertController,
            private artServices: NewsArtService,
            private cdr: ChangeDetectorRef,
            private navigateController: NavController,
            private ngZone: NgZone) {
     this.now = new Date().toString();
 }

  ngOnInit() {
    this.articles = this.artServices.getArticles();
    this.articles[1].desc = this.currentWeather.city + ' ' + this.currentWeather.logo;
    this.parisWeather();
  }

  async presentAlertMultipleButtons(article) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Message',
      inputs:[{ 
        name:'message',
        placeholder:'Saisir votre commentaire',
      }],
      buttons: [{ 
        text: 'Commenter',
        cssClass: 'my-alert',
        handler: (inputs: { message: string }) => {
          if (inputs.message == "" ) {
            return false;
          }else{
            article.comments="danger"
            this.ngOnInit()
          }
        }
      }],
    });
    await alert.present();
  }

  redirect(currentMap){
    const map: NavigationExtras = {
      state: {
        id: currentMap.id,
        mapWizeId:currentMap.mapWizeId,
      }
    };
    this.navigateController.navigateForward(['/redirect-to-map'],map) 
  }

  articleFav(article){
    if(article.share == ''){
      article.share = GeneralFunctions.dangerColor2
      this.favorisArray.push(article);
    }else{
      article.share = '';
      this.favorisArray.splice(this.favorisArray.indexOf(article), 1);
    }
  }

  pullOutArticle(article){
    this.favorisArray.splice(this.favorisArray.indexOf(article), 1)
    article.share=''
  }

  articleLike(article){
    if(article.like == ''){
      article.like = GeneralFunctions.dangerColor2
    }else{
      article.like = '';
    }
  }
 
  showFavoris(){
    this.favorisShow = false;
    this.favorisHide = true;
  }

  showRecents(){
    this.favorisHide = false;
    this.favorisShow = true;
  }

  arrayImg(img){
    if(img.length < 5){
      this.imgBoolean = true;
      this.imgItemBoolean =false;
        for(let i = 0;i < img.length;i++){
          this.imgItem1 = img[0].images;
          this.imgItem2 = img[1].images;
          this.imgItem3 = img[2].images;
          return this.imgItem1,this.imgItem2,this.imgItem3;
        }
      }else{
        this.imgBoolean = false;
        this.imgItemBoolean =true;
        this.img = img.images;
        return this.img;
    }
  }

  parisWeather(){
    this.artServices.parisWeather().subscribe((data) => {
      this.weather = data;
      this.currentWeather.city = this.weather.name;
      this.currentWeather.temp = Math.floor(this.weather.main.temp);
      switch(this.weather.weather[0].description ){
        case 'overcast clouds':
          this.currentWeather.logo = 'cloud-outline';
        break;
        case 'clear sky' :
          this.currentWeather.logo = 'sunny-outline';
        break;
        case 'few clouds' :
          this.currentWeather.logo = 'partly-sunny-outline';
          break;
        case 'broken clouds' :
          this.currentWeather.logo = 'cloud-outline';
        break;
        case 'shower rain' :
          this.currentWeather.logo = 'rainy-outline';
        break;
        case 'rain' :
          this.currentWeather.logo = 'thunderstorm-outline';
        break;
        case 'thunderstorm' :
          this.currentWeather.logo = 'rainy-outline';
        break;
        case 'snow' :
          this.currentWeather.logo = 'snow-outline';
        break;
        case 'mist' :
          this.currentWeather.logo = 'cloud-outline';
        break;
        default:
          this.currentWeather.logo = 'partly-sunny-outline';
      }
      this.cdr.detectChanges();
    });
  }
}
