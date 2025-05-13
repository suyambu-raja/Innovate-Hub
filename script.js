
window.addEventListener("DOMContentLoaded", function () {
    //for home page
    var menu_bar = document.querySelector("#menu-bar")
    var x_bar = document.querySelector("#x-bar")
    var navbar_links = document.querySelector(".navbar-links")
    var login = document.querySelector('.login')
    var logoutUser = document.querySelector('.logoutUser')
    const personName = document.querySelector('.personName')

    menu_bar.addEventListener("click", function () {
        x_bar.style.display = "block"
        menu_bar.style.display = "none"
        navbar_links.style.left = "0"
    })

    x_bar.addEventListener("click", function () {
        menu_bar.style.display = "block"
        x_bar.style.display = "none"
        navbar_links.style.left = "-60%"
    })

    var summary_container = document.querySelector(".summary-container")
    var summary = summary_container.querySelectorAll(".summary-1")

    for (var i = 0; i < summary.length; i++) {
        var more = summary[i].querySelector(".more")
        var less = summary[i].querySelector(".less")

        more.addEventListener("click", function (event) {
            event.target.closest('.summary-1').style.height = "500px"
            event.target.style.display = "none"
            var near_less = event.target.closest('.summary-1').querySelector(".less")
            near_less.style.display = "block"
        })

        less.addEventListener("click", function (event) {
            event.target.closest('.summary-1').style.height = "280px"
            event.target.style.display = "none"
            var near_more = event.target.closest('.summary-1').querySelector(".more")
            near_more.style.display = "block"
        })

    }


    var main_domain_container = document.querySelector(".main-domain-container")
    var domain_container = main_domain_container.querySelectorAll(".domain-container")
    for (let i = 0; i < domain_container.length; i++) {

        let domain_card = domain_container[i]

        domain_card.addEventListener("mouseover", function (event) {
            let explore = event.target.closest('.domain-container').querySelector(".explore-btn")
            explore.style.display = "block"
        })
        domain_card.addEventListener("mouseleave", function (event) {
            let explore = event.target.closest('.domain-container').querySelector(".explore-btn")
            explore.style.display = "none"
        })
    }

    //for Explore page
    var choose_domain = document.querySelector(".categories-searchbar")
    choose_domain.addEventListener("keyup", function choose() {
        for (let i = 0; i < domain_container.length; i++) {

            let texts = choose_domain.value.toUpperCase()
            let explore_bttn = domain_container[i].querySelector(".explore-btn")
            let domain_name = domain_container[i].querySelector(".domain-name")
            domain_name.style.transform = "translateX(27%)"
            explore_bttn.style.transform = "translateX(170%)"
            explore_bttn.style.top = "-27%"

            if (domain_name.textContent.toUpperCase().indexOf(texts) < 0) {
                domain_container[i].style.display = "none"
            }
            else {
                domain_container[i].style.display = "block"
            }

        }
    })

    var exploreButtons = document.querySelectorAll(".explore-btn");
    exploreButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            var domainName = button.closest(".domain-container").querySelector(".domain-name").textContent;
            localStorage.setItem("selectedDomain", domainName);
            window.location.href = "visiter.html";
        });
    });

    var arrow_btn = document.querySelector(".arrow-btn")
    arrow_btn.addEventListener("click", function () {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })

    })
})



// Handle Signup
if (document.querySelector(".signup-form")) {
    document.querySelector(".signup-form").addEventListener("submit", function (e) {
        e.preventDefault();

        const fullName = this.querySelector("input[placeholder='Full Name']").value.trim();
        const email = this.querySelector("input[placeholder='Email']").value.trim();
        const password = this.querySelector("input[placeholder='Password']").value;
        const confirmPassword = this.querySelector("input[placeholder='Confirm Password']").value;

        if (!fullName || !email || !password || !confirmPassword) {
            alert("Please fill all the fields.");
            return;
        }

        if (!email.includes("@")) {
            alert("Please enter a valid email address.");
            return;
        }

        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        let users = JSON.parse(localStorage.getItem("users")) || [];

        // Check if full name already exists
        if (users.some(user => user.fullName === fullName)) {
            alert("User name already exists. Try logging in.");
            return;
        }

        users.push({ fullName, email, password });
        localStorage.setItem("users", JSON.stringify(users));

        alert("Signup successful! You can now log in.");
        window.location.href = "signin.html";
    });
}

// Handle Login
if (document.querySelector(".login-form")) {
    document.querySelector(".login-form").addEventListener("submit", function (e) {
        e.preventDefault();

        const input = this.querySelector("input[placeholder='Username']").value.trim();
        const password = this.querySelector("input[placeholder='Password']").value;

        if (!input || !password) {
            alert("Please enter both username and password.");
            return;
        }

        let users = JSON.parse(localStorage.getItem("users")) || [];

        const matchedUser = users.find(user =>
            (user.fullName === input || user.email === input) &&
            user.password === password
        );

        if (matchedUser) {
            localStorage.setItem("loggedInUser", JSON.stringify(matchedUser));
            alert("Login successful!");
            window.location.href = "index.html"; // change this if needed
        } else {
            alert("Invalid username or password.");
        }
    });
}

// Handle Logout (you can call this on a logout button click)
function logoutUser() {
    localStorage.removeItem("loggedInUser");
    alert("Logged out successfully.");
    window.location.href = "signin.html"; // change to login page
}

window.addEventListener("DOMContentLoaded", () => {
    const userDisplay = document.querySelector(".personName");
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

    if (userDisplay && loggedInUser) {
        userDisplay.textContent = loggedInUser.fullName;
    } else {
        userDisplay.textContent = "Guest"; // Optional fallback
    }
});

// Profile & submit page
window.addEventListener("DOMContentLoaded", function () {
    let show_profile = document.querySelector("#show-profile");
    let hide_profile = document.querySelector("#hide-profile");
    let profile_access_item = document.querySelector(".profile-access-items");

    show_profile.addEventListener("click", function () {
        profile_access_item.style.display = "block";
        hide_profile.style.display = "block";
        show_profile.style.display = "none";
    });

    hide_profile.addEventListener("click", function () {
        profile_access_item.style.display = "none";
        hide_profile.style.display = "none";
        show_profile.style.display = "block";
    });

    let content_inp = document.querySelector(".content-inp");
    content_inp.addEventListener("input", function () {
        content_inp.style.height = "auto";
        content_inp.style.height = this.scrollHeight + "px";
    });

    let choosen_img = document.querySelector("#choosen-img");
    let idea_img = document.querySelector(".idea-img");
    choosen_img.addEventListener("change", function () {
        idea_img.src = URL.createObjectURL(choosen_img.files[0]);
        idea_img.style.display = "block";
    });

    let content_page = document.querySelector(".content-page");
    let content_holder = document.querySelector(".content-holder");
    let project_share_btn = document.querySelector(".project-share-btn");
    let project_share = document.querySelector(".project-share");
    let post_btn = document.querySelector(".post-btn");
    let page_close_btn = document.querySelector(".page-close-btn");

    project_share_btn.addEventListener("click", function () {
        content_page.style.display = "block";
        content_holder.style.display = "block";
    });

    project_share.addEventListener("click", function () {
        content_page.style.display = "block";
        content_holder.style.display = "block";
    });

    page_close_btn.addEventListener("click", function () {
        content_page.style.display = "none";
        content_holder.style.display = "none";
    });

    let project_content_container_1 = document.querySelector(".project-content-container-1");
    let domain_inp = document.querySelector(".domain-inp");
    let name_inp = document.querySelector(".name-inp");


    let addProjectToDOM = (project) => {
        let new_div = document.createElement("div");
        new_div.setAttribute("class", "project-content-container-2");
        new_div.innerHTML = `
            <div class='name-box'>
                <h3>Project Name:</h3>
                <p>${project.name}</p>
            </div>
            <div class='domain-box'>
                <h3>Domain:</h3>
                <p>${project.domain}</p>
            </div>
            <div class='idea-box'>
                <h4>Project Explanation</h4>
                <p>${project.idea}</p>
            </div>
            <div class='img-box'>
                <h4>Project Image</h4>
                <img src='${project.image}' alt="Project Image" style="max-width: 100%; height: auto; border: 1px solid #ccc;">
            </div>
            <div class='project-remover-div'>
                <button class='project-remover'>Remove project</button>
            </div>
        `;


        project_content_container_1.appendChild(new_div);


        new_div.querySelector(".project-remover").addEventListener("click", function () {
            if (confirm("Are you sure you want to remove this project?")) {
                new_div.remove();

                // Remove from localStorage
                let projects = JSON.parse(localStorage.getItem("projects")) || [];
                projects = projects.filter(p =>
                    !(p.name === project.name &&
                        p.domain === project.domain &&
                        p.idea === project.idea &&
                        p.image === project.image)
                );
                localStorage.setItem("projects", JSON.stringify(projects));
            }
        });
    };


    let savedProjects = JSON.parse(localStorage.getItem("projects")) || [];
    savedProjects.forEach(project => {
        addProjectToDOM(project);
    });



    post_btn.addEventListener("click", function () {
        if (domain_inp.value !== "") {
            content_page.style.display = "none";
            content_holder.style.display = "none";

            let reader = new FileReader();
            let newProject = {
                name: name_inp.value,
                domain: domain_inp.value,
                idea: content_inp.value,
                image: ""
            };

            let addProjectToDOM = (project) => {
                let new_div = document.createElement("div");
                new_div.setAttribute("class", "project-content-container-2");
                new_div.innerHTML = `
                <div class='name-box'>
                    <h3>Project Name:</h3>
                    <p>${project.name}</p>
                </div>
                <div class='domain-box'>
                    <h3>Domain:</h3>
                    <p>${project.domain}</p>
                </div>
                <div class='idea-box'>
                    <h4>Project Explanation</h4>
                    <p>${project.idea}</p>
                </div>
                <div class='img-box'>
                    <h4>Project Image</h4>
                    <img src='${project.image}'>
                </div>
                <div class='project-remover-div'>
                    <button class='project-remover'>Remove project</button>
                </div>
            `;
                project_content_container_1.append(new_div);

                new_div.querySelector(".project-remover").addEventListener("click", function () {
                    if (confirm("Are you sure you want to remove this project?")) {
                        new_div.remove();

                        let projects = JSON.parse(localStorage.getItem("projects")) || [];
                        projects = projects.filter(p =>
                            !(p.name === project.name &&
                                p.domain === project.domain &&
                                p.idea === project.idea)
                        );
                        localStorage.setItem("projects", JSON.stringify(projects));
                    }
                });
            };

            reader.onload = function (e) {
                newProject.image = e.target.result;

                let projects = JSON.parse(localStorage.getItem("projects")) || [];
                projects.push(newProject);
                localStorage.setItem("projects", JSON.stringify(projects));

                addProjectToDOM(newProject);
            };

            if (choosen_img.files[0]) {
                reader.readAsDataURL(choosen_img.files[0]);
            } else {
                let projects = JSON.parse(localStorage.getItem("projects")) || [];
                projects.push(newProject);
                localStorage.setItem("projects", JSON.stringify(projects));
                addProjectToDOM(newProject);
            }

            name_inp.value = "";
            domain_inp.value = "";
            content_inp.value = "";
            choosen_img.value = "";
            idea_img.style.display = "none";
        }
        else {
            alert("fill out this fields")
        }


    });



});


//visiter page
window.addEventListener("DOMContentLoaded", function () {
    let whole_domain_container = document.querySelector(".whole-domain-container");
    let domain_divs = whole_domain_container.querySelectorAll("div");

    let projects = JSON.parse(localStorage.getItem("projects")) || [];
    let commentsData = JSON.parse(localStorage.getItem("commentsData")) || {};

    projects.forEach(project => {
        let related_domain = project.domain.toUpperCase();

        for (let i = 0; i < domain_divs.length; i++) {
            let domain_heading = domain_divs[i].querySelector("h1");

            if (domain_heading && domain_heading.textContent.toUpperCase().includes(related_domain)) {
                let new_div = document.createElement("div");
                new_div.setAttribute("class", "project-content-container-2");
                new_div.innerHTML = `
                    <div class='name-box'>
                        <h3>Project Name:</h3>
                        <p>${project.name}</p>
                    </div>
                    <div class='domain-box'>
                        <h3>Domain:</h3>
                        <p>${project.domain}</p>
                    </div>
                    <div class='idea-box'>
                        <h4>Project Explanation</h4>
                        <p>${project.idea}</p>
                    </div>
                    <div class='img-box'>
                        <h4>Project Image</h4>
                        <img src='${project.image}'>
                    </div>
                    <div class='comments-box-container'>
                        <textarea class='comment-inp' placeholder='Add your comment'></textarea>
                        <div class='star-rating'>
                            <i class="fas fa-star star"></i>
                            <i class="fas fa-star star"></i>
                            <i class="fas fa-star star"></i>
                            <i class="fas fa-star star"></i>
                            <i class="fas fa-star star"></i>
                        </div>
                        <button class='comment-btn'>Comment</button>
                        <div class='comments-box'></div>
                    </div>
                `;
                domain_divs[i].append(new_div);

                let comment_btn = new_div.querySelector(".comment-btn");
                let comment_inp = new_div.querySelector(".comment-inp");
                let stars = new_div.querySelectorAll(".star");
                let comments_box = new_div.querySelector(".comments-box");

                let selectedRating = 0;
                stars.forEach((star, index) => {
                    star.addEventListener("click", () => {
                        selectedRating = index + 1;
                        stars.forEach((s, i) => {
                            s.style.color = i < selectedRating ? "gold" : "gray";
                        });
                    });
                });

                // Load existing comments for this project
                if (commentsData[project.name]) {
                    commentsData[project.name].forEach(({ comment, rating }) => {
                        let div = document.createElement("div");
                        div.className = "add-comment";
                        div.innerHTML = `
                            <div class='rating-container'>
                                <h3 class='personName'>Guest</h3>
                                <div class='star-rating'>
                                ${'<i class="fas fa-star star select "></i>'.repeat(rating)}
                                ${'<i class="fas fa-star star"></i>'.repeat(5 - rating)}</div>
                            </div>
                            <div class='added-comments'>
                                <p>${comment}</p>
                            </div>
                        `;
                        comments_box.append(div);
                    });
                    window.addEventListener("DOMContentLoaded", () => {
                        const userDisplay = document.querySelector(".personName");
                        const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

                        if (userDisplay && loggedInUser) {
                            userDisplay.textContent = loggedInUser.fullName;
                        } else {
                            userDisplay.textContent = "Guest"; // Optional fallback
                        }
                    });
                }

                comment_btn.addEventListener("click", () => {
                    let comment = comment_inp.value.trim();
                    if (comment === "" || selectedRating === 0) {
                        alert("Please enter a comment and select a rating.");
                        return;
                    }

                    // Store in localStorage
                    if (!commentsData[project.name]) {
                        commentsData[project.name] = [];
                    }

                    commentsData[project.name].push({ comment, rating: selectedRating });
                    localStorage.setItem("commentsData", JSON.stringify(commentsData));

                    // Add to UI
                    let new_comment = document.createElement("div");
                    new_comment.className = "add-comment";
                    new_comment.innerHTML = `
                        <div class='rating-container'>
                            <h3 class='personName'>Guest</h3>
                            <div class='star-rating'>
                            ${'<i class="fas fa-star star select"></i>'.repeat(selectedRating)}
                            ${'<i class="fas fa-star star"></i>'.repeat(5 - selectedRating)}</div>
                        </div>
                        <div class='added-comments'>
                            <p>${comment}</p>
                        </div>
                    `;
                    comments_box.append(new_comment);
                    comment_inp.value = "";
                    selectedRating = 0;
                    stars.forEach(s => s.style.color = "gray");
                });

                break;
            }
        }
    });

});


window.addEventListener("DOMContentLoaded", function () {

    var selectedDomain = localStorage.getItem("selectedDomain");


    if (selectedDomain) {

        var domainBlocks = document.querySelectorAll(".whole-domain-container > div");


        domainBlocks.forEach(function (block) {
            var heading = block.querySelector("h1");


            if (heading && heading.textContent.trim().toLowerCase() !== selectedDomain.trim().toLowerCase()) {
                block.style.display = "none";
            } else {
                block.style.display = "block";
                block.style.display = "flex"
            }
        });
    }
});








