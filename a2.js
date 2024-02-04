const collegeData = require('./modules/collegeData');

collegeData.initialize()
    .then(() => {   
             
        collegeData.getAllStudents()
            .then(students => {
                console.log(`Successfully retrieved ${students.length} students`);
            })
            .catch(error => {
                console.error(`Error retrieving students: ${error}`);
            });

        collegeData.getCourses()
            .then(courses => {
                console.log(`Successfully retrieved ${courses.length} courses`);
            })
            .catch(error => {
                console.error(`Error retrieving courses: ${error}`);
            });

        collegeData.getTAs()
            .then(tas => {
                console.log(`Successfully retrieved ${tas.length} TAs`);
            })
            .catch(error => {
                console.error(`Error retrieving TAs: ${error}`);
            });
    })
    .catch(error => {
        console.error(`Initialization failed: ${error}`);
    });
