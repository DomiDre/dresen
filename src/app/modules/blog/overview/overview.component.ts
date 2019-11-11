import { Component, OnInit } from '@angular/core';
import { BlogService } from '../services/blog.service';
import { Router } from'@angular/router';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {

  isLoading: boolean;

  constructor(
    public blogService: BlogService,
    private router: Router) { }

  /**
   * When the overview is loaded, fetch snippets from Firestore (or cache), show
   * spinner until data is fetched.
   */
  ngOnInit() {
    this.isLoading = true;

    const loadingPromises = [];
    loadingPromises.push(this.blogService.getSnippets());
    loadingPromises.push(this.blogService.getTopics());
    
    Promise.all(loadingPromises)
    .then(_ => {
      this.isLoading = false;
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
