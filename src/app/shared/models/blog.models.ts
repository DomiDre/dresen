export class BlogSnippet {
  id: string;
  timestamp: number;
  title: string;
  abstract: string;
  topic: string;
}

export class BlogPost {
  title: string;
  timestamp: number;
  content: string;
  topic: string;
  likes?: number;
  numberComments?: number;
}

export class Comment {
  timestamp: number;
  content: string;
}

export class BlogPostComments {
  comments: Comment[];
  numberOfComments: number;
}