
function randomColorCodeGenerate() {
    const color = [];

    const decimalToHex = {
        10: 'A',
        11: 'B',
        12: 'C',
        13: 'D',
        14: 'E',
        15: 'F'
    };

    for (let i = 0; i < 6; i++) {
        const random = Math.floor(Math.random() * 16);
        color.push(random);
    }

    color.forEach((value, ind) => {
        Object.keys(decimalToHex).forEach(num => {
            (+num === value) && (color[ind] = decimalToHex[num]);
        });
    });

    return `#${color.join('')}`;
}



const root = document.querySelector(':root');
const changeButton = document.querySelector('.change-button');

changeButton.addEventListener('click', () => {
    const mainColor = randomColorCodeGenerate();
    root.style.setProperty('--main-color', mainColor);

    const secondColor = randomColorCodeGenerate();
    root.style.setProperty('--second-color', secondColor);

    document.querySelector('tr:nth-child(2n)').style.background = `${secondColor}22`;
});