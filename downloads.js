document.addEventListener("DOMContentLoaded", function () {
    const containers = {
        documents: document.getElementById("documents-list"),
        audio: document.getElementById("audio-list"),
        videos: document.getElementById("videos-list")
    };

    const folders = {
        documents: "downloads/documents/",
        audio: "downloads/audio/",
        videos: "downloads/videos/"
    };

    const searchInput = document.getElementById("download-search");
    const searchMessage = document.getElementById(
        "download-search-message"
    );

    const groups = document.querySelectorAll(".download-group");

    function getFileExtension(fileName) {
        const parts = fileName.split(".");

        if (parts.length < 2) {
            return "FILE";
        }

        return parts.pop().toUpperCase();
    }

    function createDownloadCard(fileName, category) {
        const article = document.createElement("article");
        article.className = "resource-download-card";
        article.dataset.downloadItem = "";
        article.dataset.searchTerms =
            `${fileName} ${category}`.toLowerCase();

        const filePath =
            folders[category] +
            encodeURIComponent(fileName).replace(/%2F/g, "/");

        const fileType = getFileExtension(fileName);

        article.innerHTML = `
            <div class="file-icon" aria-hidden="true">
                ${fileType}
            </div>

            <div class="file-information">
                <h3>${fileName}</h3>

                <div class="file-details">
                    <span>Type: ${fileType}</span>
                    <span>Category: ${category}</span>
                </div>
            </div>

            <div class="file-action">
                <a
                    href="${filePath}"
                    class="hero-button"
                    download
                >
                    Download
                </a>
            </div>
        `;

        return article;
    }

    function renderDownloads() {
        Object.values(containers).forEach(function (container) {
            if (container) {
                container.innerHTML = "";
            }
        });

        Object.keys(downloadsData).forEach(function (category) {
            const container = containers[category];

            if (!container) {
                return;
            }

            downloadsData[category].forEach(function (fileName) {
                container.appendChild(
                    createDownloadCard(fileName, category)
                );
            });
        });
    }

    function filterDownloads() {
        const query = searchInput.value.toLowerCase().trim();

        const items = document.querySelectorAll(
            "[data-download-item]"
        );

        let visibleCount = 0;

        items.forEach(function (item) {
            const matches =
                item.dataset.searchTerms.includes(query);

            item.hidden = !matches;

            if (matches) {
                visibleCount += 1;
            }
        });

        if (query !== "") {
            groups.forEach(function (group) {
                group.open = true;
            });
        }

        if (query === "") {
            searchMessage.textContent = "";
        } else {
            searchMessage.textContent =
                `${visibleCount} matching download${
                    visibleCount === 1 ? "" : "s"
                } found.`;
        }
    }

    groups.forEach(function (group) {
        group.addEventListener("toggle", function () {
            const actionText = group.querySelector(
                ".download-group-action"
            );

            if (actionText) {
                actionText.textContent =
                    group.open ? "Close" : "Open";
            }
        });
    });

    if (searchInput) {
        searchInput.addEventListener(
            "input",
            filterDownloads
        );
    }

    renderDownloads();
});