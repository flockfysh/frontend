import {
    Dispatch,
    SetStateAction,
    PropsWithChildren,
    createContext,
    useState
} from 'react';

interface IPostContext {
    post: HomepagePost | {
        _id: '',
        title: '',
        content: '',
        user: '',
    },
    posts: HomepagePost[] | [],
    setPost: Dispatch<SetStateAction<HomepagePost>>,
    setPosts: Dispatch<SetStateAction<HomepagePost[]>>
}

export const PostContext = createContext<IPostContext>({
    post: {
        _id: '',
        title: '',
        content: '',
        user: '',
    },
    posts: [],
    setPost: () => {},
    setPosts: () => {}
});

export const PostWrapper = (props: PropsWithChildren) => {
    const [post, setPost] = useState<HomepagePost>({
        _id: '',
        title: '',
        content: '',
        user: '',
    });
    const [posts, setPosts] = useState<HomepagePost[]>([]);

    return (
        <PostContext.Provider value={{ post, posts, setPost, setPosts }}>
            {props.children}
        </PostContext.Provider>
    );
};
