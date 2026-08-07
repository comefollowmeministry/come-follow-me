/* =========================================================
   COME, FOLLOW ME
   AUTOMATIC LIVE CATHOLIC LINKS
   Uses Papua New Guinea / Alotau date
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* -----------------------------------------
       GET TODAY'S DATE IN PAPUA NEW GUINEA
       ----------------------------------------- */

    const dateParts = new Intl.DateTimeFormat(
        "en-US",
        {
            timeZone: "Pacific/Port_Moresby",
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            weekday: "long",
            day: "numeric",
            month: "long"
        }
    ).formatToParts(new Date());


    function getPart(type) {
        const part = dateParts.find(
            item => item.type === type
        );

        return part ? part.value : "";
    }


    const year = getPart("year");

    const numericMonthParts =
        new Intl.DateTimeFormat(
            "en-US",
            {
                timeZone: "Pacific/Port_Moresby",
                month: "2-digit"
            }
        ).formatToParts(new Date());

    const numericDayParts =
        new Intl.DateTimeFormat(
            "en-US",
            {
                timeZone: "Pacific/Port_Moresby",
                day: "2-digit"
            }
        ).formatToParts(new Date());


    const month =
        numericMonthParts.find(
            item => item.type === "month"
        ).value;

    const day =
        numericDayParts.find(
            item => item.type === "day"
        ).value;


    const readableDate =
        new Intl.DateTimeFormat(
            "en-GB",
            {
                timeZone: "Pacific/Port_Moresby",
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric"
            }
        ).format(new Date());


    /* -----------------------------------------
       BUILD EXTERNAL WEBSITE ROOTS
       ----------------------------------------- */

    const vaticanRoot =
        ["https:", "", "www.vaticannews.va"].join("/");

    const universalisRoot =
        ["https:", "", "universalis.com"].join("/");

    const pngCatholicRoot =
        ["https:", "", "www.pngsicbc.com"].join("/");


    /* -----------------------------------------
       LIVE LINKS
       ----------------------------------------- */

    const liveLinks = {

        /* Vatican News */

        "vatican-word":
            `${vaticanRoot}/en/word-of-the-day/${year}/${month}/${day}.html`,

        "vatican-saint":
            `${vaticanRoot}/en/saints/${month}/${day}.html`,


        /* Universalis */

        "universalis-home":
            `${universalisRoot}/`,

        "universalis-mass":
            `${universalisRoot}/mass.htm`,

        "universalis-office":
            `${universalisRoot}/readings.htm`,

        "universalis-lauds":
            `${universalisRoot}/lauds.htm`,

        "universalis-terce":
            `${universalisRoot}/terce.htm`,

        "universalis-sext":
            `${universalisRoot}/sext.htm`,

        "universalis-none":
            `${universalisRoot}/none.htm`,

        "universalis-vespers":
            `${universalisRoot}/vespers.htm`,

        "universalis-compline":
            `${universalisRoot}/compline.htm`,


        /* Diocese of Alotau-Sideia */

        "alotau-diocese":
            `${pngCatholicRoot}/dioceses-1/diocese-of-alotau-sideia`

    };


    /* -----------------------------------------
       APPLY AUTOMATIC LINKS
       ----------------------------------------- */

    document
        .querySelectorAll("[data-live-link]")
        .forEach(function (link) {

            const key =
                link.dataset.liveLink;

            if (liveLinks[key]) {

                link.href =
                    liveLinks[key];

                link.target =
                    "_blank";

                link.rel =
                    "noopener noreferrer";

            }

        });


    /* -----------------------------------------
       DISPLAY TODAY'S DATE
       ----------------------------------------- */

    document
        .querySelectorAll("[data-live-date]")
        .forEach(function (element) {

            element.textContent =
                readableDate;

        });

});