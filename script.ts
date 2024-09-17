document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("Resume") as HTMLFormElement;
    const showForm = document.getElementById("show-resume") as HTMLDivElement;
    const shareableLink = document.getElementById("shareable-link") as HTMLDivElement;
    const shareLink = document.getElementById("share-link") as HTMLAnchorElement;
    const downloadButton = document.getElementById("download-button") as HTMLButtonElement;

    form.addEventListener("submit", function (event: Event) {
        event.preventDefault();

        const username = (document.getElementById('username') as HTMLInputElement).value;
        const names = (document.getElementById('name') as HTMLInputElement).value;
        const email = (document.getElementById('email') as HTMLInputElement).value;
        const phone = (document.getElementById('phone') as HTMLInputElement).value;
        const education = (document.getElementById('education') as HTMLTextAreaElement).value;
        const workExperience = (document.getElementById('work-experience') as HTMLTextAreaElement).value;
        const skills = (document.getElementById('skills') as HTMLTextAreaElement).value;

        const data = {
            name: names,
            email,
            phone,
            education,
            workExperience,
            skills
        };

        // Save data to localStorage
        localStorage.setItem(username, JSON.stringify(data));

        const resume = `
            <h1><b>Resume</b></h1>
            <h3>Personal Information</h3>
            <p>Name:<span contenteditable="true"> ${names}</span></p>
            <p>Email:<span contenteditable="true"> ${email}</span></p>
            <p>Phone:<span contenteditable="true"> ${phone}</span></p>
            <h3>Educational Information</h3>
            <p><span>${education}</span></p>
            <h3>Work Experience</h3>
            <p><span contenteditable="true">${workExperience}</span></p>
            <h3>Skills</h3>
            <p><span contenteditable="true">${skills}</span></p>
        `;

        // Display the resume
        if (showForm) {
            showForm.innerHTML = resume;
            showForm.style.display = "block";
        }

        // Create shareable link
        const shareURL = `${window.location.origin}${window.location.pathname}?username=${encodeURIComponent(username)}`;
        shareableLink.style.display = "block";
        shareLink.href = shareURL;  // Set the correct shareable URL
        shareLink.textContent = shareURL;
    });

    // Download button handler
    downloadButton.addEventListener('click', () => {
        window.print();
    });

    // Autofill form if the user comes from a shareable link
    const urlParams = new URLSearchParams(window.location.search);
    const username = urlParams.get('username');

    if (username) {
        const savedResumeData = localStorage.getItem(username);
        if (savedResumeData) {
            const resumeData = JSON.parse(savedResumeData);

            // Fill form fields
            (document.getElementById('username') as HTMLInputElement).value = username;
            (document.getElementById('name') as HTMLInputElement).value = resumeData.name;
            (document.getElementById('email') as HTMLInputElement).value = resumeData.email;
            (document.getElementById('phone') as HTMLInputElement).value = resumeData.phone;
            (document.getElementById('education') as HTMLTextAreaElement).value = resumeData.education;
            (document.getElementById('work-experience') as HTMLTextAreaElement).value = resumeData.workExperience;
            (document.getElementById('skills') as HTMLTextAreaElement).value = resumeData.skills;

            // Automatically display the resume
            const resume = `
                <h1><b>Resume</b></h1>
                <h3>Personal Information</h3>
                <p>Name:<span contenteditable="true">${resumeData.name}</span></p>
                <p>Email:<span contenteditable="true">${resumeData.email}</span></p>
                <p>Phone:<span contenteditable="true">${resumeData.phone}</span></p>
                <h3>Educational Information</h3>
                <p><span>${resumeData.education}</span></p>
                <h3>Work Experience</h3>
                <p><span contenteditable="true">${resumeData.workExperience}</span></p>
                <h3>Skills</h3>
                <p><span contenteditable="true">${resumeData.skills}</span></p>
            `;

            if (showForm) {
                showForm.innerHTML = resume;
                showForm.style.display = "block";
            }
        }
    }
});
