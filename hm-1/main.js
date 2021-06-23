const fs = require("fs");
const path = require("path");

const filePath20 = path.join(__dirname, 'time-20');
const filePath18 = path.join(__dirname, 'time-18');


function creatDir() {
    fs.mkdir(path.join(__dirname, "girls"), {recursive: true}, err => {
        console.log(err)
    })
    fs.mkdir(path.join(__dirname, "boys"), {recursive: true}, err => {
        console.log(err)
    })
}

function fileRead(pathFile) {
    fs.readdir(pathFile, (err, value) => {
        if (err) {
            console.log(err);
            return;
        }
        value.map(file => {
            let valueGender = require(path.join(pathFile, file));

            creatDir()

            valueGender.gender === 'male' ?
                fs.rename(path.join(pathFile, file), path.join(__dirname, 'boys', file), err1 => {
                    if (err1) console.log(err1);
                })
                :
                fs.rename(path.join(pathFile, file), path.join(__dirname, 'girls', file), err1 => {
                    if (err1) console.log(err1);
                })
        })
    })
}

fileRead(filePath18);
fileRead(filePath20);

