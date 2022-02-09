#!/usr/bin/env node

const fs = require('fs');
const util = require('util');  
const chalk = require('chalk');
const path = require('path');

// method #2
// const lstat = util.promisify(fs.lstat);

// method #3
const { lstat } = fs.promises;

const targetDir = process.argv[2] || process.cwd();

fs.readdir(targetDir, async (err, filenames) => {
    if (err) {
       console.log(err);
    }

    const statPromises = filenames.map(filename => {
        return lstat(path.join(targetDir, filename));
    });

    const allStats = await Promise.all(statPromises);

    for (let stats of allStats) {
        const index = allStats.indexOf(stats);

        if(stats.isFile()) {
            console.log(chalk.magentaBright(filenames[index]))
        } else {
            console.log(chalk.blue.bold(filenames[index]));
        }

    }

});

// method #1
// const lstat = (filename) => {
//     return new Promise((resolve, reject) => {
//         fs.lstat(filename, (err, stats) => {
//             if(err) {
//                 reject(err);
//             }
//             resolve(stats);
//         })
//     })
// }



