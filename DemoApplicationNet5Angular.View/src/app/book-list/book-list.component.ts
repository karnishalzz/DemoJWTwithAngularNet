
import { Component, TemplateRef, OnInit, ViewChild } from '@angular/core';
import { environment } from 'src/environments/environment';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router, NavigationEnd, RouterStateSnapshot } from '@angular/router';
import { CommonService } from '../_services/common.service';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ToastrService } from 'ngx-toastr';
import $ from "jquery";
import { from } from 'rxjs';
import { Page } from '../_models/page';
import { ResponseStatus } from '../_models/enum';

@Component({
    selector: 'app-book-list',
    templateUrl: './book-list.component.html',
    styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit {
    baseUrl = environment.baseUrl;
    timestamp = (new Date).getTime();

    openMatialList: Array<any> = [];
    openExamList: Array<any> = [];
    docPage = new Page();
    examPage = new Page();

    @BlockUI() blockUI: NgBlockUI;
    constructor(
        private router: Router,
        private _service: CommonService,
        private toastr: ToastrService,
        private route: ActivatedRoute,
    ) {
        this.router.events.subscribe(evt => {
            if (!(evt instanceof NavigationEnd)) {
                return;
            }
            window.scrollTo(0, 0);
        });
        this.docPage.startsFrom = 1; 
        this.docPage.pageNumber = 1;
        this.docPage.size = 10;
      
        this.examPage.pageNumber = 0;
        this.examPage.size = 10;
        this.baseUrl = environment.baseUrl;
    }

    ngOnInit(): void {
        setTimeout(() => {
            this.loadJquery();
        }, 500);

        this.getMaterialList();
    }

    setMaterialPage(pageNumber) {
        this.docPage.pageNumber = pageNumber;
        this.getMaterialList();
    }

    getMaterialList() {
        const obj = {
            name: null,
            Type: null,
            size: this.docPage.size,
            pageNumber: this.docPage.pageNumber - 1
        };
        this.blockUI.start("Getting Data...")
        this._service.get('open-material/trainee-wise-list', obj).subscribe(res => {

            if (res.Status === ResponseStatus.Warning) {
                this.toastr.warning(res.Message, 'Warning!', { timeOut: 2000 });
                return;
            }
            else if (res.Status === ResponseStatus.Error) {
                this.toastr.error(res.Message, 'Error!', { closeButton: true, disableTimeOut: false, enableHtml: true });
                return;
            }

            res.Data.Records.forEach(element => {
                this.openMatialList.push(element);

            });
            this.docPage.pageTotalElements = this.openMatialList.length;
            this.docPage.totalElements = res.Data.Total;
            this.docPage.totalPages = Math.ceil(this.docPage.totalElements / this.docPage.size);


            setTimeout(() => {
                this.blockUI.stop();
            })
        }, err => { this.blockUI.stop(); }
        );
    }

  
    loadJquery() {
        (function ($) {
        })($);
    }

}
