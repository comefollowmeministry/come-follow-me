document.addEventListener("DOMContentLoaded", function () {

    /* =========================================================
       COME, FOLLOW ME — MULTILINGUAL CATHOLIC HYMN BOOK
       English | Tok Pisin | Latin | Dinka
       ========================================================= */


    /* ================= PAGE ELEMENTS ================= */

    const results =
        document.getElementById("hymn-results");

    const searchInput =
        document.getElementById("hymn-search-input");

    const noHymns =
        document.getElementById("no-hymns");

    const statusBox =
        document.getElementById("hymn-status");

    const largerButton =
        document.getElementById("larger-text");

    const smallerButton =
        document.getElementById("smaller-text");

    const openAllButton =
        document.getElementById("open-all");

    const closeAllButton =
        document.getElementById("close-all");

    const printButton =
        document.getElementById("print-hymns");


    if (!results || !searchInput) {

        console.error(
            "Required hymn page elements are missing."
        );

        return;
    }


    /* ================= HYMN COLLECTIONS ================= */

    const hymnCollections = {

        English:
            typeof catholicHymns !== "undefined"
                ? catholicHymns
                : [],

        "Tok Pisin":
            typeof yumiLotuHymns !== "undefined"
                ? yumiLotuHymns
                : [],

        Latin:
            typeof latinHymns !== "undefined"
                ? latinHymns
                : [],

        Dinka:
            typeof dinkaHymns !== "undefined"
                ? dinkaHymns
                : []

    };


    /* ================= CURRENT SETTINGS ================= */

    let selectedLanguage = "English";

    let selectedCategory = "all";

    let hymnFontSize = 1.22;


    /* ================= CATEGORY NAMES ================= */

    const categoryLabels = {

        all: "All Hymns",

        advent: "Advent",

        christmas: "Christmas",

        epiphany: "Epiphany",

        lent: "Lent",

        "holy-week": "Holy Week",

        easter: "Easter",

        ascension: "Ascension",

        pentecost: "Pentecost",

        trinity: "Trinity",

        "corpus-christi":
            "Corpus Christi",

        "sacred-heart":
            "Sacred Heart",

        marian:
            "Marian Hymns",

        saints:
            "Saints",

        "holy-souls":
            "Holy Souls",

        "ordinary-time":
            "Ordinary Time",

        other:
            "Other"

    };


    /* =========================================================
       NORMALISE TEXT
       ========================================================= */

    function normaliseText(value) {

        return String(value || "")
            .toLowerCase()
            .normalize("NFD")
            .replace(
                /[\u0300-\u036f]/g,
                ""
            )
            .trim();

    }


    function containsAny(text, values) {

        return values.some(
            function (value) {

                return text.includes(value);

            }
        );

    }


    /* =========================================================
       CATEGORY FILTER
       ========================================================= */

    function categoryMatches(
        hymn,
        requestedCategory
    ) {

        if (requestedCategory === "all") {

            return true;

        }


        const category =
            normaliseText(
                hymn.category
            );


        /* ADVENT */

        if (
            requestedCategory ===
            "advent"
        ) {

            return containsAny(
                category,
                [
                    "advent",
                    "atven"
                ]
            );

        }


        /* CHRISTMAS */

        if (
            requestedCategory ===
            "christmas"
        ) {

            return containsAny(
                category,
                [
                    "christmas",
                    "krismas",
                    "nativity"
                ]
            );

        }


        /* EPIPHANY */

        if (
            requestedCategory ===
            "epiphany"
        ) {

            return containsAny(
                category,
                [
                    "epiphany",
                    "epifani"
                ]
            );

        }


        /* LENT */

        if (
            requestedCategory ===
            "lent"
        ) {

            return (
                category === "lent" ||
                category === "len" ||
                category.startsWith(
                    "lent "
                ) ||
                category.startsWith(
                    "len "
                )
            );

        }


        /* HOLY WEEK */

        if (
            requestedCategory ===
            "holy-week"
        ) {

            return containsAny(
                category,
                [
                    "holy week",
                    "holi wik",
                    "passion",
                    "passion-tide",
                    "palm sunday",
                    "good friday",
                    "holy thursday",
                    "maundy"
                ]
            );

        }


        /* EASTER */

        if (
            requestedCategory ===
            "easter"
        ) {

            return containsAny(
                category,
                [
                    "easter",
                    "ista"
                ]
            );

        }


        /* ASCENSION */

        if (
            requestedCategory ===
            "ascension"
        ) {

            return containsAny(
                category,
                [
                    "ascension",
                    "ascension-tide",
                    "asensen"
                ]
            );

        }


        /* PENTECOST */

        if (
            requestedCategory ===
            "pentecost"
        ) {

            return containsAny(
                category,
                [
                    "pentecost",
                    "pentekos",
                    "whitsun",
                    "holy ghost",
                    "holy spirit"
                ]
            );

        }


        /* TRINITY */

        if (
            requestedCategory ===
            "trinity"
        ) {

            return containsAny(
                category,
                [
                    "trinity",
                    "triniti",
                    "triune"
                ]
            );

        }


        /* CORPUS CHRISTI */

        if (
            requestedCategory ===
            "corpus-christi"
        ) {

            return containsAny(
                category,
                [
                    "corpus christi",
                    "blessed sacrament",
                    "holy communion",
                    "eucharist",
                    "eucharistic",
                    "holi yukaris",
                    "benediction"
                ]
            );

        }


        /* SACRED HEART */

        if (
            requestedCategory ===
            "sacred-heart"
        ) {

            return containsAny(
                category,
                [
                    "sacred heart",
                    "santu hat"
                ]
            );

        }


        /* MARIAN */

        if (
            requestedCategory ===
            "marian"
        ) {

            return containsAny(
                category,
                [
                    "blessed virgin mary",
                    "virgin mary",
                    "our lady",
                    "marian",
                    "mary",
                    "maria",
                    "santu maria",
                    "rosary",
                    "rosari",
                    "immaculate",
                    "assumption",
                    "annunciation",
                    "mother of god"
                ]
            );

        }


        /* SAINTS */

        if (
            requestedCategory ===
            "saints"
        ) {

            return containsAny(
                category,
                [
                    "all saints",
                    "saint ",
                    "saints",
                    "apostle",
                    "apostles",
                    "evangelist",
                    "evangelists",
                    "martyr",
                    "martyrs",
                    "confessor",
                    "confessors",
                    "holy women",
                    "holy angels",
                    "guardian angel",
                    "ol santu"
                ]
            );

        }


        /* HOLY SOULS */

        if (
            requestedCategory ===
            "holy-souls"
        ) {

            return containsAny(
                category,
                [
                    "holy souls",
                    "faithful departed",
                    "purgatory",
                    "departed",
                    "the dead",
                    "for the dead",
                    "ol daiman",
                    "manmeri i dai"
                ]
            );

        }


        /* ORDINARY TIME */

        if (
            requestedCategory ===
            "ordinary-time"
        ) {

            return containsAny(
                category,
                [
                    "general hymn",
                    "general hymns",
                    "general",
                    "ordinary time",
                    "ordinary",
                    "olgeta taim",
                    "ol kain singsing",
                    "general songs"
                ]
            );

        }


        /* OTHER */

        if (
            requestedCategory ===
            "other"
        ) {

            const mainGroups = [

                "advent",
                "christmas",
                "epiphany",
                "lent",
                "holy-week",
                "easter",
                "ascension",
                "pentecost",
                "trinity",
                "corpus-christi",
                "sacred-heart",
                "marian",
                "saints",
                "holy-souls",
                "ordinary-time"

            ];


            return !mainGroups.some(
                function (group) {

                    return categoryMatches(
                        hymn,
                        group
                    );

                }
            );

        }


        return false;

    }


    /* =========================================================
       ESCAPE HTML
       ========================================================= */

    function escapeHTML(value) {

        return String(value || "")
            .replace(
                /&/g,
                "&amp;"
            )
            .replace(
                /</g,
                "&lt;"
            )
            .replace(
                />/g,
                "&gt;"
            )
            .replace(
                /"/g,
                "&quot;"
            )
            .replace(
                /'/g,
                "&#039;"
            );

    }


    /* =========================================================
       FORMAT LYRICS
       ========================================================= */

    function formatLyrics(lyrics) {

        const safeLyrics =
            escapeHTML(
                lyrics
            ).trim();


        if (!safeLyrics) {

            return "";

        }


        return safeLyrics
            .split(/\n\s*\n/)
            .map(
                function (verse) {

                    return (
                        "<p>" +
                        verse
                            .trim()
                            .replace(
                                /\n/g,
                                "<br>"
                            ) +
                        "</p>"
                    );

                }
            )
            .join("");

    }


    /* =========================================================
       IMPORTANT:
       GO DIRECTLY TO FIRST ACTUAL HYMN

       This is the part that fixes your scrolling problem.
       ========================================================= */

    function goToFirstHymn() {

        setTimeout(
            function () {

                const firstHymn =
                    document.querySelector(
                        "#hymn-results .written-hymn"
                    );


                if (!firstHymn) {

                    return;

                }


                const position =
                    firstHymn
                        .getBoundingClientRect()
                        .top +
                    window.scrollY -
                    20;


                window.scrollTo({

                    top:
                        position,

                    behavior:
                        "smooth"

                });

            },
            150
        );

    }


    /* =========================================================
       ACTIVE LANGUAGE BUTTON
       ========================================================= */

    function updateLanguageButtons() {

        document
            .querySelectorAll(
                ".hymn-language-button"
            )
            .forEach(
                function (button) {

                    const active =
                        button.dataset.language ===
                        selectedLanguage;


                    button.classList.toggle(
                        "active",
                        active
                    );


                    button.setAttribute(
                        "aria-pressed",
                        active
                            ? "true"
                            : "false"
                    );

                }
            );

    }


    /* =========================================================
       ACTIVE CATEGORY BUTTON
       ========================================================= */

    function updateCategoryButtons() {

        document
            .querySelectorAll(
                ".hymn-category-button"
            )
            .forEach(
                function (button) {

                    const active =
                        button.dataset.category ===
                        selectedCategory;


                    button.classList.toggle(
                        "active",
                        active
                    );


                    button.setAttribute(
                        "aria-pressed",
                        active
                            ? "true"
                            : "false"
                    );

                }
            );

    }


    /* =========================================================
       LANGUAGE BUTTONS
       ========================================================= */

    document
        .querySelectorAll(
            ".hymn-language-button"
        )
        .forEach(
            function (button) {

                button.addEventListener(
                    "click",
                    function () {

                        selectedLanguage =
                            button.dataset.language;


                        selectedCategory =
                            "all";


                        searchInput.value =
                            "";


                        updateLanguageButtons();

                        updateCategoryButtons();

                        renderHymns();

                        goToFirstHymn();

                    }
                );

            }
        );


    /* =========================================================
       CATEGORY BUTTONS
       ========================================================= */

    document
        .querySelectorAll(
            ".hymn-category-button"
        )
        .forEach(
            function (button) {

                button.addEventListener(
                    "click",
                    function () {

                        selectedCategory =
                            button.dataset.category;


                        updateCategoryButtons();

                        renderHymns();

                        goToFirstHymn();

                    }
                );

            }
        );


    /* =========================================================
       CURRENT COLLECTION
       ========================================================= */

    function getCurrentCollection() {

        return (
            hymnCollections[
                selectedLanguage
            ] || []
        );

    }


    /* =========================================================
       RENDER HYMNS
       ========================================================= */

    function renderHymns() {

        const collection =
            getCurrentCollection();


        const searchTerm =
            normaliseText(
                searchInput.value
            );


        const filteredHymns =
            collection.filter(
                function (hymn) {

                    const matchesCategory =
                        categoryMatches(
                            hymn,
                            selectedCategory
                        );


                    const searchableText =
                        normaliseText(
                            [
                                hymn.number,
                                hymn.title,
                                hymn.originalTitle,
                                hymn.category,
                                hymn.language,
                                hymn.lyrics
                            ]
                                .filter(Boolean)
                                .join(" ")
                        );


                    const matchesSearch =
                        searchTerm === "" ||
                        searchableText.includes(
                            searchTerm
                        );


                    return (
                        matchesCategory &&
                        matchesSearch
                    );

                }
            );


        results.innerHTML =
            "";


        filteredHymns.forEach(
            function (hymn) {

                const details =
                    document.createElement(
                        "details"
                    );


                details.className =
                    "written-hymn";


                const hymnNumber =
                    hymn.number !== undefined
                        ? hymn.number
                        : "";


                const hymnTitle =
                    escapeHTML(
                        hymn.title ||
                        "Untitled Hymn"
                    );


                const hymnCategory =
                    escapeHTML(
                        hymn.category ||
                        "Hymn"
                    );


                const hymnLanguage =
                    escapeHTML(
                        hymn.language ||
                        selectedLanguage
                    );


                const originalTitle =
                    hymn.originalTitle
                        ? escapeHTML(
                            hymn.originalTitle
                        )
                        : "";


                let informationHTML = `

                    <span class="hymn-label">
                        ${hymnCategory}
                    </span>

                    <span class="hymn-label">
                        ${hymnLanguage}
                    </span>

                `;


                if (
                    originalTitle &&
                    normaliseText(
                        originalTitle
                    ) !==
                    normaliseText(
                        hymn.title
                    )
                ) {

                    informationHTML += `

                        <span class="hymn-label">
                            ${originalTitle}
                        </span>

                    `;

                }


                details.innerHTML = `

                    <summary>

                        <span class="hymn-number">

                            ${
                                hymnNumber
                                    ? hymnNumber + "."
                                    : ""
                            }

                        </span>

                        ${hymnTitle}

                    </summary>


                    <div
                        class="hymn-lyrics"
                        style="
                            font-size:
                            ${hymnFontSize}rem;
                        "
                    >

                        <div
                            class="hymn-information"
                        >

                            ${informationHTML}

                        </div>


                        ${
                            formatLyrics(
                                hymn.lyrics
                            )
                        }

                    </div>

                `;


                results.appendChild(
                    details
                );

            }
        );


        if (noHymns) {

            noHymns.hidden =
                filteredHymns.length !== 0;

        }


        updateStatus(
            filteredHymns.length,
            collection.length,
            searchTerm
        );

    }


    /* =========================================================
       STATUS
       ========================================================= */

    function updateStatus(
        visibleCount,
        totalCount,
        searchTerm
    ) {

        if (!statusBox) {

            return;

        }


        const categoryName =
            categoryLabels[
                selectedCategory
            ] ||
            "All Hymns";


        let count =
            visibleCount;


        if (
            selectedCategory === "all" &&
            !searchTerm
        ) {

            count =
                totalCount;

        }


        statusBox.innerHTML = `

            <strong>
                ${escapeHTML(selectedLanguage)}
            </strong>

            —

            ${escapeHTML(categoryName)}

            —

            ${count}

            ${
                count === 1
                    ? "hymn"
                    : "hymns"
            }

        `;

    }


    /* =========================================================
       SEARCH
       ========================================================= */

    searchInput.addEventListener(
        "input",
        renderHymns
    );


    /* =========================================================
       LARGER TEXT
       ========================================================= */

    if (largerButton) {

        largerButton.addEventListener(
            "click",
            function () {

                hymnFontSize =
                    Math.min(
                        hymnFontSize + 0.15,
                        2.2
                    );


                document
                    .querySelectorAll(
                        ".hymn-lyrics"
                    )
                    .forEach(
                        function (lyrics) {

                            lyrics.style.fontSize =
                                hymnFontSize +
                                "rem";

                        }
                    );


                goToFirstHymn();

            }
        );

    }


    /* =========================================================
       SMALLER TEXT
       ========================================================= */

    if (smallerButton) {

        smallerButton.addEventListener(
            "click",
            function () {

                hymnFontSize =
                    Math.max(
                        hymnFontSize - 0.15,
                        0.9
                    );


                document
                    .querySelectorAll(
                        ".hymn-lyrics"
                    )
                    .forEach(
                        function (lyrics) {

                            lyrics.style.fontSize =
                                hymnFontSize +
                                "rem";

                        }
                    );


                goToFirstHymn();

            }
        );

    }


    /* =========================================================
       OPEN ALL
       ========================================================= */

    if (openAllButton) {

        openAllButton.addEventListener(
            "click",
            function () {

                document
                    .querySelectorAll(
                        ".written-hymn"
                    )
                    .forEach(
                        function (hymn) {

                            hymn.open =
                                true;

                        }
                    );


                goToFirstHymn();

            }
        );

    }


    /* =========================================================
       CLOSE ALL
       ========================================================= */

    if (closeAllButton) {

        closeAllButton.addEventListener(
            "click",
            function () {

                document
                    .querySelectorAll(
                        ".written-hymn"
                    )
                    .forEach(
                        function (hymn) {

                            hymn.open =
                                false;

                        }
                    );


                goToFirstHymn();

            }
        );

    }


    /* =========================================================
       PRINT
       ========================================================= */

    if (printButton) {

        printButton.addEventListener(
            "click",
            function () {

                document
                    .querySelectorAll(
                        ".written-hymn"
                    )
                    .forEach(
                        function (hymn) {

                            hymn.open =
                                true;

                        }
                    );


                setTimeout(
                    function () {

                        window.print();

                    },
                    200
                );

            }
        );

    }


    /* =========================================================
       INITIAL DISPLAY
       ========================================================= */

    updateLanguageButtons();

    updateCategoryButtons();

    renderHymns();

});