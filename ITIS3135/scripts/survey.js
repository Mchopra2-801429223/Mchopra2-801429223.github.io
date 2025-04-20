function finishIntro(html, data) {
  const form = document.getElementById("introForm");
  const courses = document.querySelectorAll("input[name='course']");
  html += `<p><strong>Personal Background:</strong> ${data.get("personal")}</p>`;
  html += `<p><strong>Professional Background:</strong> ${data.get("professional")}</p>`;
  html += `<p><strong>Academic Background:</strong> ${data.get("academic")}</p>`;
  html += `<p><strong>Web Dev Background:</strong> ${data.get("webdev")}</p>`;
  html += `<p><strong>Primary Platform:</strong> ${data.get("platform")}</p>`;
  html += `<p><strong>Courses Taking:</strong> <ul>`;
  courses.forEach((c) => {
    if (c.value.trim() !== "") html += `<li>${c.value}</li>`;
  });
  html += `</ul></p>`;
  html += `<p><strong>Funny Thing:</strong> ${data.get("funny")}</p>`;
  html += `<p><strong>Anything Else:</strong> ${data.get("else")}</p>`;
  html += `<button onclick="location.reload()">Reset Form</button>`;

  form.style.display = "none";
  document.getElementById("output").innerHTML = html;
}


document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("introForm");
  const output = document.getElementById("output");

  // Handle form submission
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    if (!document.getElementById("agree").checked) {
      alert("You must agree to the terms.");
      return;
    }

    const data = new FormData(form);
    const imageFile = data.get("image");

    let html = `<h2>${data.get("name")}'s Introduction</h2>`;
    html += `<p><strong>Mascot:</strong> ${data.get("mascot")}</p>`;

    if (imageFile && imageFile.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = function (e) {
        html += `<img src="${e.target.result}" alt="User Image" style="max-width:300px;"><br>`;
        html += `<p><strong>Image Caption:</strong> ${data.get("caption")}</p>`;
        finishIntro(html, data);
      };
      reader.readAsDataURL(imageFile);
    } else {
      alert("Please upload a valid image file (PNG/JPG).");
    }
  });

  // Reset handler
  form.addEventListener("reset", () => {
    output.innerHTML = "";
    form.style.display = "block";
  });

  // Add course input dynamically
  document.getElementById("addCourse").addEventListener("click", () => {
    const courseDiv = document.createElement("div");
    const input = document.createElement("input");
    input.type = "text";
    input.name = "course";
    const delBtn = document.createElement("button");
    delBtn.textContent = "Delete";
    delBtn.type = "button";
    delBtn.addEventListener("click", () => courseDiv.remove());
    courseDiv.appendChild(input);
    courseDiv.appendChild(delBtn);
    document.getElementById("courses").appendChild(courseDiv);
  });
});

