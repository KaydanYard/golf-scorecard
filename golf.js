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

/*
* Functions
*/

function render() {
// options-container
  coursedName = select.options[select.selectedIndex].text;
  document.getElementById('courseName').innerHTML = coursedName;
}

function getAvailableCourses() {
  return fetch('https://golf-courses-api.herokuapp.com/courses/').then(
    function(response) {
      return response.json();
    }
  )
}

function setCourseId() {
  let courseId = courseSelect.options[courseSelect.selectedIndex].value;
  let teebox = teeSelect.options[teeSelect.selectedIndex].value;  
  console.log(teebox);
  getCourse(courseId, teebox);
}

function getCourse(id, teeType) {
  console.log(id);
  render();
  return new Promise((resolve, reject) => {
    fetch(`https://golf-courses-api.herokuapp.com/courses/${id}`)
      .then((response) => response.json())
      .then(function (course) {
        console.log(course);
        fillSheetValues(course, teeType);
      })
      .then((data) => resolve(data));
  });
}

function fillSheetValues(course, teeId) {
  if(course.data.id == '19002') {
    teeId -= '1';
  }
  let holesHtml = `<tr id="${teeId}Row">`;
  let OutCounter = 0; 
  course.data.holes.forEach((hole, idx) => {
    if (idx == 0) {
      holesHtml +=
      `<th scope="row">
        ${course.data.holes[0].teeBoxes[teeId].teeType}
      </th>
      <td id='${teeId}${idx}'>
        ${hole.teeBoxes[teeId].yards}
      </td>`
    }
    else if (idx == 9) {
      holesHtml += 
        `<td>
          ${OutCounter}
        </td>
        <td id='${teeId}${idx}'>
          ${hole.teeBoxes[teeId].yards}
        </td>`
    } 
    else if (idx == 17) {
      holesHtml += 
        `<td id='${teeId}${idx}'>
          ${hole.teeBoxes[teeId].yards}
        </td>
        <td>
          ${OutCounter}
        </td>`
    } 
    else {
      holesHtml += 
      `<td id='${teeId}${idx}'>
        ${hole.teeBoxes[teeId].yards}
      </td>`
      OutCounter += hole.teeBoxes[teeId].yards;
    }  
  });
  holesHtml += `</tr>`;
  if(course.data.id == '19002') {
    if(teeId == 0) {
      document.getElementById('blueRowContainer').innerHTML = holesHtml;
      document.getElementById('redRowContainer').innerHTML = null;
      document.getElementById('whiteRowContainer').innerHTML = null;
    } else if (teeId == 1) {
      document.getElementById('whiteRowContainer').innerHTML = holesHtml;
      document.getElementById('blueRowContainer').innerHTML = null;
      document.getElementById('redRowContainer').innerHTML = null;
    } else if (teeId == 2) {
      document.getElementById('redRowContainer').innerHTML = holesHtml;
      document.getElementById('blueRowContainer').innerHTML = null;
      document.getElementById('whiteRowContainer').innerHTML = null;
    }
  } else {
    if(teeId == 1) {
      document.getElementById('blueRowContainer').innerHTML = holesHtml;
      document.getElementById('redRowContainer').innerHTML = null;
      document.getElementById('whiteRowContainer').innerHTML = null;
    } else if (teeId == 2) {
      document.getElementById('whiteRowContainer').innerHTML = holesHtml;
      document.getElementById('blueRowContainer').innerHTML = null;
      document.getElementById('redRowContainer').innerHTML = null;
    } else if (teeId == 3) {
      document.getElementById('redRowContainer').innerHTML = holesHtml;
      document.getElementById('blueRowContainer').innerHTML = null;
      document.getElementById('whiteRowContainer').innerHTML = null;
    }
  }

  let parHtml = `<tr id="parRow">`;
  let parOutCounter = 0; 
  course.data.holes.forEach((hole, idx) => {
    if (idx == 0) {
      parHtml +=
      `<th scope="row">
        Par
      </th>
      <td id='par${idx}'>
        ${hole.teeBoxes[teeId].par}
      </td>`
    }
    else if (idx == 9) {
      parHtml += 
        `<td>
          ${parOutCounter}
        </td>
        <td id='par${idx}'>
          ${hole.teeBoxes[teeId].par}
        </td>`
    } 
    else if (idx == 17) {
      parHtml += 
        `<td id='par${idx}'>
          ${hole.teeBoxes[teeId].par}
        </td>
        <td>
          ${parOutCounter}
        </td>`
    } 
    else {
      parHtml += 
      `<td id='par${idx}'>
        ${hole.teeBoxes[teeId].par}
      </td>`
      parOutCounter += hole.teeBoxes[teeId].par;
    }  
  });
  parHtml += `</tr>`;
  document.getElementById('parRowContainer').innerHTML = parHtml;

let handiHtml = `<tr id="handiRow">`;
  let handiOutCounter = 0; 
  course.data.holes.forEach((hole, idx) => {
    if (idx == 0) {
      handiHtml +=
      `<th scope="row">
        Handicap
      </th>
      <td id='handi${idx}'>
        ${hole.teeBoxes[teeId].hcp}
      </td>`
    }
    else if (idx == 9) {
      handiHtml += 
        `<td>
          ${handiOutCounter}
        </td>
        <td id='handi${idx}'>
          ${hole.teeBoxes[teeId].hcp}
        </td>`
    } 
    else if (idx == 17) {
      handiHtml += 
        `<td id='handi${idx}'>
          ${hole.teeBoxes[teeId].hcp}
        </td>
        <td>
          ${handiOutCounter}
        </td>`
    } 
    else {
      handiHtml += 
      `<td id='handi${idx}'>
        ${hole.teeBoxes[teeId].hcp}
      </td>`
      handiOutCounter += hole.teeBoxes[teeId].hcp;
    }  
  });
  handiHtml += `</tr>`;
  document.getElementById('handiRowContainer').innerHTML = handiHtml;
}

function setPlayer() {
  console.log("player set")
  let player = new Player;
}