import { Component, OnInit, ViewChild } from '@angular/core';
import { BlogService } from '../services/blog.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Comment } from '@shared/models/blog.models';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  constructor(
    public blogService: BlogService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  @ViewChild('writeComment', {static: false}) writeComment;
  postId: string;
  postId$: Subscription;
  showComments = false;
  likeResponse: string;
  commentResponse: string;

  ngOnInit() {
    this.postId$ = this.activatedRoute.paramMap.subscribe(params => {
      // this function is always called when blog post is opened, if it is by
      // creation of the component or by routing
      this.blogService.resetPostState();
      this.likeResponse = undefined;
      this.commentResponse = undefined;
      this.postId = params.get('id'); // get id of the blog post

      // get content of blog post, sets blogService.viewPost
      this.blogService.getBlogpost(this.postId);

      // subscribe & get likes, sets blogService.postLikes
      this.blogService.getLikes(this.postId);

      // dont show comments at beginning, only subscribe upon request
      this.showComments = false;
    });
  }

  /**
   * When clicked, return to overview page
   */
  backToOverview() {
    this.router.navigate(['/blog']);
  }

  /**
   * Add like to a post
   */
  addLike() {
    this.blogService.addLike(this.postId)
    .then(succeeded => {
      this.likeResponse = succeeded ? 'Thank you for the like!' :
        'One like at a time. But thanks anyway!';
    });
  }

  /**
   * Switch between showing and hiding comments
   */
  triggerComments() {
    this.showComments = !this.showComments;
    if (this.showComments && !this.blogService.postComments) {
      // if not initialized -> subscribe & get comments
      this.blogService.getComments(this.postId);
    }
  }
  /**
   * Submit comment to database
   */
  postComment() {
    const timestamp = Date.now();
    const content = this.writeComment.nativeElement.value;

    this.blogService.addComment(this.postId, {
      timestamp,
      content
    }).then(succeeded => {
      this.commentResponse = succeeded ? 'Comment submitted.' :
        'Already commented.';
    });
  }
}
