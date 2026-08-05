"use strict";


document.addEventListener("DOMContentLoaded", () => {

    displayCurrentDate();

    displayDailyPrayer();

    initialisePrayerCopyButton();

});


/*
=========================================================
AUTOMATIC CURRENT DATE
=========================================================
*/

function displayCurrentDate() {

    const currentDate = new Date();

    const dateText = currentDate.toLocaleDateString(
        "en-AU",
        {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric"
        }
    );


    const headerDate =
        document.getElementById("automatic-date");

    const fullDate =
        document.getElementById("full-current-date");


    if (headerDate) {

        headerDate.textContent = dateText;

    }


    if (fullDate) {

        fullDate.textContent = dateText;

    }

}


/*
=========================================================
AUTOMATIC PRAYER OF THE DAY
=========================================================
*/

function displayDailyPrayer() {

    const prayers = [

        {
            title: "Prayer of Trust",
            text:
                "Lord Jesus Christ, I place this day into Your hands. " +
                "Guide my thoughts, words, decisions, and actions. " +
                "Help me to trust You in every difficulty and to remain " +
                "faithful to Your will."
        },

        {
            title: "Prayer for Faith",
            text:
                "Heavenly Father, strengthen my faith. " +
                "Help me to recognise Your presence, listen to Your Word, " +
                "and follow You with courage and perseverance."
        },

        {
            title: "Prayer for Charity",
            text:
                "Lord, fill my heart with Your love. " +
                "Teach me to recognise Christ in every person and to serve " +
                "others with patience, compassion, humility, and generosity."
        },

        {
            title: "Prayer for Peace",
            text:
                "Prince of Peace, bring peace to my heart, my family, " +
                "my community, and the world. Make me an instrument of " +
                "reconciliation, forgiveness, justice, and unity."
        },

        {
            title: "Prayer for Vocations",
            text:
                "Lord Jesus, continue to call men and women to priesthood, " +
                "religious life, Christian marriage, and faithful service. " +
                "Give those discerning their vocation courage to respond."
        },

        {
            title: "Prayer for the Sick",
            text:
                "Merciful Jesus, look with compassion upon all who are sick, " +
                "suffering, lonely, or afraid. Grant them strength, healing, " +
                "peace, and the support they need."
        },

        {
            title: "Prayer of Thanksgiving",
            text:
                "Heavenly Father, thank You for the gift of life, faith, " +
                "family, friendship, work, and every blessing. Help me to " +
                "receive Your gifts with gratitude and use them well."
        },

        {
            title: "Prayer for Families",
            text:
                "Lord, bless every family. Strengthen married couples, " +
                "protect children, comfort those experiencing conflict, " +
                "and make every Christian home a place of prayer and love."
        },

        {
            title: "Prayer for the Faithful Departed",
            text:
                "Eternal rest grant unto them, O Lord, and let perpetual " +
                "light shine upon them. May they rest in peace, and may " +
                "those who mourn receive consolation and hope."
        },

        {
            title: "Prayer for Wisdom",
            text:
                "Holy Spirit, grant me wisdom to recognise what is true, " +
                "courage to choose what is right, and humility to accept " +
                "correction and guidance."
        },

        {
            title: "Prayer for Mission",
            text:
                "Lord Jesus, send me to proclaim the Gospel through my life. " +
                "Help me to witness to You through honesty, service, mercy, " +
                "faithfulness, and love."
        },

        {
            title: "Prayer for Protection",
            text:
                "Almighty God, protect me and those entrusted to my care. " +
                "Guard us from evil, strengthen us in temptation, and keep " +
                "us faithful to Christ."
        }

    ];


    const today = new Date();

    const startOfYear =
        new Date(today.getFullYear(), 0, 0);

    const millisecondsInDay =
        1000 * 60 * 60 * 24;

    const dayOfYear =
        Math.floor(
            (today - startOfYear) / millisecondsInDay
        );

    const prayerIndex =
        dayOfYear % prayers.length;

    const selectedPrayer =
        prayers[prayerIndex];


    const titleElement =
        document.getElementById("daily-prayer-title");

    const textElement =
        document.getElementById("daily-prayer-text");

    const endingElement =
        document.getElementById("daily-prayer-ending");


    if (titleElement) {

        titleElement.textContent =
            selectedPrayer.title;

    }


    if (textElement) {

        textElement.textContent =
            selectedPrayer.text;

    }


    if (endingElement) {

        endingElement.textContent = "Amen.";

    }

}


/*
=========================================================
COPY DAILY PRAYER
=========================================================
*/

function initialisePrayerCopyButton() {

    const copyButton =
        document.getElementById("copy-daily-prayer");

    const message =
        document.getElementById("copy-prayer-message");


    if (!copyButton) {

        return;

    }


    copyButton.addEventListener("click", async () => {

        const title =
            document.getElementById("daily-prayer-title")
                ?.textContent || "";

        const prayer =
            document.getElementById("daily-prayer-text")
                ?.textContent || "";

        const ending =
            document.getElementById("daily-prayer-ending")
                ?.textContent || "";


        const completePrayer =
            `${title}\n\n${prayer}\n\n${ending}`;


        try {

            await navigator.clipboard.writeText(
                completePrayer
            );

            if (message) {

                message.textContent =
                    "Prayer copied successfully.";

            }

        } catch (error) {

            if (message) {

                message.textContent =
                    "The prayer could not be copied automatically. " +
                    "Please select and copy it manually.";

            }

        }

    });

}