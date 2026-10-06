

const categoryTitle =
    document.getElementById("categoryTitle");

const subcategoryTitle =
    document.getElementById("subcategoryTitle");

const questionNumber =
    document.getElementById("questionNumber");

const questionText =
    document.getElementById("questionText");

const optionsContainer =
    document.getElementById("optionsContainer");

const progressBar =
    document.getElementById("progressBar");

const progressText =
    document.getElementById("progressText");

const previousBtn =
    document.getElementById("previousBtn");

const nextBtn =
    document.getElementById("nextBtn");


/* =========================================================
   CATEGORIES
   ========================================================= */

const categories = [

    "Operational Efficiency",

    "Financial Growth",

    "Market Position & Competitiveness",

    "Compliance & Risk Management",

    "Business Sustainability & Growth"

];


/* =========================================================
   QUESTION BANK
   ========================================================= */

const questionBank = {

    /* =====================================================
       CATEGORY 1
       OPERATIONAL EFFICIENCY
       ===================================================== */

    "Operational Efficiency": {

        "Process Efficiency": [

            "Are your daily business processes clearly defined?",

            "Do you regularly review your business processes?",

            "Can your daily operations be completed without unnecessary delays?",

            "Do you have standard procedures for important business activities?",

            "Are operational problems identified and corrected quickly?"

        ],


        "Resource Management": [

            "Do you use your business resources efficiently?",

            "Do you regularly monitor resource usage?",

            "Are business materials available when needed?",

            "Do you avoid unnecessary resource wastage?",

            "Do you have a system for managing important resources?"

        ],


        "Workforce Productivity": [

            "Do employees clearly understand their responsibilities?",

            "Do you regularly monitor employee performance?",

            "Are employees productive during working hours?",

            "Do employees receive enough training?",

            "Do you recognize and address productivity problems?"

        ],


        "Inventory & Supply Chain": [

            "Do you regularly monitor inventory levels?",

            "Do you maintain accurate inventory records?",

            "Are your suppliers reliable?",

            "Do you avoid both overstocking and stock shortages?",

            "Do you have backup suppliers for important materials?"

        ],


        "Technology & Automation": [

            "Do you use technology to improve business operations?",

            "Are important business records maintained digitally?",

            "Do you use software to reduce manual work?",

            "Do you regularly update your business technology?",

            "Are your employees comfortable using business technology?"

        ]

    },


    /* =====================================================
       CATEGORY 2
       FINANCIAL GROWTH
       ===================================================== */

    "Financial Growth": {

        "Revenue Performance": [

            "Has your business revenue been stable or increasing?",

            "Do you regularly track your revenue?",

            "Do you have clear revenue targets?",

            "Do you understand which products or services generate the most revenue?",

            "Do you actively work on increasing business revenue?"

        ],


        "Profitability": [

            "Do you regularly calculate your business profit?",

            "Is your business operating with a healthy profit margin?",

            "Do you know which activities generate the highest profit?",

            "Do you monitor changes in profitability?",

            "Do you take action when profitability decreases?"

        ],


        "Cash Flow": [

            "Do you regularly monitor your business cash flow?",

            "Does your business maintain enough cash for daily expenses?",

            "Do you track incoming and outgoing payments?",

            "Do customers generally pay you on time?",

            "Do you plan ahead for future cash requirements?"

        ],


        "Cost Management": [

            "Do you regularly review your business expenses?",

            "Do you identify unnecessary expenses?",

            "Do you compare supplier prices before purchasing?",

            "Do you have a budget for major business expenses?",

            "Do you take action to control increasing costs?"

        ],


        "Financial Stability": [

            "Does your business have sufficient financial reserves?",

            "Can your business handle unexpected expenses?",

            "Do you maintain accurate financial records?",

            "Do you regularly review your financial position?",

            "Do you have a clear financial plan for your business?"

        ]

    },


    /* =====================================================
       CATEGORY 3
       MARKET POSITION & COMPETITIVENESS
       ===================================================== */

    "Market Position & Competitiveness": {

        "Customer Retention": [

            "Do your customers regularly return to your business?",

            "Do you track repeat customers?",

            "Do you have strategies to retain existing customers?",

            "Do you communicate with customers after a purchase?",

            "Do you understand why customers stop buying from you?"

        ],


        "Market Presence": [

            "Is your business well known in your target market?",

            "Do you actively promote your business?",

            "Does your business have an online presence?",

            "Do you regularly reach new customers?",

            "Do you monitor your visibility in the market?"

        ],


        "Brand Strength": [

            "Does your business have a clear brand identity?",

            "Do customers recognize your business easily?",

            "Do you maintain consistent branding?",

            "Do customers associate your brand with quality?",

            "Do you actively work on improving your brand reputation?"

        ],


        "Competition": [

            "Do you regularly monitor your competitors?",

            "Do you understand what makes your business different?",

            "Do you compare your products or services with competitors?",

            "Do you respond to important changes in the competitive market?",

            "Do you have strategies to remain competitive?"

        ],


        "Customer Satisfaction": [

            "Do you regularly collect customer feedback?",

            "Are customers generally satisfied with your products or services?",

            "Do you respond quickly to customer complaints?",

            "Do you monitor customer satisfaction?",

            "Do you use customer feedback to improve your business?"

        ]

    },


    /* =====================================================
       CATEGORY 4
       COMPLIANCE & RISK MANAGEMENT
       ===================================================== */

    "Compliance & Risk Management": {

        "Legal & Regulatory Compliance": [

            "Does your business follow applicable laws and regulations?",

            "Are your required business registrations up to date?",

            "Do you maintain important legal documents?",

            "Do you regularly check compliance requirements?",

            "Do you take action when compliance issues are identified?"

        ],


        "Financial Risk": [

            "Do you regularly identify financial risks?",

            "Do you monitor business debts and liabilities?",

            "Do you have plans for unexpected financial problems?",

            "Do you avoid excessive financial dependence on one source?",

            "Do you regularly review your financial risk exposure?"

        ],


        "Operational Risk": [

            "Do you regularly identify operational risks?",

            "Do you have procedures for handling operational problems?",

            "Can your business continue if an important employee is unavailable?",

            "Do you regularly review potential operational failures?",

            "Do you take preventive action against operational risks?"

        ],


        "Data & Cybersecurity": [

            "Do you protect important business data?",

            "Do you regularly back up important files?",

            "Do you use strong passwords for business accounts?",

            "Do you control access to sensitive business information?",

            "Do you regularly update your digital security practices?"

        ],


        "Business Continuity": [

            "Does your business have a plan for unexpected disruptions?",

            "Can your business continue operating during emergencies?",

            "Do you have backup suppliers or service providers?",

            "Are important business records backed up?",

            "Have you considered possible business interruption scenarios?"

        ]

    },


    /* =====================================================
       CATEGORY 5
       BUSINESS SUSTAINABILITY & GROWTH
       ===================================================== */

    "Business Sustainability & Growth": {

        "Scalability": [

            "Can your current business model support future growth?",

            "Can you increase sales without major operational problems?",

            "Do you have plans to expand your business?",

            "Can your systems handle more customers?",

            "Do you regularly evaluate opportunities for expansion?"

        ],


        "Innovation": [

            "Do you regularly introduce new ideas?",

            "Do you look for new products or services?",

            "Do you use new technologies when useful?",

            "Do you encourage innovative thinking?",

            "Do you regularly look for better ways to operate?"

        ],


        "Leadership": [

            "Do you have clear business goals?",

            "Do you make business decisions based on reliable information?",

            "Do you communicate goals clearly to your team?",

            "Do you regularly review business performance?",

            "Do you have a clear leadership approach?"

        ],


        "Adaptability": [

            "Can your business adapt quickly to market changes?",

            "Do you monitor changes in customer preferences?",

            "Can you change your business strategy when necessary?",

            "Do you respond effectively to unexpected challenges?",

            "Do you regularly evaluate new business opportunities?"

        ],


        "Long-Term Growth": [

            "Does your business have a long-term growth plan?",

            "Do you set future business goals?",

            "Do you regularly review your growth strategy?",

            "Do you invest in activities that support future growth?",

            "Do you have a clear vision for your business future?"

        ]

    }

};


/* =========================================================
   LOCAL STORAGE
   ========================================================= */

const ANSWERS_KEY =
    "assessmentAnswers";


/* =========================================================
   USER ID
   ========================================================= */

const userId =
    localStorage.getItem("userId");


/* =========================================================
   CURRENT CATEGORY
   ========================================================= */

let currentCategory =
    localStorage.getItem("startCategory");


/* =========================================================
   CURRENT SUBCATEGORY
   ========================================================= */

let currentSubcategory =
    localStorage.getItem("selectedSubCategory");


/* =========================================================
   VALIDATE USER
   ========================================================= */

if (!userId) {

    alert(
        "User session not found. Please login again."
    );

    window.location.href =
        "login.html";

}


/* =========================================================
   VALIDATE CATEGORY
   ========================================================= */

if (!currentCategory) {

    alert(
        "Please select a category first."
    );

    window.location.href =
        "categories.html";

}


/* =========================================================
   VALIDATE SUBCATEGORY
   ========================================================= */

if (!currentSubcategory) {

    alert(
        "Please select a subcategory first."
    );

    window.location.href =
        "subcategories.html";

}


/* =========================================================
   CURRENT QUESTIONS
   ========================================================= */

const currentQuestions =

    questionBank[currentCategory] &&
    questionBank[currentCategory][currentSubcategory]

        ? questionBank[currentCategory][currentSubcategory]

        : [];


/* =========================================================
   VALIDATE QUESTIONS
   ========================================================= */

if (currentQuestions.length !== 5) {

    alert(
        "Questions not found for this subcategory."
    );

    window.location.href =
        "subcategories.html";

}


/* =========================================================
   ANSWER OPTIONS
   ========================================================= */

const answerOptions = [

    {
        text: "Strongly Agree",
        value: 5
    },

    {
        text: "Agree",
        value: 4
    },

    {
        text: "Neutral",
        value: 3
    },

    {
        text: "Disagree",
        value: 2
    },

    {
        text: "Strongly Disagree",
        value: 1
    }

];


/* =========================================================
   LOAD ANSWERS
   ========================================================= */

let assessmentAnswers = {};

try {

    const storedAnswers =
        localStorage.getItem(ANSWERS_KEY);

    if (storedAnswers) {

        assessmentAnswers =
            JSON.parse(storedAnswers);

    }

}

catch (error) {

    console.error(
        "Error loading assessment answers:",
        error
    );

    assessmentAnswers = {};

}


/* =========================================================
   CURRENT QUESTION
   ========================================================= */

let currentQuestion = 0;


/* =========================================================
   SAVING LOCK
   ========================================================= */

let savingAnswer = false;


/* =========================================================
   CURRENT QUESTION ANSWER
   ========================================================= */

let currentAnswerSaved = false;


/* =========================================================
   GET CATEGORY ID
   ========================================================= */

function getCategoryId(categoryName) {

    const index =
        categories.indexOf(categoryName);

    if (index === -1) {

        return null;

    }

    return index + 1;

}


/* =========================================================
   GET SUBCATEGORY ID
   ========================================================= */

function getSubcategoryId(
    categoryName,
    subcategoryName
) {

    const categoryIndex =
        categories.indexOf(categoryName);

    if (categoryIndex === -1) {

        return null;

    }

    const subcategories =
        Object.keys(
            questionBank[categoryName]
        );

    const subcategoryIndex =
        subcategories.indexOf(
            subcategoryName
        );

    if (subcategoryIndex === -1) {

        return null;

    }

    return (
        categoryIndex * 5
    ) +
    subcategoryIndex +
    1;

}


/* =========================================================
   GET QUESTION ID
   ========================================================= */

function getQuestionId(
    categoryName,
    subcategoryName,
    questionIndex
) {

    const categoryIndex =
        categories.indexOf(categoryName);

    if (categoryIndex === -1) {

        return null;

    }

    const subcategories =
        Object.keys(
            questionBank[categoryName]
        );

    const subcategoryIndex =
        subcategories.indexOf(
            subcategoryName
        );

    if (subcategoryIndex === -1) {

        return null;

    }

    return (
        categoryIndex * 25
    ) +
    (
        subcategoryIndex * 5
    ) +
    questionIndex +
    1;

}


/* =========================================================
   GET CURRENT QUESTION ID
   ========================================================= */

function getCurrentQuestionId() {

    return getQuestionId(
        currentCategory,
        currentSubcategory,
        currentQuestion
    );

}


/* =========================================================
   GET ANSWER TEXT
   ========================================================= */

function getAnswerText(value) {

    const option =
        answerOptions.find(
            item =>
                Number(item.value) ===
                Number(value)
        );

    return option
        ? option.text
        : "";

}


/* =========================================================
   GET SAVED ANSWER
   ========================================================= */

function getSavedAnswer() {

    if (
        !assessmentAnswers[currentCategory]
    ) {

        return undefined;

    }


    if (
        !assessmentAnswers[currentCategory]
            [currentSubcategory]
    ) {

        return undefined;

    }


    return assessmentAnswers[currentCategory]
        [currentSubcategory]
        [currentQuestion];

}


/* =========================================================
   ENSURE STORAGE STRUCTURE
   ========================================================= */

function ensureStorageStructure() {

    if (
        !assessmentAnswers[currentCategory]
    ) {

        assessmentAnswers[currentCategory] =
            {};

    }


    if (
        !assessmentAnswers[currentCategory]
            [currentSubcategory]
    ) {

        assessmentAnswers[currentCategory]
            [currentSubcategory] =
            [];

    }

}


/* =========================================================
   SAVE LOCAL ANSWER
   ========================================================= */

function saveLocalAnswer(value) {

    ensureStorageStructure();


    assessmentAnswers[currentCategory]
        [currentSubcategory]
        [currentQuestion] =
        Number(value);


    localStorage.setItem(
        ANSWERS_KEY,
        JSON.stringify(
            assessmentAnswers
        )
    );

}


/* =========================================================
   RESTORE OLD ANSWER
   ========================================================= */

function restoreOldAnswer(oldValue) {

    ensureStorageStructure();


    if (
        oldValue === undefined ||
        oldValue === null
    ) {

        delete assessmentAnswers[currentCategory]
            [currentSubcategory]
            [currentQuestion];

    }

    else {

        assessmentAnswers[currentCategory]
            [currentSubcategory]
            [currentQuestion] =
            Number(oldValue);

    }


    localStorage.setItem(
        ANSWERS_KEY,
        JSON.stringify(
            assessmentAnswers
        )
    );

}


/* =========================================================
   SHOW QUESTION
   ========================================================= */

function showQuestion() {

    const question =
        currentQuestions[currentQuestion];


    if (!question) {

        console.error(
            "Question not found:",
            currentQuestion
        );

        return;

    }


    /* -----------------------------------------
       CATEGORY
       ----------------------------------------- */

    if (categoryTitle) {

        categoryTitle.textContent =
            currentCategory;

    }


    /* -----------------------------------------
       SUBCATEGORY
       ----------------------------------------- */

    if (subcategoryTitle) {

        subcategoryTitle.textContent =
            currentSubcategory;

    }


    /* -----------------------------------------
       QUESTION NUMBER
       ----------------------------------------- */

    if (questionNumber) {

        questionNumber.textContent =
            `Q${getCurrentQuestionId()}`;

    }


    /* -----------------------------------------
       QUESTION TEXT
       ----------------------------------------- */

    if (questionText) {

        questionText.textContent =
            question;

    }


    /* -----------------------------------------
       SAVED ANSWER
       ----------------------------------------- */

    const savedAnswer =
        getSavedAnswer();


    currentAnswerSaved =
        savedAnswer !== undefined &&
        savedAnswer !== null &&
        savedAnswer !== "";


    /* -----------------------------------------
       CLEAR OPTIONS
       ----------------------------------------- */

    if (optionsContainer) {

        optionsContainer.innerHTML =
            "";

    }


    /* -----------------------------------------
       CREATE OPTIONS
       ----------------------------------------- */

    answerOptions.forEach(
        option => {

            const button =
                document.createElement(
                    "button"
                );


            button.type =
                "button";


            button.className =
                "answer-option";


            button.textContent =
                option.text;


            /* ---------------------------------
               RESTORE SELECTION
               --------------------------------- */

            if (
                Number(savedAnswer) ===
                Number(option.value)
            ) {

                button.classList.add(
                    "selected"
                );

            }


            /* ---------------------------------
               ANSWER CLICK
               --------------------------------- */

            button.addEventListener(
                "click",
                () => {

                    handleAnswerClick(
                        option.value,
                        button
                    );

                }
            );


            optionsContainer.appendChild(
                button
            );

        }
    );


    /* -----------------------------------------
       PROGRESS
       ----------------------------------------- */

    updateProgress();


    /* -----------------------------------------
       PREVIOUS BUTTON
       ----------------------------------------- */

    if (previousBtn) {

        previousBtn.disabled =
            currentQuestion === 0 ||
            savingAnswer;

    }


    /* -----------------------------------------
       NEXT BUTTON
       ----------------------------------------- */

    if (nextBtn) {

        nextBtn.disabled =
            savingAnswer;


        if (
            currentQuestion ===
            currentQuestions.length - 1
        ) {

            nextBtn.textContent =
                "Complete Subcategory ✓";

        }

        else {

            nextBtn.textContent =
                "Next →";

        }

    }

}


/* =========================================================
   HANDLE ANSWER CLICK
   ========================================================= */

async function handleAnswerClick(
    value,
    clickedButton
) {

    if (savingAnswer) {

        return;

    }


    /* -----------------------------------------
       REMOVE OTHER SELECTIONS
       ----------------------------------------- */

    document
        .querySelectorAll(".answer-option")
        .forEach(
            button => {

                button.classList.remove(
                    "selected"
                );

            }
        );


    /* -----------------------------------------
       SELECT CURRENT
       ----------------------------------------- */

    clickedButton.classList.add(
        "selected"
    );


    /* -----------------------------------------
       SAVE ANSWER
       ----------------------------------------- */

    const success =
        await saveAnswer(value);


    if (!success) {

        clickedButton.classList.remove(
            "selected"
        );

    }

}


/* =========================================================
   SAVE ANSWER LOCAL + MYSQL
   ========================================================= */

async function saveAnswer(value) {

    if (savingAnswer) {

        return false;

    }


    if (!userId) {

        alert(
            "User session expired. Please login again."
        );

        window.location.href =
            "login.html";

        return false;

    }


    const numericValue =
        Number(value);


    if (
        numericValue < 1 ||
        numericValue > 5
    ) {

        alert(
            "Invalid answer."
        );

        return false;

    }


    /* -----------------------------------------
       OLD VALUE
       ----------------------------------------- */

    const oldValue =
        getSavedAnswer();


    /* -----------------------------------------
       START LOCK
       ----------------------------------------- */

    savingAnswer =
        true;


    if (nextBtn) {

        nextBtn.disabled =
            true;

        nextBtn.textContent =
            "Saving...";

    }


    if (previousBtn) {

        previousBtn.disabled =
            true;

    }


    let timeoutId = null;


    try {

        /* -------------------------------------
           SAVE LOCAL
           ------------------------------------- */

        saveLocalAnswer(
            numericValue
        );


        /* -------------------------------------
           IDS
           ------------------------------------- */

        const categoryId =
            getCategoryId(
                currentCategory
            );


        const subcategoryId =
            getSubcategoryId(
                currentCategory,
                currentSubcategory
            );


        const questionId =
            getCurrentQuestionId();


        console.log(
            "Saving Answer:",
            {
                categoryId,
                subcategoryId,
                questionId,
                answer:
                    getAnswerText(
                        numericValue
                    ),
                score:
                    numericValue
            }
        );


        /* -------------------------------------
           API CONTROLLER
           ------------------------------------- */

        const controller =
            new AbortController();


        timeoutId =
            setTimeout(
                () => {

                    controller.abort();

                },
                10000
            );


        /* -------------------------------------
           MYSQL API
           ------------------------------------- */

        const response =
            await fetch(
                "http://localhost:5000/api/assessment-answer",
                {

                    method: "POST",

                    headers: {

                        "Content-Type":
                            "application/json"

                    },

                    body: JSON.stringify({

                        userId:
                            Number(userId),

                        categoryId:
                            categoryId,

                        subcategoryId:
                            subcategoryId,

                        questionId:
                            questionId,

                        answer:
                            getAnswerText(
                                numericValue
                            ),

                        score:
                            numericValue

                    }),

                    signal:
                        controller.signal

                }
            );


        clearTimeout(
            timeoutId
        );


        /* -------------------------------------
           HTTP ERROR
           ------------------------------------- */

        if (!response.ok) {

            throw new Error(
                `Server error: ${response.status}`
            );

        }


        /* -------------------------------------
           JSON RESPONSE
           ------------------------------------- */

        const data =
            await response.json();


        console.log(
            "API RESPONSE:",
            data
        );


        /* -------------------------------------
           API SUCCESS
           ------------------------------------- */

        if (
            !data ||
            data.success !== true
        ) {

            throw new Error(
                data?.message ||
                "Database save failed"
            );

        }


        /* -------------------------------------
           SUCCESS
           ------------------------------------- */

        currentAnswerSaved =
            true;


        savingAnswer =
            false;


        console.log(
            `✓ Q${questionId} saved successfully`
        );


        restoreButtons();


        updateProgress();


        return true;

    }


    catch (error) {

        console.error(
            "SAVE ERROR:",
            error
        );


        if (timeoutId) {

            clearTimeout(
                timeoutId
            );

        }


        /* -------------------------------------
           RESTORE OLD ANSWER
           ------------------------------------- */

        restoreOldAnswer(
            oldValue
        );


        currentAnswerSaved =
            false;


        savingAnswer =
            false;


        restoreButtons();


        /* -------------------------------------
           ERROR MESSAGE
           ------------------------------------- */

        if (
            error.name ===
            "AbortError"
        ) {

            alert(
                "Saving took too long.\n\n" +
                "Please make sure the NKP backend is running."
            );

        }

        else {

            alert(
                "Answer could not be saved.\n\n" +
                "Please check that the NKP backend is running."
            );

        }


        return false;

    }

}


/* =========================================================
   RESTORE BUTTONS
   ========================================================= */

function restoreButtons() {

    if (nextBtn) {

        nextBtn.disabled =
            false;


        if (
            currentQuestion ===
            currentQuestions.length - 1
        ) {

            nextBtn.textContent =
                "Complete Subcategory ✓";

        }

        else {

            nextBtn.textContent =
                "Next →";

        }

    }


    if (previousBtn) {

        previousBtn.disabled =
            currentQuestion === 0;

    }

}


/* =========================================================
   VALID ANSWER
   ========================================================= */

function isValidAnswer(value) {

    if (
        value === undefined ||
        value === null ||
        value === ""
    ) {

        return false;

    }


    const number =
        Number(value);


    return (
        number >= 1 &&
        number <= 5
    );

}


/* =========================================================
   GET TOTAL ANSWERED QUESTIONS
   ========================================================= */

function getTotalAnsweredQuestions() {

    let count = 0;


    categories.forEach(
        category => {

            const subcategories =
                questionBank[category];


            if (!subcategories) {

                return;

            }


            Object.keys(
                subcategories
            ).forEach(
                subcategory => {

                    const answers =
                        assessmentAnswers
                            [category]
                            ?.[
                                subcategory
                            ];


                    if (
                        !Array.isArray(
                            answers
                        )
                    ) {

                        return;

                    }


                    for (
                        let i = 0;
                        i < 5;
                        i++
                    ) {

                        if (
                            isValidAnswer(
                                answers[i]
                            )
                        ) {

                            count++;

                        }

                    }

                }
            );

        }
    );


    return count;

}


/* =========================================================
   UPDATE PROGRESS
   ========================================================= */

function updateProgress() {

    const total =
        125;


    const answered =
        getTotalAnsweredQuestions();


    const percentage =
        Math.min(
            100,
            Math.round(
                (
                    answered /
                    total
                ) * 100
            )
        );


    if (progressBar) {

        progressBar.style.width =
            `${percentage}%`;

    }


    if (progressText) {

        progressText.textContent =
            `${answered} of ${total}`;

    }


    console.log(
        `NKP Progress: ${answered}/125`
    );

}


/* =========================================================
   CHECK CURRENT SUBCATEGORY
   ========================================================= */

function isCurrentSubcategoryComplete() {

    const answers =
        assessmentAnswers
            [currentCategory]
            ?.[currentSubcategory];


    if (
        !Array.isArray(answers)
    ) {

        return false;

    }


    for (
        let i = 0;
        i < 5;
        i++
    ) {

        if (
            !isValidAnswer(
                answers[i]
            )
        ) {

            return false;

        }

    }


    return true;

}


/* =========================================================
   CALCULATE CATEGORY RESULT
   ========================================================= */

function calculateCategoryResult() {

    let totalScore = 0;

    let answeredQuestions = 0;


    const subcategories =
        questionBank[currentCategory];


    Object.keys(
        subcategories
    ).forEach(
        subcategory => {

            const answers =
                assessmentAnswers
                    [currentCategory]
                    ?.[subcategory];


            if (
                !Array.isArray(answers)
            ) {

                return;

            }


            for (
                let i = 0;
                i < 5;
                i++
            ) {

                if (
                    isValidAnswer(
                        answers[i]
                    )
                ) {

                    totalScore +=
                        Number(
                            answers[i]
                        );

                    answeredQuestions++;

                }

            }

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

        totalScore:
            totalScore,

        answeredQuestions:
            answeredQuestions,

        percentage:
            percentage

    };

}


/* =========================================================
   SAVE CATEGORY RESULT
   ========================================================= */

function saveCategoryResult() {

    const categoryIndex =
        categories.indexOf(
            currentCategory
        );


    if (
        categoryIndex === -1
    ) {

        return null;

    }


    const result =
        calculateCategoryResult();


    localStorage.setItem(
        "resultCategory",
        currentCategory
    );


    localStorage.setItem(
        "resultCategoryIndex",
        categoryIndex
    );


    localStorage.setItem(
        "categoryScore_" +
        categoryIndex,
        result.percentage
    );


    localStorage.setItem(
        "categoryRawScore_" +
        categoryIndex,
        result.totalScore
    );


    localStorage.setItem(
        "categoryAnswered_" +
        categoryIndex,
        result.answeredQuestions
    );


    console.log(
        "======================================"
    );


    console.log(
        "CATEGORY RESULT SAVED"
    );


    console.log(
        "Category:",
        currentCategory
    );


    console.log(
        "Category Index:",
        categoryIndex
    );


    console.log(
        "Answered:",
        result.answeredQuestions +
        "/25"
    );


    console.log(
        "Raw Score:",
        result.totalScore +
        "/125"
    );


    console.log(
        "Percentage:",
        result.percentage +
        "%"
    );


    console.log(
        "======================================"
    );


    return result;

}


/* =========================================================
   NEXT BUTTON
   ========================================================= */

if (nextBtn) {

    nextBtn.addEventListener(
        "click",
        async () => {

            if (savingAnswer) {

                return;

            }


            /* ----------------------------------
               CHECK CURRENT ANSWER
               ---------------------------------- */

            const answer =
                getSavedAnswer();


            if (
                !isValidAnswer(answer)
            ) {

                alert(
                    "Please select an answer before continuing."
                );

                return;

            }


            /* ----------------------------------
               MORE QUESTIONS
               ---------------------------------- */

            if (
                currentQuestion <
                currentQuestions.length - 1
            ) {

                currentQuestion++;


                showQuestion();


                return;

            }


            /* ----------------------------------
               LAST QUESTION
               ---------------------------------- */

            await completeSubcategory();

        }
    );

}


/* =========================================================
   PREVIOUS BUTTON
   ========================================================= */

if (previousBtn) {

    previousBtn.addEventListener(
        "click",
        () => {

            if (savingAnswer) {

                return;

            }


            if (
                currentQuestion > 0
            ) {

                currentQuestion--;


                showQuestion();

            }

        }
    );

}


/* =========================================================
   COMPLETE SUBCATEGORY
   ========================================================= */

async function completeSubcategory() {

    /* -----------------------------------------
       CHECK CURRENT 5 QUESTIONS
       ----------------------------------------- */

    if (
        !isCurrentSubcategoryComplete()
    ) {

        alert(
            "Please answer all 5 questions in this subcategory."
        );


        restoreButtons();


        return;

    }


    /* -----------------------------------------
       GET SUBCATEGORIES
       ----------------------------------------- */

    const subcategories =
        Object.keys(
            questionBank[currentCategory]
        );


    const currentIndex =
        subcategories.indexOf(
            currentSubcategory
        );


    /* -----------------------------------------
       MORE SUBCATEGORIES
       ----------------------------------------- */

    if (
        currentIndex <
        subcategories.length - 1
    ) {

        const nextSubcategory =
            subcategories[
                currentIndex + 1
            ];


        localStorage.setItem(
            "selectedSubCategory",
            nextSubcategory
        );


        console.log(
            "======================================"
        );


        console.log(
            "SUBCATEGORY COMPLETED"
        );


        console.log(
            "Current:",
            currentSubcategory
        );


        console.log(
            "Next:",
            nextSubcategory
        );


        console.log(
            "======================================"
        );


        window.location.href =
            "questions.html";


        return;

    }


    /* =====================================================
       LAST SUBCATEGORY OF CURRENT CATEGORY
       CATEGORY = 25 QUESTIONS
       ===================================================== */

    const categoryResult =
        saveCategoryResult();


    if (!categoryResult) {

        alert(
            "Unable to calculate category result."
        );

        return;

    }


    /* -----------------------------------------
       VERIFY 25 QUESTIONS
       ----------------------------------------- */

    if (
        categoryResult.answeredQuestions !==
        25
    ) {

        alert(
            "Category incomplete.\n\n" +
            categoryResult.answeredQuestions +
            " of 25 questions answered."
        );


        return;

    }


    /* -----------------------------------------
       CATEGORY INDEX
       ----------------------------------------- */

    const categoryIndex =
        categories.indexOf(
            currentCategory
        );


    /* -----------------------------------------
       MARK CATEGORY COMPLETE
       ----------------------------------------- */

    localStorage.setItem(
        "category_" +
        categoryIndex +
        "_complete",
        "true"
    );


    /* -----------------------------------------
       SEND TO RESULTS PAGE
       ----------------------------------------- */

    console.log(
        "======================================"
    );


    console.log(
        "CATEGORY COMPLETED"
    );


    console.log(
        "Category:",
        currentCategory
    );


    console.log(
        "Score:",
        categoryResult.percentage +
        "%"
    );


    console.log(
        "Going to results.html"
    );


    console.log(
        "======================================"
    );


    window.location.href =
        "results.html";

}


/* =========================================================
   FINAL ASSESSMENT CHECK
   ========================================================= */

function finishCompleteAssessment() {

    let totalScore =
        0;


    let answeredQuestions =
        0;


    const expectedQuestions =
        125;


    /* -----------------------------------------
       CHECK ALL QUESTIONS
       ----------------------------------------- */

    categories.forEach(
        category => {

            const subcategories =
                questionBank[category];


            Object.keys(
                subcategories
            ).forEach(
                subcategory => {

                    const answers =
                        assessmentAnswers
                            [category]
                            ?.[subcategory];


                    if (
                        !Array.isArray(
                            answers
                        )
                    ) {

                        return;

                    }


                    for (
                        let i = 0;
                        i < 5;
                        i++
                    ) {

                        const answer =
                            answers[i];


                        if (
                            isValidAnswer(
                                answer
                            )
                        ) {

                            totalScore +=
                                Number(
                                    answer
                                );


                            answeredQuestions++;

                        }

                    }

                }
            );

        }
    );


    /* -----------------------------------------
       DEBUG
       ----------------------------------------- */

    console.log(
        "======================================"
    );


    console.log(
        "NKP FINAL ASSESSMENT CHECK"
    );


    console.log(
        "Answered:",
        answeredQuestions
    );


    console.log(
        "Missing:",
        expectedQuestions -
        answeredQuestions
    );


    console.log(
        "Total Score:",
        totalScore
    );


    console.log(
        "======================================"
    );


    /* -----------------------------------------
       VALIDATION
       ----------------------------------------- */

    if (
        answeredQuestions !==
        expectedQuestions
    ) {

        alert(
            "Assessment incomplete.\n\n" +
            answeredQuestions +
            " of " +
            expectedQuestions +
            " questions answered."
        );


        return;

    }


    /* -----------------------------------------
       MAX SCORE
       ----------------------------------------- */

    const maximumScore =
        expectedQuestions * 5;


    /* -----------------------------------------
       FINAL SCORE
       ----------------------------------------- */

    const finalScore =
        Math.round(
            (
                totalScore /
                maximumScore
            ) * 100
        );


    /* -----------------------------------------
       SAVE FINAL RESULT
       ----------------------------------------- */

    localStorage.setItem(
        "assessmentScore",
        finalScore
    );


    localStorage.setItem(
        "assessmentCategory",
        "All 5 Categories"
    );


    localStorage.setItem(
        "assessmentSubCategory",
        "All 25 Subcategories"
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
        totalScore
    );


    console.log(
        "======================================"
    );


    console.log(
        "NKP ASSESSMENT COMPLETED"
    );


    console.log(
        "Questions:",
        answeredQuestions
    );


    console.log(
        "Total Score:",
        totalScore
    );


    console.log(
        "Final Score:",
        finalScore + "%"
    );


    console.log(
        "======================================"
    );


    /* -----------------------------------------
       RESULTS PAGE
       ----------------------------------------- */

    window.location.href =
        "results.html";

}


/* =========================================================
   DEBUG MISSING QUESTIONS
   ========================================================= */

function debugMissingQuestions() {

    console.log(
        "======================================"
    );


    console.log(
        "NKP MISSING QUESTION CHECK"
    );


    console.log(
        "======================================"
    );


    let totalAnswered = 0;


    categories.forEach(
        (
            category,
            categoryIndex
        ) => {

            const subcategories =
                Object.keys(
                    questionBank[category]
                );


            subcategories.forEach(
                (
                    subcategory,
                    subcategoryIndex
                ) => {

                    const answers =
                        assessmentAnswers
                            [category]
                            ?.[subcategory] ||
                        [];


                    const missing = [];


                    for (
                        let i = 0;
                        i < 5;
                        i++
                    ) {

                        const questionId =
                            (
                                categoryIndex *
                                25
                            ) +
                            (
                                subcategoryIndex *
                                5
                            ) +
                            i +
                            1;


                        if (
                            isValidAnswer(
                                answers[i]
                            )
                        ) {

                            totalAnswered++;

                        }

                        else {

                            missing.push(
                                `Q${questionId}`
                            );

                        }

                    }


                    console.log(
                        category +
                        " → " +
                        subcategory +
                        " : " +
                        (
                            5 -
                            missing.length
                        ) +
                        "/5"
                    );


                    if (
                        missing.length > 0
                    ) {

                        console.log(
                            "   Missing:",
                            missing.join(
                                ", "
                            )
                        );

                    }

                }
            );

        }
    );


    console.log(
        "======================================"
    );


    console.log(
        "TOTAL ANSWERED:",
        totalAnswered
    );


    console.log(
        "TOTAL MISSING:",
        125 -
        totalAnswered
    );


    console.log(
        "======================================"
    );

}


/* =========================================================
   START QUESTION
   ========================================================= */

showQuestion();


/* =========================================================
   DEBUG INFORMATION
   ========================================================= */

console.log(
    "======================================"
);


console.log(
    "NKP BUSINESS HEALTH ASSESSMENT"
);


console.log(
    "Category:",
    currentCategory
);


console.log(
    "Subcategory:",
    currentSubcategory
);


console.log(
    "User ID:",
    userId
);


console.log(
    "Current Question ID:",
    getCurrentQuestionId()
);


console.log(
    "Questions in Subcategory:",
    currentQuestions.length
);


console.log(
    "Total Questions:",
    125
);


console.log(
    "Answered:",
    getTotalAnsweredQuestions()
);


console.log(
    "Missing:",
    125 -
    getTotalAnsweredQuestions()
);


console.log(
    "======================================"
);


/* =========================================================
   GLOBAL DEBUG FUNCTION
   ========================================================= */

window.debugMissingQuestions =
    debugMissingQuestions;

