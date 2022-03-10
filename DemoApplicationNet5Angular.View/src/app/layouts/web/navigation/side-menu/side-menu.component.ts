import { Component, OnInit, ModuleWithComponentFactories } from '@angular/core';
import { CommonService } from 'src/app/_services/common.service';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';

@Component({
  selector: 'app-web-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css']
})
export class SideMenuComponent implements OnInit {
  baseUrl: string;
  currentUser: any;

  constructor(private _service: CommonService, private toastr: ToastrService) {
    this.baseUrl = environment.baseUrl;
  }

  ngOnInit() {

  }


}
