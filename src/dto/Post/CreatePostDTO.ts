type CreatePostDTOType = {
  title: string;
  thumbnail: string;
  content: string;
  visible: boolean;
  authorId: string;
};

export class CreatePostDTO implements CreatePostDTOType {
  title: string;
  thumbnail: string;
  content: string;
  visible: boolean;
  authorId: string;

  constructor({ title, thumbnail, content, visible, authorId }: CreatePostDTOType) {
    this.title = title;
    this.thumbnail = thumbnail;
    this.content = content;
    this.visible = visible;
    this.authorId = authorId;
  }
}
