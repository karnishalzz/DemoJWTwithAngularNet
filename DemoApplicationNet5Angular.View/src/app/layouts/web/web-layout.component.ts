import { Component, TemplateRef, OnInit, ViewChild, ViewEncapsulation, ElementRef, AfterViewInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { map, filter, scan } from 'rxjs/operators';
import { CommonService } from 'src/app/_services/common.service';
import { AuthenticationService } from '../../_services/authentication.service';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../../environments/environment';
import $ from "jquery";

@Component({
  selector: 'app-web-layout',
  templateUrl: './web-layout.component.html',
  styleUrls: ['./web-layout.component.css'],
  encapsulation: ViewEncapsulation.None,
})

export class WebLayoutComponent implements OnInit {
  baseUrl = environment.baseUrl;
  isAuthincate: boolean = false;
  currentUser: any = null;
  userType = null;
  collapsed = true;
  loadingIndicator = false;


  public navigation: any;
  @ViewChild('navbarContent') navbarContent: ElementRef;

  constructor(

    private router: Router,
    private activatedRoute: ActivatedRoute,
    private authService: AuthenticationService,
    private _service : CommonService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
  ) {

    this.authService.currentUserDetails.subscribe((value) => {
      this.currentUser = value;
      if(this.currentUser){
        this.isAuthincate = true;
        this.userType = this.currentUser.user_type;
      }
    });
  }

  ngOnInit() {
    // this.getQuickLinks();
    setTimeout(() => {
      this.loadJquery();
    }, 400);

  }

  ngOnDestroy() {

  }



  // userLogout() {
  //   this.authService.logout(window.location.hostname).subscribe(res => {
  //     if(res.status){
  //       this.currentUser = [];
  //       this.isAuthincate = false;
  //       this.toastr.success(res.message, 'Success!', { timeOut: 2000 });
  //       this.router.navigate(["/"]);
  //     }else {
  //       this.toastr.error(res.message, 'Error!', { timeOut: 2000 });
  //     }
  //   }, (err:any) => {
  //   //  this.toastr.error(err, 'Error!', { timeOut: 2000 });
  //   });
  // }

  loadJquery() {


    (function ($) {
      "use strict";
      $(window).on("load", function () {


      });

      $(document).ready(function () {
        // $(document).on("click", ".menu-toggler", function () {
        //   $(this).toggleClass("active");
        //   $(".main-menu").slideToggle(200);
        // });

      });
    })($);


  }





}
