window.addEventListener("error", function (event) {
  if (event.error && event.error.constructor && event.error.constructor.name === "AssertException") {
    console.log("Archive repair assertion:", event.error.message || String(event.error));
  }
});
