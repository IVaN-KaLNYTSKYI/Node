const path = require('path');
const fs = require('fs');

const filePath20 = path.join(__dirname, 'time-20');
const filePath18 = path.join(__dirname, 'time-18');


function fileRead(path) {
    fs.readdir(path, (err, value) => {
        if (err) {
            console.log(err);
            return;
        }
        value.map(file => {
            fs.rename(`${path}/${file}`, `${path === filePath18 ? filePath20 : filePath18}/${file}`, err1 => {
                if (err1) console.log(err1);
            })
        })
    })
}

fileRead(filePath18);
fileRead(filePath20);