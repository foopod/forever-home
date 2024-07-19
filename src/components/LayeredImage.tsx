import { CatImage } from "../data/layers"
import './LayeredImage.css'

interface Props {
    cat: CatImage
}

const LayeredImage: React.FC<Props> = ({cat}) => {

    return <div className="image-container">
        <img className='layer' src={`/parts/bg_${cat.background}.png`} />
        <img className='layer' src={`/parts/body_${cat.body}.png`} />
        <img className='layer' src={`/parts/eyes_${cat.eyes}.png`} />
        <img className='layer' src={`/parts/mouth_${cat.mouth}.png`} />
        <img className='layer' src={`/parts/nose_${cat.nose}.png`} />
    </div>
}

export default LayeredImage