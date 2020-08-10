import { Component, OnDestroy } from '@angular/core';
import { AppService } from '../app/app.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {
  title = 'spacex';
  limit = 100;
  programs = [];
  developerName = 'Chaitanya Nadavati';
  years = [
    '2006', '2007', '2008',
    '2009', '2010', '2011',
    '2012', '2013', '2014',
    '2015', '2016', '2017',
    '2018', '2019', '2020'];
  queryParams: any = {};
  queryRef: any;
  load = false;
  constructor(private appService: AppService, private route: ActivatedRoute, private router: Router) {
    this.queryRef = this.route.queryParams.subscribe((qp: any) => {
      this.queryParams = qp;
      this.getPrograms();
    });
  }
  ngOnDestroy() {
    if (this.queryRef) { this.queryRef.unsubscribe(); }
  }
  getPrograms() {
    this.load = true;
    const queryParams = { ...this.queryParams, limit: 100 };
    this.appService.getPrograms(queryParams).subscribe((resp: any) => {
      this.programs = resp;
      this.load = false;
    });
  }
}
