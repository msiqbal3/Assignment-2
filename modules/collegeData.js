const fs = require('fs');

class Data {
    constructor(students, courses) {
        this.students = students;
        this.courses = courses;
    }
}

let dataCollection = null;

function readFilePromise(filePath) {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf8', (err, dataFromFile) => {
            if (err) {
                reject(`Unable to read ${filePath}`);
                return;
            }
            try {
                const data = JSON.parse(dataFromFile);
                resolve(data);
            } catch (parseError) {
                reject(`Error parsing JSON from ${filePath}`);
            }
        });
    });
}

function initialize() {
    return Promise.all([
        readFilePromise('./data/students.json'),
        readFilePromise('./data/courses.json')
    ]).then(([studentDataFromFile, courseDataFromFile]) => {
        dataCollection = new Data(studentDataFromFile, courseDataFromFile);
    });
}

function getAllStudents() {
    return new Promise((resolve, reject) => {
        if (dataCollection && dataCollection.students.length > 0) {
            resolve(dataCollection.students);
        } else {
            reject("No results returned");
        }
    });
}

function getTAs() {
    return new Promise((resolve, reject) => {
        if (dataCollection && dataCollection.students.length > 0) {
            const tas = dataCollection.students.filter(student => student.TA === true);
            if (tas.length > 0) {
                resolve(tas);
            } else {
                reject("No results returned");
            }
        } else {
            reject("No results returned");
        }
    });
}

function getCourses() {
    return new Promise((resolve, reject) => {
        if (dataCollection && dataCollection.courses.length > 0) {
            resolve(dataCollection.courses);
        } else {
            reject("No results returned");
        }
    });
}

module.exports = {
    initialize,
    getAllStudents,
    getTAs,
    getCourses
};
