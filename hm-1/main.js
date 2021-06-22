const fs = require("fs");
const path = require("path");

const filePath20 = path.join(__dirname, 'time-20');
const filePath18 = path.join(__dirname, 'time-18');

const filePathBoys = path.join(__dirname, 'boys');
const filePathGirls = path.join(__dirname, 'girls');


function fileRead(path) {
    fs.readdir(path, (err, value) => {
        if (err) {
            console.log(err);
            return;
        }
        value.map(file => {
            let valueGender = require(`${path}/${file}`);

            valueGender.gender === 'male' ?
                fs.rename(`${path}/${file}`, `${filePathBoys}/${file}`, err1 => {
                    if (err1) console.log(err1);
                })
                :
                fs.rename(`${path}/${file}`, `${filePathGirls}/${file}`, err1 => {
                    if (err1) console.log(err1);
                })

        })
    })
}

fileRead(filePath18);
fileRead(filePath20);

