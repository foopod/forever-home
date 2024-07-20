import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { FaTimes } from "react-icons/fa"
import LayeredImage from "../LayeredImage"
import { FaRightLeft } from "react-icons/fa6"

interface Props {
    trade: object
}

const TradeEvent: React.FC<Props> = ({trade}) => {
    return(
        <div className="border rounded flex justify-between p-2 px-3 py-2">
            <div className="flex">
                <div className="flex-auto w-1/2">
                    <span className="text-2xl">{trade.person1.name}</span>
                    <LayeredImage pet={trade.person1.attributes} />
                </div>
                <div className="flex-auto w-1/2">
                    <span className="text-2xl">{trade.pet1.name}</span>
                    <LayeredImage pet={trade.pet1.attributes} />
                </div>
            </div>
            <div class="flex-grow items-center flex px-4">
                <FaRightLeft color='black' size={"2em"}/>

            </div>
            <div className="flex">
                <div className="flex-auto w-1/2">
                    <span className="text-2xl">{trade.pet2.name}</span>
                    <LayeredImage pet={trade.pet2.attributes} />
                </div>
                <div className="flex-auto w-1/2">
                    <span className="text-2xl">{trade.person2.name}</span>
                    <LayeredImage pet={trade.person2.attributes} />
                </div>
            </div>
        </div>
    )
}

export default TradeEvent