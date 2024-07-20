import React, { useEffect, useState } from "react"
import { API_ENDPOINT, isProduction } from '../environment'

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
        if (isProduction()) {
            localStorage.setItem('state', JSON.stringify(state));
            console.log("State saved to local storage")
        }
    }

    const refreshState = async () => {
        const id = currentState.player.id
        const response = await fetch(`${API_ENDPOINT}/api/state/${id}`)
        const json = await response.json()
        updateState(json)
    }

    const joinGame = async () => {
        const response = await fetch(`${API_ENDPOINT}/api/join`)
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