import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-thankyou-cred',
  templateUrl: './thankyou-cred.component.html',
  styleUrls: ['./thankyou-cred.component.css']
})
export class ThankyouCredComponent implements OnInit {

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
