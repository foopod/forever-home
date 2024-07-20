import { Attributes } from "../data/attributes"

interface Props {
    attributes: Attributes
}

const LayeredImage: React.FC<Props> = ({attributes}) => {

    return <div className="grid grid-cols-1">
        <img className='col-start-1 row-start-1' src={`/parts/bg_${attributes.base}.png`} />
        <img className='col-start-1 row-start-1' src={`/parts/body_${attributes.accessory}.png`} />
        <img className='col-start-1 row-start-1' src={`/parts/eyes_${attributes.eyes}.png`} />
        <img className='col-start-1 row-start-1' src={`/parts/mouth_${attributes.mouth}.png`} />
    </div>
}

export default LayeredImage