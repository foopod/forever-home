import { Attributes } from "../data/attributes"

interface Props {
    attributes: Attributes
}

const LayeredImage: React.FC<Props> = ({attributes}) => {

    return (
        <div className="grid grid-cols-1">
            <img className='col-start-1 row-start-1' src={`/parts/${attributes.species}/base/${attributes.base}.png`} />
            <img className='col-start-1 row-start-1' src={`/parts/${attributes.species}/eyes/${attributes.eyes}.png`} />
            <img className='col-start-1 row-start-1' src={`/parts/${attributes.species}/mouth/${attributes.mouth}.png`} />
            <img className='col-start-1 row-start-1' src={`/parts/${attributes.species}/accessories/${attributes.accessory}.png`} />
            <img className='col-start-1 row-start-1' src={`/border/border.png`} />
        </div>
    )
}

export default LayeredImage