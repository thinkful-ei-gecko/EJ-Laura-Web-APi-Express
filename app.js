const express = require('express');
const morgan = require('morgan');

const app = express();
app.use(morgan('dev'));

app.get('/', (req, res) => {
    res.send('Hello welcome to my first project using Node and Express!');
});

app.get('/sum', (req, res) => {
    const a = parseInt(req.query.a);
    const b = parseInt(req.query.b);
    const c =  `The sum of a and b is ${a + b}`;

    res.send(c);
});

app.get('/cipher', (req, res) => {
    let text = req.query.text.split('');
    const shift = parseInt(req.query.shift);
    console.log(shift);
    let newText = text.map(letter => {
        let code = letter.charCodeAt();
        let add = code + shift;
        let convertedLetter = String.fromCharCode(add);
        return convertedLetter;
    });
    newText = newText.join('');
    const cipher = `The new cipher is "${newText}"`;
    res.send(cipher);
});

app.get('/lotto', (req, res) => {

    let arrOfNumbers = [];
    let winningNumbers = [];
    let chanceOfWinning = 0;
    let resultMessage = '';
    for (let i = 0; i < 6; i++){
        arrOfNumbers.push(parseInt(req.query.arr[i]));
        winningNumbers.push(Math.floor(Math.random() * 20));

        if (arrOfNumbers[i] === winningNumbers[i]){
            chanceOfWinning++;
        }
    }
    console.log(arrOfNumbers);
    console.log(winningNumbers);
    console.log(chanceOfWinning);

    if (chanceOfWinning < 4) {
        resultMessage = 'Sorry, try again!'
    } else if (chanceOfWinning === 4) {
        resultMessage = 'Congratulations, you win a free ticket for next week!'
    } else if (chanceOfWinning === 5) {
        resultMessage = 'Congratulations! You win 100 vBucks!'
    } else {
        resultMessage = 'Wow! Unbelievable! You won the mega millions!'
    }

    res.send(`
    <p>You chose these numbers: ${arrOfNumbers}</p>
    <p>The winning numbers are: ${winningNumbers}</p>
    <p>${resultMessage} (numbers correct: ${chanceOfWinning})</p>
    `);
})

app.listen(8000, () => {
    console.log('Express server is listening on port 8000!');
});