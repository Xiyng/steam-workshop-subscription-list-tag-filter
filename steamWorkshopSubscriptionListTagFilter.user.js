// ==UserScript==
// @name     Steam Workshop Subscription List Tag Filter
// @version  0.1
// @author   Xiyng
// @include  https://steamcommunity.com/id/*/myworkshopfiles/*
// @run-at   document-end
// ==/UserScript==

const tagFilterElementId = "tagFilterElement";
const searchInputId = "tagSearchInput";

initialize();

function initialize() {
    addTagFilterElement();
    const searchInput = document.querySelector(`#${searchInputId}`);
    searchInput.addEventListener("keyup", handleSearchInputKeyUp);
}

function addTagFilterElement() {
    const rightSectionHolders = document.querySelectorAll("#rightContents > .rightSectionHolder");
    const newElementSuccessor = rightSectionHolders[rightSectionHolders.length - 1];
    const tagFilterElement = createTagFilterElement();
    newElementSuccessor.parentNode.insertBefore(tagFilterElement, newElementSuccessor);
}

function deleteOldTagFilterElement() {
    const oldTagFilterElement = document.querySelector(`#{tagFilterElementId}`);
    if (oldTagFilterElement) {
      oldTagFilterElement.remove();
    }
}

function createTagFilterElement() {
    const tagFilterElement = document.createElement("div");
    tagFilterElement.id = tagFilterElementId;
    tagFilterElement.className = "rightSectionHolder";

    const searchInputLabel = document.createElement("label");
    searchInputLabel.htmlFor = searchInputId;
    searchInputLabel.textContent = "Tag";
    searchInputLabel.style.color = "#ebebeb";
    searchInputLabel.style.marginRight = "1em";
    tagFilterElement.appendChild(searchInputLabel);

    const searchInput = document.createElement("input");
    searchInput.id = searchInputId;
    searchInput.type = "text";
    tagFilterElement.appendChild(searchInput);

    return tagFilterElement;
}

function handleSearchInputKeyUp(event) {
    if (event.key === "Enter") {
        performTagSearch();
    }
}

function performTagSearch() {
    const searchInput = document.querySelector(`#${searchInputId}`);
    const tag = searchInput.value;
    searchForTag(tag);
}

function searchForTag(tag) {
    tag = tag.trim();
    const currentUrl = String(window.location);
    const currentUrlWithoutTagSearchParameter = currentUrl.replace(/&requiredtags\[0\]\=.*/, "");
    const uriTag = encodeURIComponent(tag).replace(" ", "+");
    const tagSearchParameter = uriTag.length > 0 ? `&requiredtags[0]=${uriTag}` : "";
    window.location.href = currentUrlWithoutTagSearchParameter + tagSearchParameter;
}