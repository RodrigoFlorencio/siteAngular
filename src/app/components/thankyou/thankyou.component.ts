import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-thankyou',
  templateUrl: './thankyou.component.html',
  styleUrls: ['./thankyou.component.css']
})
export class ThankyouComponent implements OnInit {

  constructor(private spinnerService: NgxSpinnerService) { }

  ngOnInit(): void {
    this.spinner()
  }

  spinner(): void {
    this.spinnerService.show()
    setTimeout(() => {
      this.spinnerService.hide()
    }, 2000)
  }

}
