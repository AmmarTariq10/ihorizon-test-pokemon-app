export const getPokemonImageUrl = url => {
    const urlParts = url.split('/')
    const id = urlParts[urlParts.length - 2] // this will get the id of pokemon from url and we can use that to construct our image url see getPokemonImageUrl in helperFunctions for definition
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
}
export const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1)
}