import {PostHeader} from './PostHeader.model';
import {PostBody} from './PostBody.model';
import {PostAttachement} from './PostAttachement.model';
import {PostComment} from './PostComment.model';
import {PostReaction} from './PostReaction.model';
import {PostShare} from './PostShare.model';
import {User} from './User.model';


export class Post {
   id: number;
   createdAt: Date;
   editedAt: Date;
   deletedAt: Date;
   postHeader: PostHeader;
   postBody: PostBody;
   attachementsList: Array<PostAttachement>;
   commentsList: Array<PostComment>;
   reactionsList: Array<PostReaction>;
   sharesList: Array<PostShare>;
   user: User;

}
