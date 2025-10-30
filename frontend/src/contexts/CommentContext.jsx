const CommentContext = createContext();

export function CommentProvider({ children }) {
    const value = {};

    return <CommentContext.Provider value={value}>{children}</CommentContext.Provider>;
}

export default CommentContext;
