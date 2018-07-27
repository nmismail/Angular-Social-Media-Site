import { User } from './user';

export interface Post {id: number; author: User; description: string; likedUsers: User[]; picture: string; submitTime: number; }


