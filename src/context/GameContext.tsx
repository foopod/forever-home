import React, { useEffect, useState } from "react"
import { API_ENDPOINT } from '../environment'

type GameContextType = {
    currentState: any | null
    userID: number | null
    setCurrentState: (state: any) => void
    refreshState: (userID: number) => void
    joinGame: () => void
}
export const GameContext = React.createContext<GameContextType>({
    userID: null,
    currentState: {},
    setCurrentState: () => {},
    refreshState: () => {},
    joinGame: () => {}
})

export const GameContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [currentState, setCurrentState] = useState<any | null>(null);
    const [userID, setUserID] = useState<number | null>(null)

    const refreshState = async (id: number) => {
        const response = await fetch(`${API_ENDPOINT}/api/state/${id}`)
        if(response.ok){
            const json = await response.json()
            setCurrentState(json)
        } else {
            setUserID(null)
            localStorage.removeItem('userID');
        }
    }

    const joinGame = async () => {
        const response = await fetch(`${API_ENDPOINT}/api/join`)
        const json = await response.json()
        setCurrentState(json)
        setUserID(json.player.id)
        localStorage.setItem('userID', JSON.stringify(json.player.id));
        return json
    }

    useEffect(() => {
        const userID = localStorage.getItem('userID')
        if (userID){
            setUserID(JSON.parse(userID))
            refreshState(JSON.parse(userID))
        }
    }, [])

    return (
        <GameContext.Provider value={{currentState, setCurrentState, refreshState, userID, joinGame}}>
          {children}
        </GameContext.Provider>
      );
}