const backgrounds =  ['blue', 'red'] as const
const bodies = ["brown", "tan"] as const
const eyes = ["black", "gold"] as const
const mouths = ["whiskers", "open"] as const
const noses = ["bland", "brown"] as const

export interface CatImage {
    background : typeof backgrounds[number],
    body : typeof bodies[number],
    eyes : typeof eyes[number],
    mouth : typeof mouths[number],
    nose : typeof noses[number],
} 

export const generateCatImage = () : CatImage => {
    const random_cat: CatImage = {
        background: backgrounds[backgrounds.length * Math.random() | 0],
        body: bodies[bodies.length * Math.random() | 0],
        eyes: eyes[eyes.length * Math.random() | 0],
        mouth: mouths[mouths.length * Math.random() | 0],
        nose: noses[noses.length * Math.random() | 0]
    }
    return random_cat
}