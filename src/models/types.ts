export type Blog = {
    id: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    revisedAt: string;
    title: string;
    content: string;
    category: Category;
    eyecatch: EyeCatch;
};

export type EyeCatch = {
    url: string;
    height: number;
    width: number;
};

export type Category = {
    id: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    revisedAt: string;
    name: string;
};

export type Toc = {
    id: string;
    text: string;
    name: string;
};
