import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import { BlogPost, BlogSnippet } from '@shared/models/blog.models';
import { BlogService } from '@app/modules/blog/services/blog.service';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(
    private db: AngularFirestore,
    private blogService: BlogService,
    private router: Router
  ) { }

  /**
   * Generates a snippet and post object for a prospective post
   * @param title Title of Blog Post
   * @param content Markdown String of Post
   */
  generateSnippet(title: string, content: string, topic: string,
                  abstract?: string, timestamp?: number,
                  id?: string): [BlogPost, BlogSnippet] {
    if (!timestamp) { timestamp = Date.now(); }
    abstract = abstract ? abstract : content.split(' ').slice(0, 42).join(' ');
    const blogPost: BlogPost = {
      title,
      content,
      timestamp,
      topic
    };

    const blogSnippet: BlogSnippet = {
      id,
      abstract,
      title,
      timestamp,
      topic
    };

    return [blogPost, blogSnippet];
  }

  /**
   * Write a blog post to Firebase.
   * New lines are replaced by <br> for storage
   */
  async writeBlogPost(blogPost: BlogPost,
                      blogSnippet: BlogSnippet): Promise<void> {
    if (blogSnippet.id) {
      console.error(
        'writeBlogPost() should not be used with already added posts. ' +
        'Use editBlogPost() if id is already defined');
    }
    const docId = this.db.createId();
    blogSnippet.id = docId;

    // for storage in DB replace \n by <br>
    blogPost.content = blogPost.content.replace(/(\r\n|\n|\r)/gm, '<br>');
    blogSnippet.abstract = blogSnippet.abstract
    .replace(/(\r\n|\n|\r)/gm, '<br>');

    const batch = this.db.firestore.batch();
    batch.set(
      this.db.collection('blog_posts').doc(docId).ref,
      blogPost
    );
    batch.update(
      this.db.collection('blog_snippets').doc('recent').ref,
      { content: firebase.firestore.FieldValue.arrayUnion(blogSnippet)}
    );
    batch.update(
      this.db.collection('blog_snippets').doc(blogSnippet.topic).ref,
      { content: firebase.firestore.FieldValue.arrayUnion(blogSnippet)}
    );
    await batch.commit();
    this.router.navigate(['/']);
  }

  /**
   * Removes the blog post from firestore and also removes the snippet
   * @param blogId id of the blog post in firestore
   */
  async removeBlogPost(blogId: string): Promise<void> {
    const docRef = this.db.doc<BlogPost>('blog_posts/' + blogId).ref;
    const snippets = await this.blogService.getSnippets();
    console.log(snippets);
    const blogSnippet = snippets.find(element => element.id === blogId);

    const batch = this.db.firestore.batch();
    batch.delete(docRef);
    batch.update(
      this.db.collection('blog_snippets').doc('recent').ref,
      { content: firebase.firestore.FieldValue.arrayRemove(blogSnippet)}
    );
    batch.update(
      this.db.collection('blog_snippets').doc(blogSnippet.topic).ref,
      { content: firebase.firestore.FieldValue.arrayRemove(blogSnippet)}
    );
    return batch.commit();
  }

  /**
   * Edit an existing blog post.
   */
  async editBlogPost(blogPost: BlogPost,
                     blogSnippet: BlogSnippet): Promise<void> {
    if (!blogSnippet.id) {
      console.error('Provided blog snippet without an ID');
      return;
    }

    const snippetPromises = [];

    snippetPromises.push(
      this.db.firestore.collection('blog_snippets').doc('recent').get()
    );
    snippetPromises.push(
      this.db.firestore.collection('blog_snippets').doc(blogSnippet.topic).get()
    );

    let [recentSnippets, topicSnippets] = await Promise.all(snippetPromises);
    if (recentSnippets.exists && topicSnippets.exists) {
      recentSnippets = recentSnippets.data();
      topicSnippets = topicSnippets.data();
    } else {
      console.error('Did not find snippets');
      return;
    }

    const idxRecent = recentSnippets.content.findIndex(
      element => element.id === blogSnippet.id);
    const idxTopic = topicSnippets.content.findIndex(
      element => element.id === blogSnippet.id);

    recentSnippets.content[idxRecent] = blogSnippet;
    topicSnippets.content[idxTopic] = blogSnippet;

    blogPost.content = blogPost.content.replace(
      /(\r\n|\n|\r)/gm, '<br>');
    blogSnippet.abstract = blogSnippet.abstract.replace(
      /(\r\n|\n|\r)/gm, '<br>');

    const batch = this.db.firestore.batch();
    batch.update(
      this.db.collection('blog_posts').doc(blogSnippet.id).ref,
      blogPost
    );
    batch.update(
      this.db.collection('blog_snippets').doc('recent').ref,
      recentSnippets
    );
    batch.update(
      this.db.collection('blog_snippets').doc(blogSnippet.topic).ref,
      topicSnippets
    );
    await batch.commit();
    this.router.navigate(['/']);
  }
}

