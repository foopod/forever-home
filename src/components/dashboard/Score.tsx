import { useEffect } from "react"
import LayeredImage from "../LayeredImage"
import { FaRightLeft } from "react-icons/fa6"
import { useState } from "react"

interface Props {
    score: number
}

function calculateScoreColor(score : number) : string {
    if (score == 1.0) {
        return "bg-blue-500"
    } else if (score > 0.75) {
        return "bg-green-500"
    } else if (score > 0.50) {
        return "bg-yellow-500"
    } else {
        return "bg-red-500"
    }
}

function calculateTextColor(score : number) : string {
    if (score == 1.0) {
        return "text-blue-500"
    } else {
        return "text-black"
    }
}

const Score: React.FC<Props> = ({score}) => {
    let scorePercent = (score * 100).toFixed(0)
    let scoreColor = calculateScoreColor(score)
    let textColor = calculateTextColor(score)

    useEffect(() => {
        scorePercent = (score * 100).toFixed(0)
        scoreColor = calculateScoreColor(score)
        textColor = calculateTextColor(score)
      }, [score])

    return(
        <div className=" flex justify-between flex-col gap-1">
            <span>{scorePercent}% Match</span>
            <div className="w-full bg-gray-200 rounded h-2.5 dark:bg-gray-200 relative">
                <div className={scoreColor + "  h-2.5 rounded-full z-1"} style={{width: scorePercent + "%"}}></div>
            </div>
        </div>
    )
}

export default Score