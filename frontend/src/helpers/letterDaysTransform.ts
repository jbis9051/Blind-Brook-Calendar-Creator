export function letterDaysTransform(letterDays: string){
    return letterDays.split(",").map(letter => letter.trim())
}
