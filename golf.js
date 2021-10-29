var select = document.getElementById('courseSelect');
var courseId;

class Player {
  constructor(name, id = getNextId(), scores = []) {
    this.name = name;
    this.id = id;
    this.scores = scores;
  }
}

getAvailableCourses();
render();

function render() {
// options-container
  coursedName = select.options[select.selectedIndex].text;
  document.getElementById('courseName').innerHTML = coursedName;

// scorecard-container
  
}

function getAvailableCourses() {
  return fetch('https://golf-courses-api.herokuapp.com/courses/').then(
    function(response) {
      return response.json();
    }
  )
}

function setCourseId(courseId) {
  courseId = select.options[select.selectedIndex].value;
  getCourse(courseId);
}

function getCourse(id) {
  console.log(id);
  render();
  return new Promise((resolve, reject) => {
    fetch(`https://golf-courses-api.herokuapp.com/courses/${id}`)
      .then((response) => response.json())
      .then(function (course) {
        console.log(course);
        fillSheetValues(course);
      })
      .then((data) => resolve(data));
  });
}

function fillSheetValues(course) {
  console.log(course.data.name);
}