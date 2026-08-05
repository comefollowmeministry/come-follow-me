"use strict";


/*
=========================================================
COME, FOLLOW ME
Global Website JavaScript
=========================================================
*/


document.addEventListener("DOMContentLoaded", () => {

    initialiseTheme();

    createThemeButton();

    createBackToTopButton();

    createWhatsAppButton();

    initialiseMobileNavigation();

    initialiseGalleryLightbox();

    initialiseWebsiteSearch();

    updateCopyrightYear();

    handleBrokenImages();

    initialiseEnquiryForm();


});


/*
=========================================================
DARK AND LIGHT MODE
=========================================================
*/

function initialiseTheme() {

    const savedTheme = localStorage.getItem("comeFollowMeTheme");

    if (savedTheme === "dark") {

        document.body.classList.add("dark-mode");

    }

}


function createThemeButton() {

    const button = document.createElement("button");

    button.type = "button";

    button.className = "theme-toggle";

    button.setAttribute("aria-label", "Change website appearance");

    button.setAttribute("title", "Change light or dark mode");

    updateThemeButton(button);


    button.addEventListener("click", () => {

        document.body.classList.toggle("dark-mode");

        const darkModeEnabled =
            document.body.classList.contains("dark-mode");

        localStorage.setItem(
            "comeFollowMeTheme",
            darkModeEnabled ? "dark" : "light"
        );

        updateThemeButton(button);

    });


    document.body.appendChild(button);

}


function updateThemeButton(button) {

    const darkModeEnabled =
        document.body.classList.contains("dark-mode");

    button.textContent = darkModeEnabled ? "☀" : "☾";

    button.setAttribute(
        "aria-label",
        darkModeEnabled
            ? "Use light mode"
            : "Use dark mode"
    );

    button.setAttribute(
        "title",
        darkModeEnabled
            ? "Use light mode"
            : "Use dark mode"
    );

}


/*
=========================================================
BACK-TO-TOP BUTTON
=========================================================
*/

function createBackToTopButton() {

    const button = document.createElement("button");

    button.type = "button";

    button.className = "back-to-top";

    button.textContent = "↑";

    button.setAttribute("aria-label", "Return to the top");

    button.setAttribute("title", "Back to top");


    button.addEventListener("click", () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });


    window.addEventListener("scroll", () => {

        if (window.scrollY > 500) {

            button.classList.add("visible");

        } else {

            button.classList.remove("visible");

        }

    });


    document.body.appendChild(button);

}


/*
=========================================================
FLOATING WHATSAPP BUTTON
=========================================================
*/

function createWhatsAppButton() {

    /*
    Prevents a duplicate button if the function
    is accidentally called more than once.
    */
    if (document.querySelector(".floating-whatsapp")) {
        return;
    }

    const whatsappLink = document.createElement("a");

    const message =
        "Hello. I visited the Come, Follow Me Catholic ministry website " +
        "and would like to make an enquiry.";

    whatsappLink.href =
        "https://wa.me/67573225566?text=" +
        encodeURIComponent(message);

    whatsappLink.target = "_blank";
    whatsappLink.rel = "noopener noreferrer";
    whatsappLink.className = "floating-whatsapp";

    whatsappLink.setAttribute(
        "aria-label",
        "Contact Come, Follow Me through WhatsApp"
    );

    whatsappLink.setAttribute(
        "title",
        "Contact us on WhatsApp"
    );


    const whatsappIcon = document.createElement("img");

    whatsappIcon.src = "images/whatsapp.png";
    whatsappIcon.alt = "";
    whatsappIcon.width = 34;
    whatsappIcon.height = 34;


    const whatsappText = document.createElement("span");

    whatsappText.textContent = "WhatsApp";


    whatsappLink.appendChild(whatsappIcon);
    whatsappLink.appendChild(whatsappText);

    document.body.appendChild(whatsappLink);

}


/*
=========================================================
GALLERY LIGHTBOX
=========================================================
*/

function initialiseGalleryLightbox() {

    const galleryImages =
        Array.from(document.querySelectorAll(".gallery img"));

    if (galleryImages.length === 0) {

        return;

    }


    const lightbox = document.createElement("div");

    lightbox.className = "lightbox";

    lightbox.setAttribute("aria-hidden", "true");


    const closeButton = document.createElement("button");

    closeButton.type = "button";

    closeButton.className = "lightbox-close";

    closeButton.textContent = "×";

    closeButton.setAttribute("aria-label", "Close enlarged image");


    const previousButton = document.createElement("button");

    previousButton.type = "button";

    previousButton.className = "lightbox-previous";

    previousButton.textContent = "‹";

    previousButton.setAttribute("aria-label", "Previous image");


    const nextButton = document.createElement("button");

    nextButton.type = "button";

    nextButton.className = "lightbox-next";

    nextButton.textContent = "›";

    nextButton.setAttribute("aria-label", "Next image");


    const image = document.createElement("img");

    image.className = "lightbox-image";

    image.alt = "";


    const caption = document.createElement("p");

    caption.className = "lightbox-caption";


    lightbox.appendChild(closeButton);

    lightbox.appendChild(previousButton);

    lightbox.appendChild(image);

    lightbox.appendChild(nextButton);

    lightbox.appendChild(caption);

    document.body.appendChild(lightbox);


    let currentImageIndex = 0;


    function displayImage(index) {

        if (index < 0) {

            currentImageIndex = galleryImages.length - 1;

        } else if (index >= galleryImages.length) {

            currentImageIndex = 0;

        } else {

            currentImageIndex = index;

        }


        const selectedImage = galleryImages[currentImageIndex];

        image.src = selectedImage.src;

        image.alt =
            selectedImage.alt || "Gallery image";

        caption.textContent =
            selectedImage.alt || "Mission gallery";

    }


    function openLightbox(index) {

        displayImage(index);

        lightbox.classList.add("open");

        lightbox.setAttribute("aria-hidden", "false");

        document.body.classList.add("no-scroll");

        closeButton.focus();

    }


    function closeLightbox() {

        lightbox.classList.remove("open");

        lightbox.setAttribute("aria-hidden", "true");

        document.body.classList.remove("no-scroll");

    }


    galleryImages.forEach((galleryImage, index) => {

        galleryImage.tabIndex = 0;

        galleryImage.setAttribute(
            "role",
            "button"
        );

        galleryImage.setAttribute(
            "aria-label",
            `Open image: ${galleryImage.alt || "Gallery image"}`
        );


        galleryImage.addEventListener("click", () => {

            openLightbox(index);

        });


        galleryImage.addEventListener("keydown", event => {

            if (
                event.key === "Enter" ||
                event.key === " "
            ) {

                event.preventDefault();

                openLightbox(index);

            }

        });

    });


    closeButton.addEventListener("click", closeLightbox);


    previousButton.addEventListener("click", () => {

        displayImage(currentImageIndex - 1);

    });


    nextButton.addEventListener("click", () => {

        displayImage(currentImageIndex + 1);

    });


    lightbox.addEventListener("click", event => {

        if (event.target === lightbox) {

            closeLightbox();

        }

    });


    document.addEventListener("keydown", event => {

        if (!lightbox.classList.contains("open")) {

            return;

        }


        if (event.key === "Escape") {

            closeLightbox();

        }


        if (event.key === "ArrowLeft") {

            displayImage(currentImageIndex - 1);

        }


        if (event.key === "ArrowRight") {

            displayImage(currentImageIndex + 1);

        }

    });

}


/*
=========================================================
WEBSITE SEARCH
=========================================================
*/

function initialiseWebsiteSearch() {

    const searchContainer =
        document.querySelector("[data-site-search]");

    if (!searchContainer) {

        return;

    }


    const searchInput =
        searchContainer.querySelector("input");

    const resultsContainer =
        searchContainer.querySelector("[data-search-results]");


    if (!searchInput || !resultsContainer) {

        return;

    }


    const websitePages = [

        {
            title: "Home",
            description:
                "Mission, formation, Catholic resources, gallery and contacts.",
            url: "index.html",
            keywords:
                "home mission formation ministry catholic service gallery contact"
        },

        {
            title: "Prayer Center",
            description:
                "Rosary, Divine Mercy, litanies, traditional prayers and Breviary.",
            url: "prayer-center.html",
            keywords:
                "prayer pray devotion rosary mercy litany breviary"
        },

        {
            title: "Holy Rosary",
            description:
                "Complete Rosary prayers and the four sets of mysteries.",
            url: "rosary.html",
            keywords:
                "rosary mary joyful luminous sorrowful glorious hail mary"
        },

        {
            title: "Divine Mercy Chaplet",
            description:
                "Complete Divine Mercy Chaplet prayers.",
            url: "divine-mercy.html",
            keywords:
                "divine mercy chaplet jesus sorrowful passion"
        },

        {
            title: "Catholic Litanies",
            description:
                "Sacred Heart, Loreto, Saint Joseph and Litany of the Saints.",
            url: "litanies.html",
            keywords:
                "litany litanies sacred heart mary loreto joseph saints"
        },

        {
            title: "Traditional Catholic Prayers",
            description:
                "Morning Offering, Angelus, Memorare, Saint Michael and vocation prayer.",
            url: "other-prayers.html",
            keywords:
                "morning offering angelus memorare michael vocation traditional prayers"
        },

        {
            title: "Liturgy of the Hours",
            description:
                "Morning Prayer, Evening Prayer, Night Prayer and Office of Readings.",
            url: "breviary.html",
            keywords:
                "breviary divine office lauds vespers compline readings"
        },

        {
            title: "Scripture Center",
            description:
                "Bible, daily Mass readings, Gospel and Lectio Divina.",
            url: "scripture.html",
            keywords:
                "scripture bible gospel readings lectio divina word god"
        },

        {
            title: "Vocation and Discernment",
            description:
                "Priesthood, religious life, marriage, lay mission and vocation contacts.",
            url: "vocation.html",
            keywords:
                "vocation priesthood religious marriage discernment alotau joseph tuan"
        },

        {
            title: "Catechism",
            description:
                "The faith, Sacraments, Christian life and prayer.",
            url: "catechism.html",
            keywords:
                "catechism doctrine teaching creed morality prayer catholic"
        },

        {
            title: "The Seven Sacraments",
            description:
                "Baptism, Confirmation, Eucharist, Reconciliation, Anointing, Marriage and Holy Orders.",
            url: "sacraments.html",
            keywords:
                "sacraments baptism confirmation eucharist confession marriage orders anointing"
        },

        {
            title: "Saints",
            description:
                "Saint of the day and witnesses of Catholic holiness.",
            url: "saints.html",
            keywords:
                "saints mary apostles martyrs doctors holiness feast"
        },

        {
            title: "Liturgical Calendar",
            description:
                "Advent, Christmas, Lent, Easter and Ordinary Time.",
            url: "liturgical-calendar.html",
            keywords:
                "calendar liturgical advent christmas lent easter ordinary time"
        },

        {
            title: "Enquiries and Prayer Requests",
            description:
                "Submit prayer, vocation, formation, pastoral and website enquiries.",
            url: "enquiry.html",
            keywords:
                "enquiry contact prayer request message whatsapp email"
        }

    ];


    function showResults() {

        const query =
            searchInput.value
                .trim()
                .toLowerCase();


        resultsContainer.innerHTML = "";


        if (query.length < 2) {

            resultsContainer.hidden = true;

            return;

        }


        const results = websitePages.filter(page => {

            const searchableText =
                `${page.title} ${page.description} ${page.keywords}`
                    .toLowerCase();

            return searchableText.includes(query);

        });


        if (results.length === 0) {

            resultsContainer.innerHTML =
                "<p>No matching page was found.</p>";

            resultsContainer.hidden = false;

            return;

        }


        results.forEach(result => {

            const resultLink =
                document.createElement("a");

            resultLink.href = result.url;

            resultLink.className = "search-result";

            resultLink.innerHTML = `
                <strong>${escapeHTML(result.title)}</strong>
                <span>${escapeHTML(result.description)}</span>
            `;

            resultsContainer.appendChild(resultLink);

        });


        resultsContainer.hidden = false;

    }


    searchInput.addEventListener("input", showResults);


    document.addEventListener("click", event => {

        if (!searchContainer.contains(event.target)) {

            resultsContainer.hidden = true;

        }

    });


    searchInput.addEventListener("focus", () => {

        if (searchInput.value.trim().length >= 2) {

            showResults();

        }

    });

}


/*
=========================================================
COPYRIGHT YEAR
=========================================================
*/

function updateCopyrightYear() {

    const currentYear = new Date().getFullYear();

    const yearElements =
        document.querySelectorAll("[data-current-year]");

    yearElements.forEach(element => {

        element.textContent = String(currentYear);

    });

}


/*
=========================================================
BROKEN IMAGE HANDLING
=========================================================
*/

function handleBrokenImages() {

    const images =
        document.querySelectorAll("img");

    images.forEach(image => {

        image.addEventListener("error", () => {

            image.classList.add("broken-image");

            image.alt =
                image.alt || "Image unavailable";

        });

    });

}


/*
=========================================================
ENQUIRY FORM SUPPORT
=========================================================
*/

function initialiseEnquiryForm() {

    const form =
        document.querySelector("[data-enquiry-form]");

    if (!form) {

        return;

    }


    const submitButton =
        form.querySelector('button[type="submit"]');

    form.addEventListener("submit", event => {

        if (!form.checkValidity()) {

            event.preventDefault();

            form.reportValidity();

            return;

        }


        if (submitButton) {

            submitButton.disabled = true;

            submitButton.textContent = "Sending...";

        }

    });

}


/*
=========================================================
SECURITY UTILITY
=========================================================
*/

function escapeHTML(value) {

    const element = document.createElement("div");

    element.textContent = value;

    return element.innerHTML;

}/*
=========================================================
SCROLL ANIMATIONS
=========================================================
*/

function initialiseScrollAnimations() {

    const animatedElements = document.querySelectorAll(
        "main > section, .cards > .card"
    );

    if (animatedElements.length === 0) {
        return;
    }

    animatedElements.forEach(element => {
        element.classList.add("reveal-on-scroll");
    });

    if (!("IntersectionObserver" in window)) {

        animatedElements.forEach(element => {
            element.classList.add("is-visible");
        });

        return;
    }

    const observer = new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("is-visible");

                    observer.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.15,
            rootMargin: "0px 0px -70px 0px"
        }
    );

    requestAnimationFrame(() => {

        animatedElements.forEach(element => {
            observer.observe(element);
        });

    });

}/*
=========================================================
MOBILE NAVIGATION
=========================================================
*/

function initialiseMobileNavigation() {

    const navigation = document.querySelector("nav");

    if (!navigation) {
        return;
    }

    if (document.querySelector(".menu-toggle")) {
        return;
    }

    navigation.id = navigation.id || "main-navigation";

    const menuButton = document.createElement("button");

    menuButton.type = "button";
    menuButton.className = "menu-toggle";
    menuButton.innerHTML = `
        <span class="menu-icon" aria-hidden="true">☰</span>
        <span class="menu-label">Menu</span>
    `;

    menuButton.setAttribute(
        "aria-controls",
        navigation.id
    );

    menuButton.setAttribute(
        "aria-expanded",
        "false"
    );

    navigation.parentNode.insertBefore(
        menuButton,
        navigation
    );

    menuButton.addEventListener("click", () => {

        const menuIsOpen =
            navigation.classList.toggle("mobile-menu-open");

        menuButton.setAttribute(
            "aria-expanded",
            String(menuIsOpen)
        );

        const icon =
            menuButton.querySelector(".menu-icon");

        if (icon) {
            icon.textContent = menuIsOpen ? "✕" : "☰";
        }

    });

    navigation.querySelectorAll("a").forEach(link => {

        link.addEventListener("click", () => {

            navigation.classList.remove(
                "mobile-menu-open"
            );

            menuButton.setAttribute(
                "aria-expanded",
                "false"
            );

            const icon =
                menuButton.querySelector(".menu-icon");

            if (icon) {
                icon.textContent = "☰";
            }

        });

    });

    window.addEventListener("resize", () => {

        if (window.innerWidth > 700) {

            navigation.classList.remove(
                "mobile-menu-open"
            );

            menuButton.setAttribute(
                "aria-expanded",
                "false"
            );

            const icon =
                menuButton.querySelector(".menu-icon");

            if (icon) {
                icon.textContent = "☰";
            }

        }

    });

}