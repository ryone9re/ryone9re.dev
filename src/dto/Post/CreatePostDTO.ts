type CreatePostDTOType = {
  title: string;
  thumbnail: string;
  content: string;
  visible: boolean;
};

export class CreatePostDTO implements CreatePostDTOType {
  title: string;
  thumbnail: string;
  content: string;
  visible: boolean;

  constructor({ title, thumbnail, content, visible }: CreatePostDTOType) {
    this.title = title;
    this.thumbnail = thumbnail;
    this.content = content;
    this.visible = visible;
  }
}
