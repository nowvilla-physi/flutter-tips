import { createContext, useCallback, useState } from 'react';
import { Blog } from '../models/types';

type BlogContext = {
    blogs: Blog[];
    allBlogs: Blog[];
    setBlog: (blogs: Blog[]) => void;
    setAllBlog: (blogs: Blog[]) => void;
};

const defaultContext: BlogContext = {
    blogs: [],
    allBlogs: [],
    setBlog: () => {},
    setAllBlog: () => {},
};

export const blogContext = createContext<BlogContext>(defaultContext);

export const useBlog = (): BlogContext => {
    const [blogs, setBlogs] = useState([]);
    const [allBlogs, setAllBlogs] = useState([]);
    const setBlog = useCallback((current: Blog[]): void => {
        setBlogs(current);
    }, []);
    const setAllBlog = useCallback((current: Blog[]): void => {
        setAllBlogs(current);
    }, []);
    return {
        blogs,
        allBlogs,
        setBlog,
        setAllBlog,
    };
};
