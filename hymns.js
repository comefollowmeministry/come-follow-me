document.addEventListener(
    "DOMContentLoaded",
    function () {

        const results =
            document.getElementById(
                "hymn-results"
            );

        const categoriesContainer =
            document.getElementById(
                "hymn-categories"
            );

        const searchInput =
            document.getElementById(
                "hymn-search-input"
            );

        const noHymns =
            document.getElementById(
                "no-hymns"
            );

        const largerButton =
            document.getElementById(
                "larger-text"
            );

        const smallerButton =
            document.getElementById(
                "smaller-text"
            );

        const openAllButton =
            document.getElementById(
                "open-all"
            );

        const closeAllButton =
            document.getElementById(
                "close-all"
            );

        const printButton =
            document.getElementById(
                "print-hymns"
            );


        let selectedCategory =
            "All";


        let hymnFontSize =
            1.22;


        /* ==============================
           CREATE CATEGORIES
           ============================== */

        const categories = [
            "All",
            ...new Set(
                catholicHymns.map(
                    hymn => hymn.category
                )
            )
        ];


        categories.forEach(
            function (category) {

                const button =
                    document.createElement(
                        "button"
                    );


                button.type =
                    "button";


                button.className =
                    "hymn-category-button";


                button.textContent =
                    category;


                if (category === "All") {

                    button.classList.add(
                        "active"
                    );

                }


                button.addEventListener(
                    "click",
                    function () {

                        selectedCategory =
                            category;


                        document
                            .querySelectorAll(
                                ".hymn-category-button"
                            )
                            .forEach(
                                function (otherButton) {

                                    otherButton
                                        .classList
                                        .remove(
                                            "active"
                                        );

                                }
                            );


                        button.classList.add(
                            "active"
                        );


                        renderHymns();

                    }
                );


                categoriesContainer
                    .appendChild(
                        button
                    );

            }
        );


        /* ==============================
           FORMAT LYRICS
           ============================== */

        function formatLyrics(
            lyrics
        ) {

            return lyrics
                .trim()
                .split(/\n\s*\n/)
                .map(
                    verse =>
                        `<p>${
                            verse
                                .trim()
                                .replace(
                                    /\n/g,
                                    "<br>"
                                )
                        }</p>`
                )
                .join("");

        }


        /* ==============================
           DISPLAY HYMNS
           ============================== */

        function renderHymns() {

            const searchTerm =
                searchInput.value
                    .toLowerCase()
                    .trim();


            const filteredHymns =
                catholicHymns.filter(
                    function (hymn) {

                        const matchesCategory =
                            selectedCategory ===
                                "All" ||
                            hymn.category ===
                                selectedCategory;


                        const searchableText =
                            (
                                hymn.title +
                                " " +
                                hymn.category +
                                " " +
                                hymn.language +
                                " " +
                                hymn.lyrics
                            )
                            .toLowerCase();


                        const matchesSearch =
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
                function (
                    hymn,
                    index
                ) {

                    const details =
                        document.createElement(
                            "details"
                        );


                    details.className =
                        "written-hymn";


                    details.innerHTML = `

                        <summary>

                            <span class="hymn-number">
                                ${index + 1}.
                            </span>

                            ${hymn.title}

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

                                <span
                                    class="hymn-label"
                                >
                                    ${hymn.category}
                                </span>

                                <span
                                    class="hymn-label"
                                >
                                    ${hymn.language}
                                </span>

                            </div>


                            ${formatLyrics(
                                hymn.lyrics
                            )}

                        </div>

                    `;


                    results.appendChild(
                        details
                    );

                }
            );


            noHymns.hidden =
                filteredHymns.length !== 0;

        }


        /* ==============================
           SEARCH
           ============================== */

        searchInput.addEventListener(
            "input",
            renderHymns
        );


        /* ==============================
           LARGER TEXT
           ============================== */

        largerButton.addEventListener(
            "click",
            function () {

                hymnFontSize =
                    Math.min(
                        hymnFontSize + 0.15,
                        2.2
                    );


                renderHymns();

            }
        );


        /* ==============================
           SMALLER TEXT
           ============================== */

        smallerButton.addEventListener(
            "click",
            function () {

                hymnFontSize =
                    Math.max(
                        hymnFontSize - 0.15,
                        0.9
                    );


                renderHymns();

            }
        );


        /* ==============================
           OPEN ALL
           ============================== */

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

            }
        );


        /* ==============================
           CLOSE ALL
           ============================== */

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

            }
        );


        /* ==============================
           PRINT
           ============================== */

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
                    100
                );

            }
        );


        /* ==============================
           INITIAL DISPLAY
           ============================== */

        renderHymns();

    }
);