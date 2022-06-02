const express = require('express');
const app = express();
const Joi = require('joi');
const func = require('joi/lib/types/func');

app.use(express.json());

// create an array
const courses = [
    {id : 1, name : "course 1"},
    {id : 2, name : "course 2"},
    {id : 3, name : "course 3"}
];




app.get('/', (req,res) => {
    res.send("hello worldd");
});

app.get('/api/courses', (req,res) => {
    res.send(courses)
});

app.post('/api/courses', (req,res) => {
    const { error } = validateCourse(req.body);

    if(error) return res.status(400).send(result.error.details[0].message);

    const course = {
        id : courses.length+1,
        name : req.body.name
    };
    courses.push(course);
    res.send(course);
});

app.put('/api/courses/:id', (req, res) => {
    // check if the id is exist
    const course = courses.find(c => c.id === parseInt(req.params.id));
    // 404
    if (!course) return res.status(404).send(`the courses with the id ${req.params.id} does not exist`);
           
    // validate error
    const { error } = validateCourse(req.body);

    if(error) return res.status(400).send(error.details[0].message);

    // Update course and return the updated 
    course.name = req.body.name;
    res.send(course);

})

app.get('/api/courses/:id', (req,res) => {
    // check if id exist
    const course = courses.find(c => c.id === parseInt(req.params.id));
    // 404
    if (!course) return res.status(404).send(`the courses with the id ${req.params.id} does not exist`);
    res.send(course);
});


app.delete('/api/courses/:id', (req, res) => {
     // check if the id is exist
     const course = courses.find(c => c.id === parseInt(req.params.id));
     // 404
     if (!course) return res.status(404).send(`the courses with the id ${req.params.id} does not exist`);
    
    // delete
    const index = courses.indexOf(course);
    courses.splice(index,1);

    res.send(course);
})

// Validate func
function validateCourse(course) {
    const schema = {
        name : Joi.string().min(3).required()
    }

    return Joi.validate(course, schema);
}


// PORT
const port = process.env.PORT || 3000;

// run the server
app.listen(port, () => console.log(`listen to port ${port}`))