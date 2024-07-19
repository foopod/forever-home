import React, { useEffect, useState } from "react"

type GameContextType = {
    pet: string | null
    owner: string | null
    setPet: (pet: string) => void
    setOwner: (owner: string) => void
}
export const GameContext = React.createContext<GameContextType>({
    pet: "", 
    owner: "", 
    setPet: () => {},
    setOwner: () => {}
})

export const GameContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [pet, setPetState] = useState<string | null>(null);
    const [owner, setOwnerState] = useState<string | null>(null);

    const setPet = (pet : string) => {
        setPetState(pet);
        localStorage.setItem('pet', JSON.stringify(pet));
    }

    const setOwner = (owner : string) => {
        setOwnerState(owner);
        localStorage.setItem('owner', JSON.stringify(owner));
    }
    
    useEffect(() => {
        const pet = localStorage.getItem('pet')
        const owner = localStorage.getItem('owner')
        if (pet && owner){
            setPetState(pet)
            setOwnerState(owner)
        } else {
            // Join
        }
    }, [])

    return (
        <GameContext.Provider value={{pet:pet, owner: owner, setPet:setPet, setOwner: setOwner}}>
          {children}
        </GameContext.Provider>
      );
}