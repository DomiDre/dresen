import { Component, OnInit, ViewChild } from '@angular/core';
import { AdminService } from '../services/admin.service';
import { BlogPost, BlogSnippet } from '@shared/models/blog.models';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss']
})
export class AddPostComponent implements OnInit {

  @ViewChild('titleInput', {static: false}) titleInput;
  @ViewChild('abstractBox', {static: false}) abstractBox;
  @ViewChild('textbox', {static: false}) textbox;

  blogPost: BlogPost;
  blogSnippet: BlogSnippet;

  constructor(private adminService: AdminService) { }

  ngOnInit() {
  }

  generatePreview() {
    const post_title = this.titleInput.nativeElement.value;
    const abstract = this.abstractBox.nativeElement.value;
    const post_content = this.textbox.nativeElement.value;

    [this.blogPost, this.blogSnippet] = this.adminService.generateSnippet(
      post_title, post_content, abstract
    );
  }

  post() {
    this.adminService.writeBlogPost(this.blogPost, this.blogSnippet);
  }

}
