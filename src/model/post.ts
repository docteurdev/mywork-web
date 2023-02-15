import { Profile } from "./profile";
import {Picture} from './picture';
import {Comment} from './comment';

export interface Post {
    id: string;
    name: string;
    desc: string;
    profile?: Profile;
    post: any;
    images: Picture[];
    comments: Comment[];
}
