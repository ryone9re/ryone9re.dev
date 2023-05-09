type UpdatePostDTOType = {
  title: string;
  thumbnail: string;
  content: string;
  visible: boolean;
};

export class UpdatePostDTO implements UpdatePostDTOType {
  title: string;
  thumbnail: string;
  content: string;
  visible: boolean;

  constructor({ title, thumbnail, content, visible }: UpdatePostDTOType) {
    this.title = title;
    this.thumbnail = thumbnail;
    this.content = content;
    this.visible = visible;
  }
}
