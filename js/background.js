chrome.action.onClicked.addListener(function (tab) {
  chrome.windows.create(
    {
      url: chrome.runtime.getURL('index.html'),
      type: 'popup',
      left: 250,
      top: 90,
      width: 400,
      height: 650,
      // state: 'minimized',
    },
    function (win) {
      // win represents the Window object from windows API
      // Do something after opening
    }
  );
});
