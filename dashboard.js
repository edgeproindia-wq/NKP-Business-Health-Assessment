

const loggedIn = localStorage.getItem("loggedIn");

if (loggedIn !== "true") {
    window.location.href = "login.html";
}


/* =========================================================
   ELEMENTS
   ========================================================= */

const userNameElement = document.getElementById("userName");
const profileAvatar = document.getElementById("profileAvatar");

const businessNameElement = document.getElementById("businessName");
const industryElement = document.getElementById("industry");
const employeesElement = document.getElementById("employees");
const locationElement = document.getElementById("businessLocation");

const startAssessmentBtn =
    document.getElementById("startAssessmentBtn");

const activityStartBtn =
    document.getElementById("activityStartBtn");

const logoutBtn =
    document.getElementById("logoutBtn");

const assessmentNav =
    document.getElementById("assessmentNav");


/* =========================================================
   SAFE TEXT HELPER
   ========================================================= */

function setText(element, value, fallback) {

    if (!element) {
        return;
    }

    element.textContent =
        value || fallback;

}


/* =========================================================
   LOAD USER DATA
   ========================================================= */

const savedUserName =
    localStorage.getItem("userName");

setText(
    userNameElement,
    savedUserName,
    "User"
);


if (profileAvatar) {

    profileAvatar.textContent =
        savedUserName
            ? savedUserName.charAt(0).toUpperCase()
            : "U";

}


/* =========================================================
   LOAD BUSINESS DATA
   ========================================================= */

const savedBusinessName =
    localStorage.getItem("businessName");

const savedIndustry =
    localStorage.getItem("industry");

const savedEmployees =
    localStorage.getItem("employees");

const savedLocation =
    localStorage.getItem("businessLocation");


setText(
    businessNameElement,
    savedBusinessName,
    "Your Business"
);

setText(
    industryElement,
    savedIndustry,
    "Not specified"
);

setText(
    employeesElement,
    savedEmployees,
    "—"
);

setText(
    locationElement,
    savedLocation,
    "Not specified"
);


/* =========================================================
   OPEN ASSESSMENT
   ========================================================= */

function openAssessment() {

    window.location.href =
        "categories.html";

}


/* =========================================================
   START NEW ASSESSMENT
   ========================================================= */

function startNewAssessment() {

    const existingAnswers =
        localStorage.getItem("assessmentAnswers");


    if (existingAnswers) {

        const continueExisting =
            confirm(
                "You already have assessment progress.\n\n" +
                "OK = Continue existing assessment\n" +
                "Cancel = Start a new assessment"
            );


        if (continueExisting) {

            openAssessment();

            return;

        }

    }


    /*
       Clear old assessment data
    */

    localStorage.removeItem(
        "startCategory"
    );

    localStorage.removeItem(
        "selectedSubCategory"
    );

    localStorage.removeItem(
        "assessmentAnswers"
    );

    localStorage.removeItem(
        "assessmentScore"
    );

    localStorage.removeItem(
        "categoryResults"
    );

    localStorage.removeItem(
        "completedCategories"
    );


    openAssessment();

}


/* =========================================================
   START ASSESSMENT BUTTON
   ========================================================= */

if (startAssessmentBtn) {

    startAssessmentBtn.addEventListener(
        "click",
        function (event) {

            event.preventDefault();

            startNewAssessment();

        }
    );

}


/* =========================================================
   ACTIVITY START BUTTON
   ========================================================= */

if (activityStartBtn) {

    activityStartBtn.addEventListener(
        "click",
        function (event) {

            event.preventDefault();

            startNewAssessment();

        }
    );

}


/* =========================================================
   ASSESSMENTS NAVIGATION
   ========================================================= */

if (assessmentNav) {

    assessmentNav.addEventListener(
        "click",
        function (event) {

            event.preventDefault();

            openAssessment();

        }
    );

}


/* =========================================================
   HEALTH AREA CARDS
   ========================================================= */

const healthCards =
    document.querySelectorAll(
        ".health-card"
    );


healthCards.forEach(
    function (card) {

        card.addEventListener(
            "click",
            function () {

                const category =
                    card.dataset.category;


                if (!category) {

                    console.warn(
                        "No category found."
                    );

                    return;

                }


                /*
                   Save selected category
                */

                localStorage.setItem(
                    "startCategory",
                    category
                );


                /*
                   Remove previous subcategory
                */

                localStorage.removeItem(
                    "selectedSubCategory"
                );


                /*
                   Open subcategories
                */

                window.location.href =
                    "subcategories.html";

            }
        );

    }
);


/* =========================================================
   SIDEBAR NAVIGATION
   ========================================================= */

const sidebarItems =
    document.querySelectorAll(
        ".sidebar-nav .nav-item"
    );


sidebarItems.forEach(
    function (item) {

        const label =
            item
                .querySelector("span:last-child")
                ?.textContent
                .trim()
                .toLowerCase();


        if (!label) {
            return;
        }


        /* -------------------------
           REPORTS
           ------------------------- */

        if (label === "reports") {

            item.addEventListener(
                "click",
                function (event) {

                    event.preventDefault();

                    window.location.href =
                        "reports.html";

                }
            );

        }


        /* -------------------------
           AI INSIGHTS
           ------------------------- */

        if (label === "ai insights") {

            item.addEventListener(
                "click",
                function (event) {

                    event.preventDefault();

                    window.location.href =
                        "ai-insights.html";

                }
            );

        }


        /* -------------------------
           SETTINGS
           ------------------------- */

        if (label === "settings") {

            item.addEventListener(
                "click",
                function (event) {

                    event.preventDefault();

                    window.location.href =
                        "business-setup.html";

                }
            );

        }

    }
);


/* =========================================================
   VIEW DETAILS / VIEW ALL
   ========================================================= */

const viewDetailsButtons =
    document.querySelectorAll(
        ".view-details"
    );


viewDetailsButtons.forEach(
    function (button, index) {

        button.addEventListener(
            "click",
            function (event) {

                event.preventDefault();


                /*
                   First button:
                   Business Details
                */

                if (index === 0) {

                    window.location.href =
                        "business-setup.html";

                    return;

                }


                /*
                   Second button:
                   Assessment Reports
                */

                if (index === 1) {

                    window.location.href =
                        "reports.html";

                    return;

                }

            }
        );

    }
);


/* =========================================================
   VIEW GUIDE
   ========================================================= */

const guideButtons =
    document.querySelectorAll(
        ".secondary-btn"
    );


guideButtons.forEach(
    function (button) {

        button.addEventListener(
            "click",
            function (event) {

                event.preventDefault();


                alert(
                    "NKP Assessment Guide\n\n" +

                    "1. Select a business health category.\n" +

                    "2. Select a subcategory.\n" +

                    "3. Answer 5 questions.\n" +

                    "4. Complete all 5 subcategories.\n" +

                    "5. View your category result.\n" +

                    "6. Continue to the next category.\n\n" +

                    "After all 5 categories are completed, " +

                    "NKP will generate your final assessment " +

                    "and AI-powered recommendations."
                );

            }
        );

    }
);


/* =========================================================
   PROFILE
   ========================================================= */

const profile =
    document.querySelector(
        ".profile"
    );


if (profile) {

    profile.addEventListener(
        "click",
        function () {

            window.location.href =
                "business-setup.html";

        }
    );

}


/* =========================================================
   NOTIFICATION
   ========================================================= */

const notificationBtn =
    document.querySelector(
        ".notification-btn"
    );


if (notificationBtn) {

    notificationBtn.addEventListener(
        "click",
        function () {

            alert(
                "No new notifications."
            );

        }
    );

}


/* =========================================================
   MOBILE MENU
   ========================================================= */

const mobileMenu =
    document.querySelector(
        ".mobile-menu"
    );

const sidebar =
    document.querySelector(
        ".sidebar"
    );


if (mobileMenu && sidebar) {

    mobileMenu.addEventListener(
        "click",
        function () {

            sidebar.classList.toggle(
                "mobile-open"
            );

        }
    );

}


/* =========================================================
   LOGOUT
   ========================================================= */

if (logoutBtn) {

    logoutBtn.addEventListener(
        "click",
        function (event) {

            event.preventDefault();


            const confirmLogout =
                confirm(
                    "Are you sure you want to logout?"
                );


            if (!confirmLogout) {

                return;

            }


            /*
               Remove login information
            */

            localStorage.removeItem(
                "loggedIn"
            );

            localStorage.removeItem(
                "userEmail"
            );

            localStorage.removeItem(
                "userName"
            );

            localStorage.removeItem(
                "userPhone"
            );

            localStorage.removeItem(
                "userId"
            );


            /*
               Go to login
            */

            window.location.href =
                "login.html";

        }
    );

}


/* =========================================================
   DASHBOARD LOADED
   ========================================================= */

console.log(
    "NKP Dashboard loaded successfully."
);
