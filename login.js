// =====================================
// NKP LOGIN
// =====================================

const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    // Validation
    if (!email || !password) {
        alert("Please enter your email and password.");
        return;
    }

    const loginButton = loginForm.querySelector("button[type='submit']");

    if (!loginButton) {
        console.error("Login button not found.");
        return;
    }

    const originalButtonText = loginButton.innerHTML;

    loginButton.disabled = true;
    loginButton.innerHTML = "Signing in...";

    try {

        // =====================================
        // SEND LOGIN REQUEST TO BACKEND
        // =====================================

        const response = await fetch(
            "http://localhost:5000/api/login",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    email: email,
                    password: password
                })
            }
        );

        const data = await response.json();

        console.log("Login response:", data);

        // =====================================
        // LOGIN FAILED
        // =====================================

        if (!response.ok || !data.success) {

            alert(
                data.message ||
                "Invalid email or password."
            );

            loginButton.disabled = false;
            loginButton.innerHTML = originalButtonText;

            return;
        }

        // =====================================
        // LOGIN SUCCESS
        // =====================================

        localStorage.setItem(
            "loggedIn",
            "true"
        );

        localStorage.setItem(
            "userId",
            data.user.id
        );

        localStorage.setItem(
            "userName",
            data.user.fullName
        );

        localStorage.setItem(
            "userEmail",
            data.user.email
        );

        localStorage.setItem(
            "userPhone",
            data.user.phone
        );

        localStorage.setItem(
            "businessName",
            data.user.businessName
        );

        // =====================================
        // SUCCESS MESSAGE
        // =====================================

        alert("Login successful!");

        // =====================================
        // GO TO BUSINESS SETUP
        // =====================================

        window.location.href = "business-setup.html";

    } catch (error) {

        console.error(
            "Login error:",
            error
        );

        alert(
            "Unable to connect to the server. Please make sure the NKP backend is running."
        );

        loginButton.disabled = false;
        loginButton.innerHTML = originalButtonText;
    }
});