import { CatImage } from "../data/layers"

interface Props {
    cat: CatImage
}

const LayeredImage: React.FC<Props> = ({cat}) => {

    return <div className="grid grid-cols-1">
        <img className='col-start-1 row-start-1' src={`/parts/bg_${cat.background}.png`} />
        <img className='col-start-1 row-start-1' src={`/parts/body_${cat.body}.png`} />
        <img className='col-start-1 row-start-1' src={`/parts/eyes_${cat.eyes}.png`} />
        <img className='col-start-1 row-start-1' src={`/parts/mouth_${cat.mouth}.png`} />
        <img className='col-start-1 row-start-1' src={`/parts/nose_${cat.nose}.png`} />
    </div>
}

export default LayeredImage