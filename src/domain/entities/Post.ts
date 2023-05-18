export type PostType = {
  id: string; // cuid
  title: string;
  thumbnail: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  visible: boolean;
};

export class Post implements PostType {
  id: string;
  title: string;
  thumbnail: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  visible: boolean;

  constructor({ id, title, thumbnail, content, createdAt, updatedAt, visible }: PostType) {
    this.id = id;
    this.title = title;
    this.thumbnail = thumbnail;
    this.content = content;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.visible = visible;
  }
}

export const PostConfig = {
  maxPostsPerRequest: 5
};
Object.freeze(PostConfig);
