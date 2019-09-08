import { Component, OnInit } from '@angular/core';
import { BlogService } from '../services/blog.service';
import { Router } from'@angular/router';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {

  isLoading = true;

  constructor(
    public blogService: BlogService,
    private router: Router) { }

  ngOnInit() {
    this.blogService.loadSnippets()
    .then(isLoaded => {
      this.isLoading = isLoaded;
    })
  }

  async openBlogPost(blogId: string) {
    await this.blogService.getBlogpost(blogId);
    this.router.navigate(['/blog/post']);
  }

}
