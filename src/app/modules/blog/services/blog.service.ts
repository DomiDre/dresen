import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { BlogPost, BlogSnippet, Comment, BlogPostComments } from '@shared/models/blog.models';
import * as firebase from 'firebase/app';
import { AuthService } from '@shared/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  obsSnippets: Observable<any>;
  snippets: BlogSnippet[];

  loadedPosts: { [id: string]: BlogPost } = {};
  viewSnippet: BlogSnippet;

  viewPost: BlogPost;

  postLikes$: Subscription;
  postLikes: number;
  postComments$: Subscription;
  postComments: BlogPostComments;

  topics: string[];

  constructor(
    private db: AngularFirestore,
    private auth: AuthService) { }

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
   * Called at initializing of post to reset state
   */
  resetPostState(): void {
    if (this.postLikes$) {
      this.postLikes$.unsubscribe();
      this.postLikes$ = undefined;
    }
    if (this.postComments$) {
      this.postComments$.unsubscribe();
      this.postComments$ = undefined;
    }

    this.postComments = undefined;
    this.postLikes = undefined;

    this.viewPost = undefined;

  }

  /**
   * Subscribe & Get number of likes for the currently viewed blog post
   */
  getLikes(blogId: string): void {
    this.postLikes$ = this.db.doc<any>('blog_likes/' + blogId)
    .valueChanges()
    .subscribe(likeUpdate => {
      if (likeUpdate) {
        this.postLikes = likeUpdate.likes;
      }
    });
  }


  /**
   * Subscribe & Get comments for the currently viewed blog post
   */
  getComments(blogId: string): void {
    this.postComments$ = this.db.doc<any>('blog_comments/' + blogId)
    .valueChanges()
    .subscribe(commentUpdate => {
      this.postComments = commentUpdate;
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

  /**
   * Add a like to a blog post.
   */
  addLike(blogId: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const batch = this.db.firestore.batch();

      const blogPostRef = this.db.doc<BlogPost>('blog_likes/' + blogId).ref;
      const increment = firebase.firestore.FieldValue.increment(1);
      batch.set(blogPostRef, {
        likes: increment,
      }, { merge: true });

      const uidLikersRef = this.db.doc<BlogPost>(
        'blog_likes/' + blogId + '/uid_likers/' + this.auth.authState.uid).ref;
      batch.set(uidLikersRef, {
        posted: true
      });

      batch.commit()
      .then(result => {
        resolve(true);
      })
      .catch(error => {
        resolve(false);
      });
    });
  }

  /**
   * Add a comment for to a given blog post.
   */
  addComment(blogId: string, comment: Comment): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const batch = this.db.firestore.batch();
      const blogCommentsRef =
        this.db.doc<BlogPostComments>('blog_comments/' + blogId).ref;
      const increment = firebase.firestore.FieldValue.increment(1);
      batch.set(
        blogCommentsRef,
        {
          comments: firebase.firestore.FieldValue.arrayUnion(comment),
          numberOfComments: increment
        }, { merge: true }
      );

      const uidCommentersRef = this.db.doc<BlogPost>(
        'blog_comments/' + blogId + '/uid_commenters/' +
        this.auth.authState.uid).ref;
      batch.set(uidCommentersRef, {
        posted: true
      });

      batch.commit()
      .then(result => {
        resolve(true);
      })
      .catch(error => {
        resolve(false);
      });
    });
  }
}
