var select = document.getElementById('courseSelect');
var courseId;

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
      .then((data) => resolve(data));
  });
}