#!/usr/bin/env node
// import chalk from 'chalk';

const fs = require('fs');
const util = require('util');  
const chalk = require('chalk');
// chalk.enabled = true;
// chalk.level = 3;

FORCE_COLOR=true

// method #2
// const lstat = util.promisify(fs.lstat);

// method #3
const { lstat } = fs.promises;

fs.readdir(process.cwd(), async (err, filenames) => {
    if (err) {
       console.log(err);
    }

    const statPromises = filenames.map(filename => {
        return lstat(filename);
    });

    const allStats = await Promise.all(statPromises);

    for (let stats of allStats) {
        const index = allStats.indexOf(stats);

        if(stats.isFile()) {
            console.log(chalk.magentaBright(filenames[index]))
        } else {
            console.log(chalk.bold(filenames[index]));
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

