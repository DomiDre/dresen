import { Component, OnInit, ViewChild } from '@angular/core';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-remove-post',
  templateUrl: './remove-post.component.html',
  styleUrls: ['./remove-post.component.scss']
})
export class RemovePostComponent implements OnInit {

  @ViewChild('idInput', {static: false}) idInput;

  constructor(private adminService: AdminService) { }

  ngOnInit() {
  }

  remove() {
    this.adminService.removeBlogPost(this.idInput.nativeElement.value);
  }

}
