import { Component, OnInit } from '@angular/core';
import { BlogService } from '../services/blog.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

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

  postId: string;
  postId$: Subscription;

  ngOnInit() {
    this.postId$ = this.activatedRoute.paramMap.subscribe(params => {
      this.postId = params.get('id');
      this.blogService.getBlogpost(this.postId);
    });
    // if (!this.blogService.viewPost) { this.router.navigate(['/blog']); }
  }

  /**
   * When clicked, return to overview page
   */
  backToOverview() {
    this.router.navigate(['/blog']);
  }
}
