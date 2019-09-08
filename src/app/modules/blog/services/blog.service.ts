import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

class BlogSnippet {
  id: string;
  timestamp: number;
  title: string;
  abstract: string;
}


class BlogPost {
  title: string;
  timestamp: number;
  content: string;
}

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  obs_snippets: Observable<any>;
  snippets: BlogSnippet[];

  loadedPosts: { [id: string] : BlogPost } = {};
  viewPost: BlogPost;

  constructor(private db: AngularFirestore) { }

  /**
   * Load blog snippets from Firestore. In case snippets haven't been loaded yet
   * initiated an observable that tracks the recent snippets and updates list
   * accordingly.
   */
  loadSnippets(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      if(!this.snippets) {
        // if snippets haven't been loaded, add observable that updates from db
        this.obs_snippets = this.db.collection('blog_snippets').doc('recent')
        .valueChanges();

        this.obs_snippets
        .subscribe(snapshot => {
          let snippets = []
          for (const el of snapshot.content) {
            snippets.push({
              id: el.id,
              timestamp: el.timestamp,
              abstract: el.abstract,
              title: el.title
            })
          }
          this.snippets = snippets;
          resolve(true);
        })
      } else {
        resolve(true);
      }
    })
  }

  /**
   * Get blog post by id from firestore. If blog post was loaded once before,
   * get from cached data.
   * @param blogId Document id of desired blog post
   */
  getBlogpost(blogId: string): Promise<boolean> {


    return new Promise((resolve, reject) => {
      if (!this.loadedPosts[blogId]) {
        this.db.doc<BlogPost>('blog_posts/'+blogId)
        .valueChanges().pipe(take(1))
        .subscribe(post => {
          post.content = post.content.replace(/<br>/g,  '\n');
          this.loadedPosts[blogId] = post;
          this.viewPost = post;
          resolve(true);
        })
      } else {
        this.viewPost = this.loadedPosts[blogId];
        resolve(true);
      }
    })
  }
}
