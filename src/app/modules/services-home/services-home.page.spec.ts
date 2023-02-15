import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { ExploreContainerComponentModule } from '../../explore-container/explore-container.module';

import { ServicesMenu } from './services-home.page';

describe('ServicesMenu', () => {
  let component: ServicesMenu;
  let fixture: ComponentFixture<ServicesMenu>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ServicesMenu],
      imports: [IonicModule.forRoot(), ExploreContainerComponentModule]
    }).compileComponents();

    fixture = TestBed.createComponent(ServicesMenu);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
