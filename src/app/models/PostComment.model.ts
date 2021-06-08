import {User} from './User.model';

export class PostComment {
  id: number;
  content: string;
  createdAt: Date;
  user: User;
}
