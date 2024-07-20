import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { FaTimes } from "react-icons/fa"
import LayeredImage from "../LayeredImage"

interface Props {
    player: object
    position: number
}

const LeaderboardPlayer: React.FC<Props> = ({player, position}) => {
    return(
        <div className="border rounded flex gap-2 px-3 py-2">
            <span className="flex-none font-extrabold text-4xl w-12">#{position}</span>
            <div className="flex-auto w-1/3">
            <span className="text-2xl">{player.name}</span>
                <LayeredImage pet={player.attributes} />
            </div>
            <div className="flex-auto w-1/3">
                <span className="text-2xl">{player.currentPet.name}</span>
                <LayeredImage pet={player.currentPet.attributes} />
            </div>
            <div className="flex-auto w-1/3 text-right">
                <div className="flex justify-end">
                    <span>Compatibility</span>
                    <span className="w-10">99%</span>
                </div>
                <div className="flex justify-end">
                    <span>Helpfulness</span>
                    <span className="w-10">99%</span>
                </div>
                <div className="flex justify-end">
                    <span>Trades</span>
                    <span className="w-10">10x</span>
                </div>
            </div>
        </div>
    )
}

export default LeaderboardPlayer