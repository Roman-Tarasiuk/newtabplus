//
// Initializing the default behavior, it runs only once.
// Possible values are: afterCurrent, atEnd, relatedAfterCurrent.
//
(async function run() {
    initialMode = { value: 'afterCurrent' };
    await browser.browserSettings.newTabPosition.set(initialMode);
})();