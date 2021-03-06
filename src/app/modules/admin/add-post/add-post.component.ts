import { Component, OnInit, ViewChild } from '@angular/core';
import { AdminService } from '../services/admin.service';
import { BlogPost, BlogSnippet } from '@shared/models/blog.models';
import { BlogService } from '@app/modules/blog/services/blog.service';

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

  topics: string[];
  selectedTopic: string;

  constructor(
    private adminService: AdminService,
    public blogService: BlogService) { }

  ngOnInit() {
    this.blogService.getTopics()
    .then(topics => {
      this.topics = topics;
    });
  }

  generatePreview() {
    const postTitle = this.titleInput.nativeElement.value;
    const abstract = this.abstractBox.nativeElement.value;
    const postContent = this.textbox.nativeElement.value;
    const topic = this.selectedTopic;

    [this.blogPost, this.blogSnippet] = this.adminService.generateSnippet(
      postTitle, postContent, topic, abstract
    );
  }

  post() {
    this.adminService.writeBlogPost(this.blogPost, this.blogSnippet);
  }

}
