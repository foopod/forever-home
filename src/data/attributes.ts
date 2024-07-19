import { CatImage } from "./layers"
import { cat_names } from "./names"

export const attriubutes_map_pets = {
    activeness: ["Sporty", "Lazy"],
    cuddly: ["Yes", "No"],
    clingy: ["Chill", "Needy"],
    size: ["Big", "Small"],
    age: ["Young", "Old"],
    nocturnal: ["Yes", "No"],
    nice: ["Kind", "Apathetic"]
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