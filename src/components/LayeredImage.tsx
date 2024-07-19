import { PetImage } from "../data/layers"

interface Props {
    pet: PetImage
}

const LayeredImage: React.FC<Props> = ({pet}) => {

    return <div className="grid grid-cols-1">
        <img className='col-start-1 row-start-1' src={`/parts/bg_${pet.base}.png`} />
        <img className='col-start-1 row-start-1' src={`/parts/body_${pet.accessory}.png`} />
        <img className='col-start-1 row-start-1' src={`/parts/eyes_${pet.eyes}.png`} />
        <img className='col-start-1 row-start-1' src={`/parts/mouth_${pet.mouth}.png`} />
        <img className='col-start-1 row-start-1' src={`/parts/nose_${pet.nose}.png`} />
        <img className='col-start-1 row-start-1' src={`/parts/nose_${pet.ears}.png`} />
    </div>
}

export default LayeredImage