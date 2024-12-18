import { Category } from "./category";
import { Tag } from "./tag";

export type Status = 'available' | 'pending' | 'sold';

export interface Pet {
    id: number;
    category: Category;
    name: string;
    photoUrls: string[],
    tags: Tag[],
    status: Status;
}