import { Component, OnInit } from '@angular/core';
import { BlogService } from '../services/blog.service';
import { Router } from'@angular/router';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  constructor(
    public blogService: BlogService,
    private router: Router) { }

  ngOnInit() {
    if(!this.blogService.viewPost) this.router.navigate(['/blog']);
  }

  /**
   * When clicked, return to overview page
   */
  backToOverview() {
    this.router.navigate(['/blog']);
  }
}
