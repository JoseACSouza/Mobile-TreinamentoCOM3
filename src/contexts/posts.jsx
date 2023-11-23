import { createContext, useMemo, useState } from 'react';


export const PostContext = createContext();

export const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  

  const values = useMemo(() => ({
    posts,
    setPosts,
  }), [posts]);


  return (
    <PostContext.Provider value={ values }>
      {children}
    </PostContext.Provider>
  );
}
