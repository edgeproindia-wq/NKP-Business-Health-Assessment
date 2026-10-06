// =====================================
// NKP REGISTER
// =====================================

const registerForm = document.getElementById("registerForm");

registerForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    // =====================================
    // GET FORM VALUES
    // =====================================

    const fullName =
        document.getElementById("fullName").value.trim();

    const businessName =
        document.getElementById("businessName").value.trim();

    const email =
        document.getElementById("email").value.trim();

    const phone =
        document.getElementById("phone").value.trim();

    const password =
        document.getElementById("password").value;

    const confirmPassword =
        document.getElementById("confirmPassword").value;

    const terms =
        document.getElementById("terms").checked;


    // =====================================
    // BASIC VALIDATION
    // =====================================

    if (
        !fullName ||
        !businessName ||
        !email ||
        !phone ||
        !password ||
        !confirmPassword
    ) {
        alert("Please fill in all fields.");
        return;
    }


    // =====================================
    // TERMS CHECK
    // =====================================

    if (!terms) {
        alert("Please agree to the Terms of Service and Privacy Policy.");
        return;
    }


    // =====================================
    // PASSWORD CHECK
    // =====================================

    if (password.length < 6) {
        alert("Password must be at least 6 characters.");
        return;
    }


    if (password !== confirmPassword) {
        alert("Passwords do not match.");
        return;
    }


    // =====================================
    // BUTTON
    // =====================================

    const createButton =
        registerForm.querySelector(".create-btn");

    const originalButtonText =
        createButton.innerHTML;

    createButton.disabled = true;

    createButton.innerHTML =
        "Creating Account...";


    try {

        // =====================================
        // SEND DATA TO BACKEND
        // =====================================

        const response = await fetch(
            "http://localhost:5000/api/register",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    fullName: fullName,
                    businessName: businessName,
                    phone: phone,
                    email: email,
                    password: password
                })
            }
        );


        // =====================================
        // READ RESPONSE
        // =====================================

        const data = await response.json();


        // =====================================
        // BACKEND ERROR
        // =====================================

        if (!response.ok || !data.success) {

            alert(
                data.message ||
                "Registration failed. Please try again."
            );

            createButton.disabled = false;
            createButton.innerHTML =
                originalButtonText;

            return;
        }


        // =====================================
        // REGISTRATION SUCCESS
        // =====================================

        alert(
            "Registration successful! Please login."
        );


        // =====================================
        // SAVE USER INFORMATION
        // =====================================

        localStorage.setItem(
            "registered",
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
            "businessName",
            data.user.businessName
        );

        localStorage.setItem(
            "userPhone",
            data.user.phone
        );

        localStorage.setItem(
            "userEmail",
            data.user.email
        );


        // =====================================
        // GO TO LOGIN
        // =====================================

        window.location.href =
            "login.html";


    } catch (error) {

        console.error(
            "Registration error:",
            error
        );

        alert(
            "Unable to connect to the server. Please make sure the NKP backend is running."
        );

        createButton.disabled = false;

        createButton.innerHTML =
            originalButtonText;
    }
});