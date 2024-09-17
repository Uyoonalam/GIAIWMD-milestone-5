document.addEventListener("DOMContentLoaded", function () {
    var form = document.getElementById("Resume");
    var showForm = document.getElementById("show-resume");
    var shareableLink = document.getElementById("shareable-link");
    var shareLink = document.getElementById("share-link");
    var downloadButton = document.getElementById("download-button");
    form.addEventListener("submit", function (event) {
        event.preventDefault();
        var username = document.getElementById('username').value;
        var names = document.getElementById('name').value;
        var email = document.getElementById('email').value;
        var phone = document.getElementById('phone').value;
        var education = document.getElementById('education').value;
        var workExperience = document.getElementById('work-experience').value;
        var skills = document.getElementById('skills').value;
        var data = {
            name: names,
            email: email,
            phone: phone,
            education: education,
            workExperience: workExperience,
            skills: skills
        };
        // Save data to localStorage
        localStorage.setItem(username, JSON.stringify(data));
        var resume = "\n            <h1><b>Resume</b></h1>\n            <h3>Personal Information</h3>\n            <p>Name:<span contenteditable=\"true\"> ".concat(names, "</span></p>\n            <p>Email:<span contenteditable=\"true\"> ").concat(email, "</span></p>\n            <p>Phone:<span contenteditable=\"true\"> ").concat(phone, "</span></p>\n            <h3>Educational Information</h3>\n            <p><span>").concat(education, "</span></p>\n            <h3>Work Experience</h3>\n            <p><span contenteditable=\"true\">").concat(workExperience, "</span></p>\n            <h3>Skills</h3>\n            <p><span contenteditable=\"true\">").concat(skills, "</span></p>\n        ");
        // Display the resume
        if (showForm) {
            showForm.innerHTML = resume;
            showForm.style.display = "block";
        }
        // Create shareable link
        var shareURL = "".concat(window.location.origin).concat(window.location.pathname, "?username=").concat(encodeURIComponent(username));
        shareableLink.style.display = "block";
        shareLink.href = shareURL; // Set the correct shareable URL
        shareLink.textContent = shareURL;
    });
    // Download button handler
    downloadButton.addEventListener('click', function () {
        window.print();
    });
    // Autofill form if the user comes from a shareable link
    var urlParams = new URLSearchParams(window.location.search);
    var username = urlParams.get('username');
    if (username) {
        var savedResumeData = localStorage.getItem(username);
        if (savedResumeData) {
            var resumeData = JSON.parse(savedResumeData);
            // Fill form fields
            document.getElementById('username').value = username;
            document.getElementById('name').value = resumeData.name;
            document.getElementById('email').value = resumeData.email;
            document.getElementById('phone').value = resumeData.phone;
            document.getElementById('education').value = resumeData.education;
            document.getElementById('work-experience').value = resumeData.workExperience;
            document.getElementById('skills').value = resumeData.skills;
            // Automatically display the resume
            var resume = "\n                <h1><b>Resume</b></h1>\n                <h3>Personal Information</h3>\n                <p>Name:<span contenteditable=\"true\">".concat(resumeData.name, "</span></p>\n                <p>Email:<span contenteditable=\"true\">").concat(resumeData.email, "</span></p>\n                <p>Phone:<span contenteditable=\"true\">").concat(resumeData.phone, "</span></p>\n                <h3>Educational Information</h3>\n                <p><span>").concat(resumeData.education, "</span></p>\n                <h3>Work Experience</h3>\n                <p><span contenteditable=\"true\">").concat(resumeData.workExperience, "</span></p>\n                <h3>Skills</h3>\n                <p><span contenteditable=\"true\">").concat(resumeData.skills, "</span></p>\n            ");
            if (showForm) {
                showForm.innerHTML = resume;
                showForm.style.display = "block";
            }
        }
    }
});
