export type SimpleBlogCard = {
    _id: string;
    title: string;
    smallDescription: string;
    currentSlug: string;
    titleImage: any;
}

export type FullBlog = {
    _id: string;
    currentSlug: string;
    title: string;
    content: any;
    titleImage: any;
}