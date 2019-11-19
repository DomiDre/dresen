import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { BlogPost, BlogSnippet } from '@shared/models/blog.models';


@Injectable({
  providedIn: 'root'
})
export class BlogService {

  obsSnippets: Observable<any>;
  snippets: BlogSnippet[];

  loadedPosts: { [id: string]: BlogPost } = {};
  viewSnippet: BlogSnippet;
  viewPost: BlogPost;
  topics: string[];

  constructor(private db: AngularFirestore) { }

  /**
   * Load blog snippets from Firestore. In case snippets haven't been loaded yet
   * initiated an observable that tracks the recent snippets and updates list
   * accordingly.
   */
  getSnippets(): Promise<BlogSnippet[]> {
    return new Promise((resolve, reject) => {
      if (!this.snippets) {
        // if snippets haven't been loaded, add observable that updates from db
        this.obsSnippets = this.db.collection('blog_snippets').doc('recent')
        .valueChanges();

        this.obsSnippets
        .subscribe(snapshot => {
          const snippets = [];
          for (const el of snapshot.content) {
            snippets.push({
              id: el.id,
              timestamp: el.timestamp,
              abstract: el.abstract.replace(/<br>/g,  '\n'),
              title: el.title,
              topic: el.topic
            });
          }
          this.snippets = snippets;
          resolve(this.snippets);
        });
      } else {
        resolve(this.snippets);
      }
    });
  }

  /**
   * Get blog post by id from firestore. If blog post was loaded once before,
   * get from cached data.
   * @param blogId Document id of desired blog post
   */
  getBlogpost(blogId: string): Promise<BlogPost> {
    return new Promise((resolve, reject) => {
      if (!this.loadedPosts[blogId]) {
        this.db.doc<BlogPost>('blog_posts/' + blogId)
        .valueChanges().pipe(take(1))
        .subscribe(post => {
          post.content = post.content.replace(/<br>/g,  '\n');
          this.loadedPosts[blogId] = post;
          this.viewPost = post;
          resolve(this.viewPost);
        });
      } else {
        this.viewPost = this.loadedPosts[blogId];
        resolve(this.viewPost);
      }
    });
  }

  /**
   * Get list of available topics from database. If was already loaded, get from
   * cached data.
   */
  getTopics(): Promise<string[]> {

    return new Promise((resolve, reject) => {
      if (!this.topics) {
        this.db.doc<any>('page_settings/blog')
        .valueChanges().pipe(take(1))
        .subscribe(post => {
          this.topics = post.blog_topics;
          resolve(this.topics);
        });
      } else {
        resolve(this.topics);
      }
    });
  }
}
