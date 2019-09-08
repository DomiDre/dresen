import { Component, OnInit, ViewChild } from '@angular/core';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss']
})
export class AddPostComponent implements OnInit {

  @ViewChild('titleInput', {static: false}) titleInput;
  @ViewChild('textbox', {static: false}) textbox;

  post_title: string;
  post_content: string;

  constructor(private adminService: AdminService) { }

  ngOnInit() {
  }

  generatePreview() {
    this.post_title = this.titleInput.nativeElement.value;
    this.post_content = this.textbox.nativeElement.value;
  }

  post() {
    this.adminService.writeBlogPost(this.post_title, this.post_content);
  }

}
