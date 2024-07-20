import React, { useEffect, useState } from "react"

type GameContextType = {
    currentState: any | null
    setCurrentState: (state: any) => void
    refreshState: () => void
}
export const GameContext = React.createContext<GameContextType>({
    currentState: {},
    setCurrentState: () => {},
    refreshState: () => {}
})

export const GameContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [currentState, setCurrentState] = useState<any | null>(null);

    const updateState = (state : any) => {
        setCurrentState(state);
        localStorage.setItem('state', JSON.stringify(state));
    }

    const refreshState = async () => {
        const id = currentState.player.id
        const response = await fetch(`http://localhost:8080/api/state/${id}`)
        const json = await response.json()
        updateState(json)
    }

    const joinGame = async () => {
        const response = await fetch('http://localhost:8080/api/join')
        const json = await response.json()
        updateState(json)
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
        <GameContext.Provider value={{currentState: currentState, setCurrentState:updateState, refreshState:refreshState}}>
          {children}
        </GameContext.Provider>
      );
}