import { Component, OnInit } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ModalComponent implements OnInit {

  closeResult: string;

  constructor(private modalService: NgbModal) { }

  ngOnInit() {
  }

  open(content) {
    this.modalService.open(content, { windowClass: 'dark-modal' });
  }

}
