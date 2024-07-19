import { CatImage } from "./layers"
import { cat_names } from "./names"

export const attriubutes_map_pets = {
    age: ["Young", "Old"],
    activeness: ["Sporty", "Lazy"],
    cuddly: ["Cuddly", "Abrasive"],
    clingy: ["Chill", "Needy"],
    size: ["Big", "Small"],
    nocturnal: ["Nocturnal", "Diurnal"],
    nice: ["Kind", "Apathetic"],
    kids: ["Good with Kids", "Bad with Kids"]
}

interface Cat{
    name: string,
    image?: CatImage
}

export const generateCat = (): Cat => {
    const newCat : Cat = {
        name: cat_names[cat_names.length * Math.random() | 0],
    }
    return newCat
}