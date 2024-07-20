import React, { useEffect, useState } from "react"

type GameContextType = {
    currentState: any | null
    setCurrentState: (state: any) => void
}
export const GameContext = React.createContext<GameContextType>({
    currentState: {},
    setCurrentState: () => {},
})

export const GameContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [currentState, setCurrentState] = useState<any | null>(null);

    const updateState = (state : any) => {
        setCurrentState(state);
        localStorage.setItem('state', JSON.stringify(state));
    }

    const joinGame = async () => {
        const response = await fetch('http://localhost:8080/api/join')
        const json = await response.json()
        updateState(json.player.pet)
        return json
    }
    
    useEffect(() => {
        const state = localStorage.getItem('state')
        if (state){
            setCurrentState(JSON.parse(state))
        } else {
            joinGame()
        }
    }, [])

    return (
        <GameContext.Provider value={{currentState: currentState, setCurrentState:setCurrentState}}>
          {children}
        </GameContext.Provider>
      );
}