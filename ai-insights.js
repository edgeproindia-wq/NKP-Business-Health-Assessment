const chatMessages =
    document.getElementById("chatMessages");

const messageInput =
    document.getElementById("messageInput");

const sendButton =
    document.getElementById("sendButton");

const typingIndicator =
    document.getElementById("typingIndicator");

const quickQuestions =
    document.querySelectorAll(".quick-question");


// =====================================
// USER / BUSINESS DATA
// =====================================

const assessmentScore =
    Number(
        localStorage.getItem(
            "assessmentScore"
        ) || 0
    );

const userName =
    localStorage.getItem(
        "userName"
    ) || "Business Owner";

const businessName =
    localStorage.getItem(
        "businessName"
    ) || "Your Business";


// =====================================
// ASSESSMENT ANSWERS
// =====================================

let assessmentAnswers = {};

try {

    assessmentAnswers =
        JSON.parse(
            localStorage.getItem(
                "assessmentAnswers"
            ) || "{}"
        );

} catch (error) {

    console.error(
        "Unable to read assessment answers:",
        error
    );

    assessmentAnswers = {};

}


// =====================================
// TEXTAREA AUTO RESIZE
// =====================================

messageInput.addEventListener(
    "input",
    function () {

        this.style.height =
            "auto";

        this.style.height =
            Math.min(
                this.scrollHeight,
                130
            ) + "px";

    }
);


// =====================================
// ESCAPE HTML
// =====================================

function escapeHTML(text) {

    const div =
        document.createElement(
            "div"
        );

    div.textContent =
        text;

    return div.innerHTML;

}


// =====================================
// FORMAT AI MESSAGE
// =====================================

function formatAIMessage(message) {

    let formatted =
        escapeHTML(message);

    formatted =
        formatted.replace(
            /\n/g,
            "<br>"
        );

    return formatted;

}


// =====================================
// SCROLL CHAT
// =====================================

function scrollToBottom() {

    setTimeout(
        function () {

            chatMessages.scrollTop =
                chatMessages.scrollHeight;

        },
        50
    );

}


// =====================================
// SAVE CHAT HISTORY
// =====================================

function saveChatMessage(
    role,
    message
) {

    let chatHistory = [];

    try {

        chatHistory =
            JSON.parse(
                localStorage.getItem(
                    "nkpChatHistory"
                ) || "[]"
            );

    } catch (error) {

        chatHistory = [];

    }

    chatHistory.push({

        role:
            role,

        message:
            message,

        time:
            new Date().toISOString()

    });

    if (
        chatHistory.length > 50
    ) {

        chatHistory =
            chatHistory.slice(
                -50
            );

    }

    localStorage.setItem(
        "nkpChatHistory",
        JSON.stringify(
            chatHistory
        )
    );

}


// =====================================
// ADD USER MESSAGE
// =====================================

function addUserMessage(
    message
) {

    const wrapper =
        document.createElement(
            "div"
        );

    wrapper.className =
        "message user-message";

    wrapper.innerHTML = `

        <div class="message-avatar">
            👤
        </div>

        <div class="message-content">

            <div class="message-name">
                You
            </div>

            <div class="message-bubble">
                ${escapeHTML(message)}
            </div>

        </div>

    `;

    chatMessages.appendChild(
        wrapper
    );

    saveChatMessage(
        "user",
        message
    );

    scrollToBottom();

}


// =====================================
// ADD AI MESSAGE
// =====================================

function addAIMessage(
    message
) {

    const wrapper =
        document.createElement(
            "div"
        );

    wrapper.className =
        "message ai-message";

    wrapper.innerHTML = `

        <div class="message-avatar">
            🤖
        </div>

        <div class="message-content">

            <div class="message-name">
                NKP AI
            </div>

            <div class="message-bubble">
                ${formatAIMessage(message)}
            </div>

        </div>

    `;

    chatMessages.appendChild(
        wrapper
    );

    saveChatMessage(
        "assistant",
        message
    );

    scrollToBottom();

}


// =====================================
// TYPING INDICATOR
// =====================================

function showTyping() {

    typingIndicator.classList.remove(
        "hidden"
    );

    scrollToBottom();

}


function hideTyping() {

    typingIndicator.classList.add(
        "hidden"
    );

}


// =====================================
// SEND MESSAGE TO REAL AI
// =====================================

async function getAIResponse(
    userQuestion
) {

    try {

        const response =
            await fetch(
                "http://localhost:5000/api/ai-chat",
                {

                    method:
                        "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body:
                        JSON.stringify({

                            message:
                                userQuestion,

                            userName:
                                userName,

                            businessName:
                                businessName,

                            assessmentScore:
                                assessmentScore,

                            assessmentAnswers:
                                assessmentAnswers

                        })

                }
            );


        const data =
            await response.json();


        if (!response.ok) {

            throw new Error(
                data.message ||
                "AI server error"
            );

        }


        if (
            !data.message
        ) {

            throw new Error(
                "No AI response received."
            );

        }


        return data.message;


    } catch (error) {

        console.error(
            "AI request failed:",
            error
        );

        throw error;

    }

}


// =====================================
// SEND MESSAGE
// =====================================

async function sendMessage() {

    const message =
        messageInput.value.trim();


    if (!message) {

        return;

    }


    sendButton.disabled =
        true;

    messageInput.disabled =
        true;


    addUserMessage(
        message
    );


    messageInput.value =
        "";

    messageInput.style.height =
        "auto";


    showTyping();


    try {

        const aiResponse =
            await getAIResponse(
                message
            );


        hideTyping();


        addAIMessage(
            aiResponse
        );


    } catch (error) {

        hideTyping();


        addAIMessage(
            "Sorry, I couldn't connect to NKP AI right now. Please make sure the backend server is running on port 5000."
        );

    }


    sendButton.disabled =
        false;

    messageInput.disabled =
        false;

    messageInput.focus();

}


// =====================================
// SEND BUTTON
// =====================================

sendButton.addEventListener(
    "click",
    function () {

        sendMessage();

    }
);


// =====================================
// ENTER KEY
// =====================================

messageInput.addEventListener(
    "keydown",
    function (event) {

        if (
            event.key === "Enter" &&
            !event.shiftKey
        ) {

            event.preventDefault();

            sendMessage();

        }

    }
);


// =====================================
// QUICK QUESTIONS
// =====================================

quickQuestions.forEach(
    function (button) {

        button.addEventListener(
            "click",
            function () {

                const question =
                    button.getAttribute(
                        "data-question"
                    );


                if (!question) {

                    return;

                }


                messageInput.value =
                    question;


                sendMessage();

            }
        );

    }
);


// =====================================
// DEBUG INFORMATION
// =====================================

console.log(
    "======================================"
);

console.log(
    "NKP AI Assistant Loaded"
);

console.log(
    "User:",
    userName
);

console.log(
    "Business:",
    businessName
);

console.log(
    "Assessment Score:",
    assessmentScore
);

console.log(
    "Assessment Answers:",
    assessmentAnswers
);

console.log(
    "AI Endpoint:",
    "http://localhost:5000/api/ai-chat"
);

console.log(
    "======================================"
);