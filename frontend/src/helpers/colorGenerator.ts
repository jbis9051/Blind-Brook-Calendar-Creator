const presetColors = [
    "#ff6347",
    "#1e90ff",
    "#ffff00",
    "#ffa500",
    "#3cb371",
    "#add8e6",
    "#ffc0cb",
    "#d6ff99",
    "#dcdcdc",
    "#fae7b5",
    "#a89de1",
    "#deb887"
];

const colorStore:{[key: number]: string } = {}

export function colorGenerator(id: number){
    if(id < presetColors.length){
        return presetColors[id];
    }
    colorStore[id] = colorStore[id] || `hsl(${Math.random() * 360}, 100%, 75%)`;
    return colorStore[id];
}
