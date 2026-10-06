const categoryButtons =
    document.querySelectorAll(".assess-btn");

categoryButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        const category =
            button.getAttribute("data-category");

        if (!category) {
            return;
        }

        // Save selected category
        localStorage.setItem(
            "startCategory",
            category
        );

        // Go to subcategory page
        window.location.href =
            "subcategories.html";
    });

});