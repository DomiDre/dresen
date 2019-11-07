import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import { BlogPost, BlogSnippet } from '@shared/models/blog.models';
import { BlogService } from '@app/modules/blog/services/blog.service';
@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(
    private db: AngularFirestore,
    private blogService: BlogService
  ) { }
  
  /**
   * Generates a snippet and post object for a prospective post
   * @param title Title of Blog Post
   * @param content Markdown String of Post
   */
  generateSnippet(title: string, content: string, abstract?: string): [BlogPost, BlogSnippet] {
    const timestamp = Date.now();
    abstract = abstract ? abstract : content.split(' ').slice(0, 42).join(' ');
    const blogPost: BlogPost = {
      title,
      content,
      timestamp
    }

    const blogSnippet: BlogSnippet = {
      id: undefined,
      abstract,
      title,
      timestamp,
    }

    return [blogPost, blogSnippet]
  }

  /**
   * Write a blog post to Firebase.
   * New lines are replaced by <br> for storage
   */
  writeBlogPost(blogPost: BlogPost, blogSnippet: BlogSnippet): Promise<void> {

    const docId = this.db.createId();  
    blogSnippet.id = docId;

    // for storage in DB replace \n by <br>
    blogPost.content = blogPost.content.replace(/(\r\n|\n|\r)/gm,"<br>");
    blogSnippet.abstract = blogSnippet.abstract.replace(/(\r\n|\n|\r)/gm,"<br>");
    
    const batch = this.db.firestore.batch();
    batch.set(
      this.db.collection('blog_posts').doc(docId).ref,
      blogPost
    );
    batch.update(
      this.db.collection('blog_snippets').doc('recent').ref,
      { content: firebase.firestore.FieldValue.arrayUnion(blogSnippet)}
    )
    return batch.commit();
  }

  /**
   * Removes the blog post from firestore and also removes the snippet
   * @param blogId id of the blog post in firestore
   */
  async removeBlogPost(blogId: string): Promise<void> {
    const docRef = this.db.doc<BlogPost>('blog_posts/' + blogId).ref;
    const snippets = await this.blogService.getSnippets()
    console.log(snippets);
    const blogSnippet = snippets.find(element => element.id === blogId)

    const batch = this.db.firestore.batch();
    batch.delete(docRef);
    batch.update(
      this.db.collection('blog_snippets').doc('recent').ref,
      { content: firebase.firestore.FieldValue.arrayRemove(blogSnippet)}
    );
    return batch.commit();
  }
}

