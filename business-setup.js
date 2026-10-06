// =====================================
// NKP BUSINESS SETUP
// =====================================

document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("businessSetupForm");

    if (!form) {
        console.error("Business Setup form not found.");
        return;
    }

    form.addEventListener("submit", async function (event) {

        event.preventDefault();

        // =====================================
        // GET FORM VALUES
        // =====================================

        const businessName =
            document.getElementById("businessName").value.trim();

        const businessType =
            document.getElementById("businessType").value;

        const industry =
            document.getElementById("industry").value;

        const location =
            document.getElementById("location").value.trim();

        const startDate =
            document.getElementById("startDate").value;

        const employees =
            document.getElementById("employees").value;


        // =====================================
        // VALIDATION
        // =====================================

        if (
            businessName === "" ||
            businessType === "" ||
            industry === "" ||
            location === ""
        ) {
            alert("Please fill in all required fields.");
            return;
        }


        // =====================================
        // GET LOGGED-IN USER
        // =====================================

        const userId = localStorage.getItem("userId");

        if (!userId) {

            alert(
                "User session not found. Please login again."
            );

            window.location.href = "login.html";

            return;
        }


        // =====================================
        // BUTTON
        // =====================================

        const submitButton =
            form.querySelector("button[type='submit']");

        const originalButtonText =
            submitButton ? submitButton.innerHTML : "";

        if (submitButton) {

            submitButton.disabled = true;

            submitButton.innerHTML =
                "Saving Business...";
        }


        // =====================================
        // BUSINESS DATA
        // =====================================

        const businessData = {

            businessName: businessName,

            businessType: businessType,

            industry: industry,

            location: location,

            startDate: startDate,

            employees: employees

        };


        try {

            // =====================================
            // SAVE TO BACKEND
            // =====================================

            const response = await fetch(
                "http://localhost:5000/api/business",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({

                        userId: userId,

                        businessName: businessName,

                        businessType: businessType,

                        industry: industry,

                        location: location,

                        startDate: startDate,

                        employees: employees

                    })
                }
            );


            const data = await response.json();

            console.log(
                "Business API Response:",
                data
            );


            // =====================================
            // ERROR
            // =====================================

            if (!response.ok || !data.success) {

                alert(
                    data.message ||
                    "Unable to save business information."
                );

                if (submitButton) {

                    submitButton.disabled = false;

                    submitButton.innerHTML =
                        originalButtonText;
                }

                return;
            }


            // =====================================
            // SAVE LOCAL COPY
            // =====================================

            localStorage.setItem(
                "businessData",
                JSON.stringify(businessData)
            );

            localStorage.setItem(
                "businessSetupCompleted",
                "true"
            );


            // Update business name
            localStorage.setItem(
                "businessName",
                businessName
            );


            console.log(
                "Business Setup Saved Successfully:",
                businessData
            );


            // =====================================
            // SUCCESS
            // =====================================

            alert(
                "Business setup completed successfully!"
            );


            // =====================================
            // GO TO DASHBOARD
            // =====================================

            window.location.href =
                "dashboard.html";


        } catch (error) {

            console.error(
                "Business Setup Error:",
                error
            );


            alert(
                "Unable to connect to the server. Please make sure the NKP backend is running."
            );


            if (submitButton) {

                submitButton.disabled = false;

                submitButton.innerHTML =
                    originalButtonText;
            }
        }

    });

});