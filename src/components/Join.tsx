import { useContext } from "react"
import { GameContext } from "../context/GameContext"
import LayeredImage from "./LayeredImage"


const Join = () => {
    const { joinGame } = useContext(GameContext)

    const join = async () => {
        await joinGame()
    }

    return(
        <> 
            <div className="w-full h-full bg-white absolute top-0 left-0 flex flex-col justify-center">
                <div className="max-w-xl m-auto">
                    <p>Wanna help someone find their...</p>
                    <h1 className="mb-4 text-4xl font-extrabold text-gray-900 md:text-5xl lg:text-6xl font-exo">Forever Home?</h1>
                    <div className="prose max-w-sm text-left mx-auto">
                        <ul>
                            <li>Find the pet that best matches your client</li>
                            <li>Help as many pets as you can find their forever home!</li>
                            <li>Here are some examples of perfect matches...</li>
                        </ul>
                    </div>
                    <div className="flex mx-5">
                        <LayeredImage attributes={{
                            accessory: "accessories5",
                            base: "base3a",
                            eyes: "eyes1",
                            mouth: "mouth1",
                            species: "cat"
                        }}/>
                        <LayeredImage attributes={{
                            accessory: "accessories5",
                            base: "base3a",
                            eyes: "eyes1",
                            mouth: "mouth1",
                            species: "human"
                        }}/>
                    </div>
                    <div className="flex mx-5">
                        <LayeredImage attributes={{
                            accessory: "accessories1",
                            base: "base1c",
                            eyes: "eyes5",
                            mouth: "mouth2",
                            species: "cat"
                        }}/>
                        <LayeredImage attributes={{
                            accessory: "accessories1",
                            base: "base1c",
                            eyes: "eyes5",
                            mouth: "mouth2",
                            species: "human"
                        }}/>
                    </div>
                    <div className="my-5">
                        <button onClick={join} className="bg-slate-200 px-4 py-2 rounded-md">Get Started!</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Join