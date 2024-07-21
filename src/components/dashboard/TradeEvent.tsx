import LayeredImage from "../LayeredImage"
import { FaRightLeft } from "react-icons/fa6"

interface Props {
    trade: any
}

const TradeEvent: React.FC<Props> = ({trade}) => {
    return(
        <div className="border rounded flex justify-between p-2 px-3 py-2  bg-white drop-shadow-md">
            <div className="flex">
                <div className="flex-auto w-1/2">
                    <span className="text-2xl">{trade.person1.attributes["name"]}</span>
                    <LayeredImage attributes={trade.person1.attributes} />
                </div>
                <div className="flex-auto w-1/2">
                    <span className="text-2xl">{trade.person1.pet.attributes["name"]}</span>
                    <LayeredImage attributes={trade.person1.pet.attributes} />
                </div>
            </div>
            <div className="flex-grow items-center flex px-4">
                <FaRightLeft color='black' size={"2em"}/>

            </div>
            <div className="flex">
                <div className="flex-auto w-1/2">
                    <span className="text-2xl">{trade.person2.pet.attributes["name"]}</span>
                    <LayeredImage attributes={trade.person2.pet.attributes} />
                </div>
                <div className="flex-auto w-1/2">
                    <span className="text-2xl">{trade.person2.attributes["name"]}</span>
                    <LayeredImage attributes={trade.person2.attributes} />
                </div>
            </div>
        </div>
    )
}

export default TradeEvent