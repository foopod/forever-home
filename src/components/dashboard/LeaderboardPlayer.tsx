import LayeredImage from "../LayeredImage"

interface Props {
    player: any
    position: number
}

const LeaderboardPlayer: React.FC<Props> = ({player, position}) => {
    console.log(player)
    return(
        <div className="border rounded flex gap-2 px-3 py-2  bg-white drop-shadow-md">
            <span className="flex-none font-extrabold text-4xl w-12">#{position}</span>
            <div className="flex-auto w-1/3">
            <span className="text-2xl">{player.attributes['name']}</span>
                <LayeredImage attributes={player.attributes} />
            </div>
            <div className="flex-auto w-1/3">
                <span className="text-2xl">{player.pet.attributes['name']}</span>
                <LayeredImage attributes={player.pet.attributes} />
            </div>
            <div className="flex-auto w-1/3 text-right">
                <div className="flex justify-end">
                    <span>Compatibility</span>
                    <span className="w-10">{Math.round(player.pet_compatibility * 100)}%</span>
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