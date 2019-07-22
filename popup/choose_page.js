//
// browser.tabs.insertAfterCurrent - in the Firefox's about config.
//

async function styleIt() {
  var q = document.getElementsByClassName('page-choice');

  var currentMode = await browser.browserSettings.newTabPosition.get({});

  for (var i = 0; i < q.length; i++) {
    // Skipping menu items that create new tabs.
    if (q[i].classList.contains('new-tab')) {
      continue;
    }

    if (q[i].attributes['data-type'].value == currentMode.value) {
      q[i].classList.add('current');
    }
    else {
      q[i].classList.remove('current');
    }
  }
}

styleIt();

document.addEventListener("click", async function(e) {
  if (!e.target.classList.contains("page-choice")) {
    return;
  }

  //
  // The next table explains the code below.
  // Vertically - menu items, horizontally - current insert mode.
  //
  //          \ afterCurrent | atEnd
  // ------------------------|------
  // +Current | -            | > <
  // +End     | > <          | -
  //  Current | -            | >
  //  End     | >            | -
  //
  // Where:
  //  > Change
  //  < Restore back
  //  - Do not change
  //

  var currentMode = await browser.browserSettings.newTabPosition.get({});

  if (currentMode.value == e.target.dataset.type) {
    if (e.target.classList.contains("new-tab")) {
      browser.tabs.create({});
    }
  }
  else {
    await browser.browserSettings.newTabPosition.set({value: e.target.dataset.type});
    if (e.target.classList.contains("new-tab")) {
      browser.tabs.create({});
      await browser.browserSettings.newTabPosition.set({value: currentMode.value});
    }
  }

  //

  styleIt();
});