function verifyStudent() {
  const idInput = document.getElementById('identifier');
  const id = idInput.value.trim().toLowerCase();
  const resultBox = document.getElementById('result');

  if (!id) return alert('Please enter a valid Email ID');

  showSpinner(true);

  setTimeout(() => {
    const students = {
      "varsha@gmail.com": {
        name: "Varsha Shivanand",
        email: "varsha@gmail.com",
        mobile: "7629662877",
        domain: "Web Development",
        college: "Fictional Institute",
        start: "01 July 2025",
        duration: "1 Month",
        photo: "dummy.png",
        assignments: [true, true, true, true],
        certificate: "#"
      },
      "aditya@gmail.com": {
        name: "Aditya Gupta",
        email: "aditya@gmail.com",
        mobile: "9826186927",
        domain: "Python Programming",
        college: "Dummy College",
        start: "01 July 2025",
        duration: "1 Month",
        photo: "dummy.png",
        assignments: [true, true, false, false],
        certificate: "#"
      },
      "riya@gmail.com": {
        name: "Riya Sharma",
        email: "riya@gmail.com",
        mobile: "7287337337",
        domain: "App Development",
        college: "Dummy University",
        start: "15 July 2025",
        duration: "1 Month",
        photo: "dummy.png",
        assignments: [true, false, true, true],
        certificate: "#"
      }
    };

    const student = students[id];

    if (!student) {
      showSpinner(false);
      return alert("No student found with that email.");
    }

    const assignments = student.assignments;
    let statusText = "";
    let cardClass = "";

    const allCompleted = assignments.every(val => val === true);

    const inProgress = (() => {
      for (let k = 1; k <= 3; k++) {
        const prefix = assignments.slice(0, -k);
        const suffix = assignments.slice(-k);
        if (
          prefix.length > 0 &&
          prefix.every(val => val === true) &&
          suffix.every(val => val === false)
        ) {
          return true;
        }
      }
      return false;
    })();

    if (allCompleted) {
      statusText = "Completed";
      cardClass = "completed";
    } else if (inProgress) {
      statusText = "In Progress";
      cardClass = "in-progress";
    } else {
      statusText = "Not Completed";
      cardClass = "not-completed";
    }

    const showCertificate = statusText === "Completed"
      ? `<a href="https://example.com">View Certificate</a>`
      : '';

    const html = `
      <div class="card ${cardClass}">
        <img src="${student.photo}" alt="Photo" />
        <h3>${student.name}</h3>
        <p><b>Email: </b>${student.email}</p>
        <p><b>Mobile: </b> ${student.mobile}</p>
        <p><b>Domain: </b> ${student.domain}</p>
        <p><b>College: </b> ${student.college}</p>
        <p><b>Start Date: </b>${student.start}</p>
        <p><b>Duration: </b> ${student.duration}</p>
        <h4>Assignment Status</h4>
        <div class="assignment-status">
          ${assignments.map((done, i) => `<span>A${i + 1}: ${done ? '✅' : '❌'}</span>`).join('')}
        </div>
        <p><strong>Status:</strong> ${statusText}</p>
        ${showCertificate}
      </div>
    `;

    resultBox.innerHTML = html;
    showSpinner(false);
    showToast(`✅ Data loaded for ${student.name}`);
  }, 1000);
}

function showToast(msg) {
  const toast = document.getElementById('toast');
  toast.innerText = msg;
  toast.className = 'toast show';
  setTimeout(() => toast.className = 'toast', 1800);
}

function showSpinner(show) {
  document.querySelector('.spinner').style.display = show ? 'block' : 'none';
}
