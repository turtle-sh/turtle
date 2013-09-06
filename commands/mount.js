turtle.addCommand({
  "expr": /mount/,
  "fn": function(message) {
    chrome.fileSystem.chooseEntry({
      type: "openDirectory"   
    }, function() {

    });
    this.exit();
  }
});
