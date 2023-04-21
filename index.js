const express = require("express");
const app = express();

const Joi = require("joi");

const courses = [
  { id: 1, name: "Programming Fundamentals" },
  { id: 2, name: "Data Structures & Algorithms" },
  { id: 3, name: "Operating System" },
];

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Home page");
});

app.get("/api/courses", (req, res) => {
  res.send(courses);
});

app.post("/api/courses", (req, res) => {
  console.log(req.body.name);
  const course = {
    id: courses.length + 1,
    name: req.body.name,
  };
  courses.push(course);
  res.send(courses);
});

app.put("/api/courses/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  const index = courses.indexOf(course);
});

app.delete("/api/courses/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) return res.status(404).send("Can't find course");
  const index = courses.indexOf(course);
  courses.splice(index, 1);
  res.send(courses);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`http://localhost:${PORT}`));

const validateSchema = (course) => {
  let schema = {
    name: Joi.string().min(3).required(),
  };

  return Joi.validate(course, schema);
};
