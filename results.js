
/* =========================================================
   NKP | BUSINESS HEALTH ASSESSMENT
   RESULTS PAGE
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       CATEGORIES
       ===================================================== */

    const categories = [

        "Operational Efficiency",

        "Financial Growth",

        "Market Position & Competitiveness",

        "Compliance & Risk Management",

        "Business Sustainability & Growth"

    ];


    /* =====================================================
       DISPLAY NAMES
       ===================================================== */

    const displayNames = {

        "Operational Efficiency":
            "Operational Efficiency",

        "Financial Growth":
            "Financial Growth",

        "Market Position & Competitiveness":
            "Market Position",

        "Compliance & Risk Management":
            "Compliance & Risk",

        "Business Sustainability & Growth":
            "Sustainability & Growth"

    };


    /* =====================================================
       GET LOCAL STORAGE DATA
       ===================================================== */

    let assessmentAnswers = {};

    try {

        assessmentAnswers =
            JSON.parse(
                localStorage.getItem(
                    "assessmentAnswers"
                )
            ) || {};

    }

    catch (error) {

        console.error(
            "Unable to read assessment answers:",
            error
        );

        assessmentAnswers = {};

    }


    /* =====================================================
       CURRENT CATEGORY
       ===================================================== */

    let currentCategory =
        localStorage.getItem(
            "resultCategory"
        );


    /* =====================================================
       CURRENT CATEGORY INDEX
       ===================================================== */

    let currentCategoryIndex =
        parseInt(
            localStorage.getItem(
                "resultCategoryIndex"
            )
        );


    if (
        isNaN(currentCategoryIndex)
    ) {

        currentCategoryIndex = 0;

    }


    /* =====================================================
       VALIDATE CATEGORY
       ===================================================== */

    if (
        !currentCategory ||
        !categories.includes(
            currentCategory
        )
    ) {

        currentCategory =
            categories[
                currentCategoryIndex
            ];

    }


    /* =====================================================
       HTML ELEMENTS
       ===================================================== */

    const scoreValue =
        document.getElementById(
            "scoreValue"
        );


    const circleScore =
        document.getElementById(
            "circleScore"
        );


    const scoreMessage =
        document.getElementById(
            "scoreMessage"
        );


    const resultTitle =
        document.getElementById(
            "resultTitle"
        );


    const resultDescription =
        document.getElementById(
            "resultDescription"
        );


    const scoreLabel =
        document.getElementById(
            "scoreLabel"
        );


    const circleLabel =
        document.getElementById(
            "circleLabel"
        );


    const categoryName =
        document.getElementById(
            "categoryName"
        );


    const categoryNumber =
        document.getElementById(
            "categoryNumber"
        );


    const questionCount =
        document.getElementById(
            "questionCount"
        );


    const completionStatus =
        document.getElementById(
            "completionStatus"
        );


    const resultEyebrow =
        document.getElementById(
            "resultEyebrow"
        );


    const nextCategoryButton =
        document.getElementById(
            "nextCategoryButton"
        );


    const finalBreakdown =
        document.getElementById(
            "finalBreakdown"
        );


    /* =====================================================
       CALCULATE CATEGORY SCORE
       ===================================================== */

    function calculateCategoryScore(
        category
    ) {

        let totalScore = 0;

        let answeredQuestions = 0;


        if (
            !assessmentAnswers[category]
        ) {

            return {

                score: 0,

                answered: 0,

                total: 25,

                rawScore: 0

            };

        }


        const subcategories =
            assessmentAnswers[
                category
            ];


        Object.keys(
            subcategories
        ).forEach(
            function (subcategory) {

                const questions =
                    subcategories[
                        subcategory
                    ];


                if (
                    !questions
                ) {

                    return;

                }


                Object.keys(
                    questions
                ).forEach(
                    function (questionIndex) {

                        const answer =
                            Number(
                                questions[
                                    questionIndex
                                ]
                            );


                        if (
                            answer >= 1 &&
                            answer <= 5
                        ) {

                            totalScore +=
                                answer;

                            answeredQuestions++;

                        }

                    }
                );

            }
        );


        const maximumScore =
            25 * 5;


        const percentage =
            Math.round(
                (
                    totalScore /
                    maximumScore
                ) * 100
            );


        return {

            score:
                percentage,

            answered:
                answeredQuestions,

            total:
                25,

            rawScore:
                totalScore

        };

    }


    /* =====================================================
       STATUS
       ===================================================== */

    function getStatus(
        score
    ) {

        if (
            score >= 80
        ) {

            return "Excellent";

        }


        if (
            score >= 60
        ) {

            return "Healthy";

        }


        if (
            score >= 40
        ) {

            return "Needs Improvement";

        }


        return "Critical";

    }


    /* =====================================================
       MESSAGE
       ===================================================== */

    function getMessage(
        score
    ) {

        if (
            score >= 80
        ) {

            return "Excellent! Your business is performing strongly in this area.";

        }


        if (
            score >= 60
        ) {

            return "Good performance. There are still opportunities to strengthen this area.";

        }


        if (
            score >= 40
        ) {

            return "This area needs attention. Focused improvements can strengthen your business.";

        }


        return "This area requires immediate attention and improvement.";

    }


    /* =====================================================
       SAVE CATEGORY SCORE
       ===================================================== */

    function saveCategoryScore() {

        const result =
            calculateCategoryScore(
                currentCategory
            );


        localStorage.setItem(

            "categoryScore_" +
            currentCategoryIndex,

            result.score

        );


        localStorage.setItem(

            "categoryRawScore_" +
            currentCategoryIndex,

            result.rawScore

        );


        localStorage.setItem(

            "categoryAnswered_" +
            currentCategoryIndex,

            result.answered

        );


        return result;

    }


    /* =====================================================
       DISPLAY CURRENT CATEGORY
       ===================================================== */

    function displayCurrentCategory() {

        const result =
            calculateCategoryScore(
                currentCategory
            );


        const score =
            result.score;


        /* ---------------------------------------------
           BASIC DETAILS
           --------------------------------------------- */

        if (resultTitle) {

            resultTitle.textContent =
                displayNames[
                    currentCategory
                ] +
                " Results";

        }


        if (resultDescription) {

            resultDescription.textContent =
                "You have successfully completed all 25 questions in this business health area.";

        }


        if (scoreLabel) {

            scoreLabel.textContent =
                "Category Health Score";

        }


        if (circleLabel) {

            circleLabel.textContent =
                "Category Score";

        }


        if (categoryName) {

            categoryName.textContent =
                displayNames[
                    currentCategory
                ];

        }


        if (categoryNumber) {

            categoryNumber.textContent =
                (
                    currentCategoryIndex +
                    1
                ) +
                " / 5";

        }


        if (questionCount) {

            questionCount.textContent =
                result.answered +
                " / 25";

        }


        if (completionStatus) {

            completionStatus.textContent =
                result.answered === 25
                    ? "Completed"
                    : "Incomplete";

        }


        if (resultEyebrow) {

            resultEyebrow.textContent =
                "CATEGORY " +
                (
                    currentCategoryIndex +
                    1
                ) +
                " COMPLETED";

        }


        /* ---------------------------------------------
           SCORE
           --------------------------------------------- */

        if (scoreValue) {

            scoreValue.textContent =
                score;

        }


        if (circleScore) {

            circleScore.textContent =
                score +
                "%";

        }


        if (scoreMessage) {

            scoreMessage.textContent =
                getMessage(
                    score
                );

        }


        /* ---------------------------------------------
           NEXT CATEGORY
           --------------------------------------------- */

        if (
            currentCategoryIndex <
            categories.length - 1
        ) {

            if (nextCategoryButton) {

                nextCategoryButton.style.display =
                    "inline-flex";

                nextCategoryButton.textContent =
                    "Next Category →";

            }

        }

        else {

            if (nextCategoryButton) {

                nextCategoryButton.style.display =
                    "none";

            }

        }


        /* ---------------------------------------------
           FINAL CATEGORY
           --------------------------------------------- */

        if (
            currentCategoryIndex ===
            categories.length - 1
        ) {

            showFinalResults();

        }

    }


    /* =====================================================
       NEXT CATEGORY
       ===================================================== */

    if (
        nextCategoryButton
    ) {

        nextCategoryButton.addEventListener(
            "click",
            function () {

                /* -------------------------------------
                   CURRENT CATEGORY SCORE
                   ------------------------------------- */

                saveCategoryScore();


                /* -------------------------------------
                   NEXT INDEX
                   ------------------------------------- */

                const nextIndex =
                    currentCategoryIndex +
                    1;


                if (
                    nextIndex >=
                    categories.length
                ) {

                    return;

                }


                /* -------------------------------------
                   NEXT CATEGORY
                   ------------------------------------- */

                const nextCategory =
                    categories[
                        nextIndex
                    ];


                /* -------------------------------------
                   SAVE NEXT CATEGORY
                   ------------------------------------- */

                localStorage.setItem(

                    "resultCategoryIndex",

                    nextIndex

                );


                localStorage.setItem(

                    "resultCategory",

                    nextCategory

                );


                localStorage.setItem(

                    "startCategory",

                    nextCategory

                );


                /* -------------------------------------
                   CLEAR OLD SUBCATEGORY
                   ------------------------------------- */

                localStorage.removeItem(
                    "selectedSubCategory"
                );


                /* -------------------------------------
                   GO TO SUBCATEGORIES
                   ------------------------------------- */

                console.log(
                    "================================"
                );


                console.log(
                    "NEXT CATEGORY"
                );


                console.log(
                    "Category:",
                    nextCategory
                );


                console.log(
                    "Category Number:",
                    nextIndex + 1
                );


                console.log(
                    "================================"
                );


                window.location.href =
                    "subcategories.html";

            }
        );

    }


    /* =====================================================
       FINAL RESULTS
       ===================================================== */

    function showFinalResults() {

        if (
            finalBreakdown
        ) {

            finalBreakdown.style.display =
                "block";

        }


        let totalScore =
            0;


        /* ---------------------------------------------
           GET ALL 5 CATEGORY SCORES
           --------------------------------------------- */

        const categoryScores = [];


        for (
            let i = 0;
            i < categories.length;
            i++
        ) {

            let categoryScore =
                Number(
                    localStorage.getItem(
                        "categoryScore_" +
                        i
                    )
                );


            /* -----------------------------------------
               IF SCORE NOT SAVED, CALCULATE
               ----------------------------------------- */

            if (
                isNaN(categoryScore)
            ) {

                const result =
                    calculateCategoryScore(
                        categories[i]
                    );


                categoryScore =
                    result.score;


                localStorage.setItem(

                    "categoryScore_" +
                    i,

                    categoryScore

                );

            }


            categoryScores.push(
                categoryScore
            );


            totalScore +=
                categoryScore;


            /* -----------------------------------------
               DISPLAY BREAKDOWN
               ----------------------------------------- */

            if (i === 0) {

                const element =
                    document.getElementById(
                        "operationalScore"
                    );


                if (element) {

                    element.textContent =
                        categoryScore +
                        "%";

                }

            }


            if (i === 1) {

                const element =
                    document.getElementById(
                        "financialScore"
                    );


                if (element) {

                    element.textContent =
                        categoryScore +
                        "%";

                }

            }


            if (i === 2) {

                const element =
                    document.getElementById(
                        "marketScore"
                    );


                if (element) {

                    element.textContent =
                        categoryScore +
                        "%";

                }

            }


            if (i === 3) {

                const element =
                    document.getElementById(
                        "complianceScore"
                    );


                if (element) {

                    element.textContent =
                        categoryScore +
                        "%";

                }

            }


            if (i === 4) {

                const element =
                    document.getElementById(
                        "sustainabilityScore"
                    );


                if (element) {

                    element.textContent =
                        categoryScore +
                        "%";

                }

            }

        }


        /* ---------------------------------------------
           FINAL AVERAGE
           --------------------------------------------- */

        const finalScore =
            Math.round(
                totalScore /
                categories.length
            );


        /* ---------------------------------------------
           DISPLAY FINAL SCORE
           --------------------------------------------- */

        if (scoreValue) {

            scoreValue.textContent =
                finalScore;

        }


        if (circleScore) {

            circleScore.textContent =
                finalScore +
                "%";

        }


        if (scoreLabel) {

            scoreLabel.textContent =
                "Final Business Health Score";

        }


        if (circleLabel) {

            circleLabel.textContent =
                "Final Score";

        }


        if (resultEyebrow) {

            resultEyebrow.textContent =
                "ASSESSMENT COMPLETED";

        }


        if (resultTitle) {

            resultTitle.textContent =
                "Your Business Health Results";

        }


        if (resultDescription) {

            resultDescription.textContent =
                "Your complete business health assessment has been successfully completed.";

        }


        if (scoreMessage) {

            scoreMessage.textContent =
                getMessage(
                    finalScore
                );

        }


        if (categoryName) {

            categoryName.textContent =
                "All 5 Business Health Areas";

        }


        if (categoryNumber) {

            categoryNumber.textContent =
                "5 / 5";

        }


        if (questionCount) {

            questionCount.textContent =
                "125 / 125";

        }


        if (completionStatus) {

            completionStatus.textContent =
                "Completed";

        }


        /* ---------------------------------------------
           SAVE FINAL RESULT
           --------------------------------------------- */

        localStorage.setItem(
            "assessmentScore",
            finalScore
        );


        localStorage.setItem(
            "assessmentComplete",
            "true"
        );


        localStorage.setItem(
            "assessmentTotalQuestions",
            "125"
        );


        localStorage.setItem(

            "assessmentTotalScore",

            Math.round(
                (
                    finalScore /
                    100
                ) * 625
            )

        );


        /* ---------------------------------------------
           HIDE NEXT BUTTON
           --------------------------------------------- */

        if (
            nextCategoryButton
        ) {

            nextCategoryButton.style.display =
                "none";

        }


        console.log(
            "======================================"
        );


        console.log(
            "NKP FINAL RESULT"
        );


        console.log(
            "Category Scores:",
            categoryScores
        );


        console.log(
            "Final Score:",
            finalScore + "%"
        );


        console.log(
            "======================================"
        );

    }


    /* =====================================================
       AI SUGGESTIONS BUTTON
       ===================================================== */

    const aiButton =
        document.getElementById(
            "aiSuggestionsButton"
        );


    if (aiButton) {

        aiButton.addEventListener(
            "click",
            function () {

                localStorage.setItem(
                    "aiFromResults",
                    "true"
                );

            }
        );

    }


    /* =====================================================
       INITIAL SAVE
       ===================================================== */

    saveCategoryScore();


    /* =====================================================
       DISPLAY RESULT
       ===================================================== */

    displayCurrentCategory();


    /* =====================================================
       DEBUG
       ===================================================== */

    console.log(
        "======================================"
    );


    console.log(
        "NKP RESULTS PAGE"
    );


    console.log(
        "Current Category:",
        currentCategory
    );


    console.log(
        "Category Number:",
        currentCategoryIndex + 1
    );


    console.log(
        "======================================"

    );

});
