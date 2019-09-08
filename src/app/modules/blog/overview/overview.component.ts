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

  /**
   * When the overview is loaded, fetch snippets from Firestore (or cache), show
   * spinner until data is fetched.
   */
  ngOnInit() {
    this.blogService.loadSnippets()
    .then(isLoaded => {
      this.isLoading = isLoaded;
    })
  }

  /**
   * When clicked, load the blog post from firestore and route to the post
   * @param blogId id of the blog post in firestore
   */
  async openBlogPost(blogId: string) {
    await this.blogService.getBlogpost(blogId);
    this.router.navigate(['/blog/post']);
  }

}
