import { Post } from '../models/post';

export const validateIncomingPost = (data: Post): boolean => {
    if (data.id == null || data.title == null 
        || data.userId == null
        || data.content == null)
        return false;

    return true;
}