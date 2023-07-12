import { Dispatch, SetStateAction, PropsWithChildren, createContext, useState } from "react";

interface IPostContext {
    posts: HomepagePost[] | [],
    setPosts: Dispatch<SetStateAction<HomepagePost[]>>
}

export const PostContext = createContext<IPostContext>({
    posts: [],
    setPosts: () => {}
})

export const PostWrapper = (props: PropsWithChildren) => {
    const [posts, setPosts] = useState<HomepagePost[]>([])

    return (
        <PostContext.Provider value={{posts, setPosts}}>
            {props.children}
        </PostContext.Provider>
    )
}
