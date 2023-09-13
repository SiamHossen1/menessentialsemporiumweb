// handling and updating query parameters, including sorting options, based on user interactions
Shopify.queryParams = {};

if (location.search.length) {
  var params = location.search.substr(1).split("&");

  for (var i = 0; i < params.length; i++) {
    var keyValue = params[i].split("=");

    if (keyValue.length) {
      Shopify.queryParams[decodeURIComponent(keyValue[0])] = decodeURIComponent(
        keyValue[1]
      );
    }
  }
}

document.querySelector("#sort-by").addEventListener("change", function (e) {
  var value = e.target.value;

  Shopify.queryParams.sort_by = value;
  location.search = new URLSearchParams(Shopify.queryParams).toString();
});

// Enabling form submission upon checkbox change for both desktop and mobile filter forms
function checkboxChangeSubmitEvent(checkboxSelector, formSelector) {
  let checkboxes = document.querySelectorAll(checkboxSelector);
  checkboxes.forEach(function (checkbox) {
    checkbox.addEventListener("change", function () {
      document.querySelector(formSelector).submit();
    });
  });
}

checkboxChangeSubmitEvent(".checkboxes", ".filter_form");
checkboxChangeSubmitEvent(".mobile_checkboxes", ".mobile_filter_form");

// Toggle the display of filter values on clicking filter titles
function toggleNextsibling(titleSelector, activeClass) {
  let filterTitles = document.querySelectorAll(titleSelector);
  filterTitles.forEach(function (filterTitle) {
    filterTitle.addEventListener("click", function () {
      let nextSibling = filterTitle.nextElementSibling;
      if (nextSibling) {
        let allNextSiblings = document.querySelectorAll("." + activeClass);
        allNextSiblings.forEach(function (element) {
          if (element !== nextSibling) {
            element.classList.remove(activeClass);
          }
        });
        nextSibling.classList.toggle(activeClass);
      }
    });
  });
}

toggleNextsibling(".filter_title", "active");
toggleNextsibling(".mobile_filter_options", "open");

// Handling body click events to close filter values when clicking outside filter titles or price range elements
function isPriceRangeElement(element) {
  return (
    element.classList.contains("filter_group_display_price_range") ||
    element.closest(".filter_group_display_price_range")
  );
}
function handleBodyClick(event) {
  if (
    !event.target.closest(".filter_title") &&
    !isPriceRangeElement(event.target)
  ) {
    setTimeout(() => {
      let allNextSiblings = document.querySelectorAll(".filter_group_display");
      allNextSiblings.forEach(function (element) {
        element.classList.remove("active");
      });
    }, 300);
  }
}
document.body.addEventListener("click", handleBodyClick);
