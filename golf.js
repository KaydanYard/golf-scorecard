var select = document.getElementById('courseSelect');
var courseId;

var course = JSON.parse(window.localStorage.getItem('course'));

class Player {
  constructor(name, id = getNextId(), scores = []) {
    this.name = name;
    this.id = id;
    this.scores = scores;
  }
}

getAvailableCourses();
render();

/*
* Functions
*/

function render() {
// options-container
  coursedName = select.options[select.selectedIndex].text;
  document.getElementById('courseName').innerHTML = coursedName;
  save();
}

function save() {
  window.localStorage.setItem('course', JSON.stringify(course)); 
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
  // blue
  let blueHolesHtml = `<tr id="blueRow">`;
  let blueOutCounter = 0; 
  course.data.holes.forEach((hole, idx) => {
    if (idx == 0) {
      blueHolesHtml +=
      `<th scope="row">
        Blue
      </th>
      <td id='blue${idx}'>
        ${hole.teeBoxes[1].yards}
      </td>`
    }
    else if (idx == 9) {
      blueHolesHtml += 
        `<td>
          ${blueOutCounter}
        </td>
        <td id='blue${idx}'>
          ${hole.teeBoxes[1].yards}
        </td>`
    } 
    else {
      blueHolesHtml += 
      `<td id='blue${idx}'>
        ${hole.teeBoxes[1].yards}
      </td>`
      blueOutCounter += hole.teeBoxes[1].yards;
    }  
  });
  blueHolesHtml += `</tr>`;
  document.getElementById('blueRowContainer').innerHTML = blueHolesHtml;
  
  // white
  let whiteHolesHtml = `<tr id="whiteRow">`;
  let whiteOutCounter = 0; 
  course.data.holes.forEach((hole, idx) => {
    if (idx == 0) {
      whiteHolesHtml +=
      `<th scope="row">
        White
      </th>
      <td id='white${idx}'>
        ${hole.teeBoxes[2].yards}
      </td>`
    }
    else if (idx == 9) {
      whiteHolesHtml += 
        `<td>
          ${whiteOutCounter}
        </td>
        <td id='white${idx}'>
          ${hole.teeBoxes[2].yards}
        </td>`
    } 
    else {
      whiteHolesHtml += 
      `<td id='white${idx}'>
        ${hole.teeBoxes[2].yards}
      </td>`
      whiteOutCounter += hole.teeBoxes[2].yards;
    }  
  });
  whiteHolesHtml += `</tr>`;
  document.getElementById('whiteRowContainer').innerHTML = whiteHolesHtml;
  
  // mensHandicap
  let mhandiHolesHtml = `<tr id="mhandiRow">`;
  let mhandiOutCounter = 0; 
  course.data.holes.forEach((hole, idx) => {
    if (idx == 0) {
      mhandiHolesHtml +=
      `<th scope="row">
      Men's Handicap
      </th>
      <td id='mhandi${idx}'>
        ${hole.teeBoxes[2].hcp}
      </td>`
    }
    else if (idx == 9) {
      mhandiHolesHtml += 
        `<td>
          ${mhandiOutCounter}
        </td>
        <td id='mhandi${idx}'>
          ${hole.teeBoxes[2].hcp}
        </td>`
    } 
    else {
      mhandiHolesHtml += 
      `<td id='mhandi${idx}'>
        ${hole.teeBoxes[2].hcp}
      </td>`
      mhandiOutCounter += hole.teeBoxes[2].hcp;
    }  
  });
  mhandiHolesHtml += `</tr>`;
  document.getElementById('mhandiRowContainer').innerHTML = mhandiHolesHtml;
  
  //par
  let parHolesHtml = `<tr id="parRow">`;
  let parOutCounter = 0; 
  course.data.holes.forEach((hole, idx) => {
    if (idx == 0) {
      parHolesHtml +=
      `<th scope="row">
        Par
      </th>
      <td id='par${idx}'>
        ${hole.teeBoxes[2].par}
      </td>`
    }
    else if (idx == 9) {
      parHolesHtml += 
        `<td>
          ${parOutCounter}
        </td>
        <td id='par${idx}'>
          ${hole.teeBoxes[2].par}
        </td>`
    } 
    else {
      parHolesHtml += 
      `<td id='par${idx}'>
        ${hole.teeBoxes[2].par}
      </td>`
      parOutCounter += hole.teeBoxes[2].par;
    }  
  });
  parHolesHtml += `</tr>`;
  document.getElementById('parRowContainer').innerHTML = parHolesHtml;

  // red
  let redHolesHtml = `<tr id="redRow">`;
  let redOutCounter = 0; 
  course.data.holes.forEach((hole, idx) => {
    if (idx == 0) {
      redHolesHtml +=
      `<th scope="row">
        Red
      </th>
      <td id='red${idx}'>
        ${hole.teeBoxes[3].yards}
      </td>`
    }
    else if (idx == 9) {
      redHolesHtml += 
        `<td>
          ${redOutCounter}
        </td>
        <td id='red${idx}'>
          ${hole.teeBoxes[3].yards}
        </td>`
    } 
    else {
      redHolesHtml += 
      `<td id='red${idx}'>
        ${hole.teeBoxes[3].yards}
      </td>`
      redOutCounter += hole.teeBoxes[3].yards;
    }  
  });
  redHolesHtml += `</tr>`;
  document.getElementById('redRowContainer').innerHTML = redHolesHtml;
  
  // ladiesHandicap
  let lhandiHolesHtml = `<tr id="lhandiRow">`;
  let lhandiOutCounter = 0; 
  course.data.holes.forEach((hole, idx) => {
    if (idx == 0) {
      lhandiHolesHtml +=
      `<th scope="row">
        Ladies' Handicap
      </th>
      <td id='lhandi${idx}'>
        ${hole.teeBoxes[3].hcp}
      </td>`
    }
    else if (idx == 9) {
      lhandiHolesHtml += 
        `<td>
          ${lhandiOutCounter}
        </td>
        <td id='lhandi${idx}'>
          ${hole.teeBoxes[3].hcp}
        </td>`
    } 
    else {
      lhandiHolesHtml += 
      `<td id='lhandi${idx}'>
        ${hole.teeBoxes[3].hcp}
      </td>`
      lhandiOutCounter += hole.teeBoxes[3].hcp;
    }  
  });
  lhandiHolesHtml += `</tr>`;
  document.getElementById('lhandiRowContainer').innerHTML = lhandiHolesHtml;
}