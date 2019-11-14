import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router'
import { BlogService } from '@app/modules/blog/services/blog.service';
import { AdminService } from '../services/admin.service';
import { BlogPost, BlogSnippet } from '@shared/models/blog.models';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.scss']
})
export class EditPostComponent implements OnInit {

  @ViewChild('titleInput', {static: false}) titleInput;
  @ViewChild('abstractBox', {static: false}) abstractBox;
  @ViewChild('textbox', {static: false}) textbox;

  blogPost: BlogPost;
  blogSnippet: BlogSnippet;

  topics: string[];
  selectedTopic: string;

  constructor(
    public blogService: BlogService,
    private adminService: AdminService,
    private router: Router
  ) { }

  ngOnInit() {
    if(!this.blogService.viewPost) this.router.navigate(['/blog']);
    this.blogService.getTopics()
    .then(topics => {
      this.topics = topics;
      this.selectedTopic = this.blogService.viewPost.topic;
    })
  }

  generatePreview() {
    const post_title = this.titleInput.nativeElement.value;
    const abstract = this.abstractBox.nativeElement.value;
    const post_content = this.textbox.nativeElement.value;
    let topic = this.selectedTopic;

    [this.blogPost, this.blogSnippet] = this.adminService.generateSnippet(
      post_title, post_content, topic, abstract,
      this.blogService.viewSnippet.timestamp,
      this.blogService.viewSnippet.id
    );
  }

  post() {
    this.adminService.editBlogPost(this.blogPost, this.blogSnippet);
  }

}
