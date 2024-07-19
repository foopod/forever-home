import layers from "./layers.json"

export interface PetImage {
    base : typeof layers.bases[number],
    eyes : typeof layers.eyes[number],
    mouth : typeof layers.mouths[number],
    nose : typeof layers.noses[number],
    ears : typeof layers.noses[number],
    accessory: typeof layers.accessories[number]
} 

export const generatePetImage = () : PetImage => {
    const random_cat: PetImage = {
        base: layers.bases[layers.bases.length * Math.random() | 0],
        eyes: layers.eyes[layers.eyes.length * Math.random() | 0],
        mouth: layers.mouths[layers.mouths.length * Math.random() | 0],
        nose: layers.noses[layers.noses.length * Math.random() | 0],
        ears: layers.ears[layers.ears.length * Math.random() | 0],
        accessory: layers.accessories[layers.accessories.length * Math.random() | 0],
    }
    return random_cat
}