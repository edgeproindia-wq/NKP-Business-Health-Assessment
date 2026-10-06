/* =========================================
   NKP | REPORTS & PROGRESS
   ========================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* =====================================
       GET SAVED DATA
    ===================================== */

    const businessName =
        localStorage.getItem("businessName") ||
        "Your Business";

    const score =
        Number(
            localStorage.getItem("assessmentScore")
        ) || 0;

    const category =
        localStorage.getItem("assessmentCategory") ||
        localStorage.getItem("startCategory") ||
        "Business Assessment";


    /* =====================================
       GET HTML ELEMENTS
    ===================================== */

    const latestScore =
        document.getElementById("latestScore");

    const assessmentCount =
        document.getElementById("assessmentCount");

    const progressValue =
        document.getElementById("progressValue");

    const businessNameElement =
        document.getElementById("businessName");

    const currentScore =
        document.getElementById("currentScore");

    const assessmentHistory =
        document.getElementById("assessmentHistory");

    const progressRing =
        document.getElementById("progressRing");


    /* =====================================
       BASIC DATA
    ===================================== */

    if (latestScore) {
        latestScore.textContent =
            score + "%";
    }

    if (currentScore) {
        currentScore.textContent =
            score + "%";
    }

    if (businessNameElement) {
        businessNameElement.textContent =
            businessName;
    }


    /* =====================================
       ASSESSMENT HISTORY
    ===================================== */

    let history = [];

    try {

        history =
            JSON.parse(
                localStorage.getItem(
                    "assessmentHistory"
                )
            ) || [];

    } catch (error) {

        history = [];

    }


    /* =====================================
       CREATE CURRENT REPORT
    ===================================== */

    if (score > 0) {

        const currentId =
            category + "-" + score;


        const exists =
            history.some(
                function (item) {

                    return item.id === currentId;

                }
            );


        if (!exists) {

            const newAssessment = {

                id: currentId,

                date:
                    new Date().toLocaleDateString(
                        "en-IN",
                        {
                            day: "2-digit",
                            month: "short",
                            year: "numeric"
                        }
                    ),

                category:
                    category,

                scope:
                    "All Subcategories",

                score:
                    score

            };


            history.push(
                newAssessment
            );


            localStorage.setItem(
                "assessmentHistory",
                JSON.stringify(history)
            );

        }

    }


    /* =====================================
       ASSESSMENT COUNT
    ===================================== */

    if (assessmentCount) {

        assessmentCount.textContent =
            history.length;

    }


    /* =====================================
       PROGRESS
    ===================================== */

    let progress = score;


    if (history.length >= 2) {

        const firstScore =
            Number(history[0].score) || 0;

        const latestHistoryScore =
            Number(
                history[
                    history.length - 1
                ].score
            ) || 0;


        if (firstScore > 0) {

            progress =
                Math.round(
                    (
                        (
                            latestHistoryScore -
                            firstScore
                        ) /
                        firstScore
                    ) * 100
                );

        }

    }


    if (progressValue) {

        if (progress > 0) {

            progressValue.textContent =
                "+" + progress + "%";

        } else {

            progressValue.textContent =
                progress + "%";

        }

    }


    /* =====================================
       CATEGORY HEALTH
    ===================================== */

    updateHealth(
        "operationalScore",
        "operationalBar",
        score
    );

    updateHealth(
        "financialScore",
        "financialBar",
        score
    );

    updateHealth(
        "marketScore",
        "marketBar",
        score
    );

    updateHealth(
        "complianceScore",
        "complianceBar",
        score
    );

    updateHealth(
        "sustainabilityScore",
        "sustainabilityBar",
        score
    );


    /* =====================================
       HISTORY TABLE
    ===================================== */

    if (assessmentHistory) {

        assessmentHistory.innerHTML = "";


        if (history.length === 0) {

            assessmentHistory.innerHTML = `
                <tr>
                    <td colspan="5">
                        No assessment completed yet.
                    </td>
                </tr>
            `;

        } else {

            const reversedHistory =
                [...history].reverse();


            reversedHistory.forEach(
                function (item) {

                    let status;


                    if (item.score >= 80) {

                        status =
                            "Strong";

                    } else if (
                        item.score >= 60
                    ) {

                        status =
                            "Healthy";

                    } else if (
                        item.score >= 40
                    ) {

                        status =
                            "Needs Improvement";

                    } else {

                        status =
                            "Needs Attention";

                    }


                    const row =
                        document.createElement("tr");


                    row.innerHTML = `

                        <td>
                            ${item.date}
                        </td>

                        <td>
                            ${item.category}
                        </td>

                        <td>
                            ${item.scope ||
                            "All Subcategories"}
                        </td>

                        <td>
                            <strong>
                                ${item.score}%
                            </strong>
                        </td>

                        <td>
                            <span class="status-text">
                                ${status}
                            </span>
                        </td>

                    `;


                    assessmentHistory.appendChild(
                        row
                    );

                }
            );

        }

    }


    /* =====================================
       PROGRESS RING
    ===================================== */

    if (progressRing) {

        const ringScore =
            Math.max(
                0,
                Math.min(
                    100,
                    score
                )
            );


        const degrees =
            ringScore * 3.6;


        progressRing.style.background =
            `
            conic-gradient(
                #16a34a 0deg,
                #2563eb ${degrees}deg,
                #dce7e2 ${degrees}deg,
                #dce7e2 360deg
            )
            `;


        const ringNumber =
            progressRing.querySelector(
                "strong"
            );


        if (ringNumber) {

            ringNumber.textContent =
                score + "%";

        }

    }


    /* =====================================
       NEW ASSESSMENT
    ===================================== */

    const newAssessmentBtn =
        document.getElementById(
            "newAssessmentBtn"
        );


    if (newAssessmentBtn) {

        newAssessmentBtn.addEventListener(
            "click",
            function () {

                localStorage.removeItem(
                    "assessmentAnswers"
                );

                localStorage.removeItem(
                    "selectedSubCategory"
                );

                localStorage.removeItem(
                    "startCategory"
                );

                window.location.href =
                    "categories.html";

            }
        );

    }


    /* =====================================
       DASHBOARD
    ===================================== */

    const dashboardBtn =
        document.getElementById(
            "dashboardBtn"
        );


    if (dashboardBtn) {

        dashboardBtn.addEventListener(
            "click",
            function () {

                window.location.href =
                    "dashboard.html";

            }
        );

    }


    console.log(
        "NKP Reports loaded successfully."
    );

    console.log(
        "Score:",
        score
    );

});


/* =========================================
   HEALTH FUNCTION
========================================= */

function updateHealth(
    scoreId,
    barId,
    score
) {

    const scoreElement =
        document.getElementById(
            scoreId
        );

    const barElement =
        document.getElementById(
            barId
        );


    if (scoreElement) {

        scoreElement.textContent =
            score + "%";

    }


    if (barElement) {

        barElement.style.width =
            score + "%";

    }

}