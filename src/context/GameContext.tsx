import React, { useEffect, useState } from "react"

type GameContextType = {
    chapters: {title:string, content:string}[],
    setBookmark: (chapterIndex: number) => void,
    currentChapter: number | null;
}
export const GameContext = React.createContext<GameContextType>({
    chapters: [], 
    setBookmark: () => {},
    currentChapter: null
})

export const GameContextProvider = ({ children }: { children: React.ReactNode }, chapters: {title:string, content:string}[]) => {
    const [bookmark, setBookmarkState] = useState<number | null>(null);

    const setBookmark = (chapterIndex: number) => {
        setBookmarkState(chapterIndex);
        localStorage.setItem('bookmark', JSON.stringify(chapterIndex));
    }
    
    useEffect(() => {
        const bookmark = localStorage.getItem('bookmark')
        if (Number(bookmark)){
            setBookmarkState(Number(bookmark))
        } else {
            setBookmarkState(0)
        }
    }, [])

    return (
        <GameContext.Provider value={{chapters:chapters, setBookmark, currentChapter:bookmark}}>
          {children}
        </GameContext.Provider>
      );
}