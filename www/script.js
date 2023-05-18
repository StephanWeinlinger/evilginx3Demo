const mitmTest = () => {
  if (window.location.host != "www.sw-test.com") {
    alert(
      "Sie sind Ziel eines RT MITM Angriffs geworden! Sie werden nun auf die echte Website weitergeleitet"
    );
    window.location.replace("https://www.sw-test.com");
  }
};
mitmTest();
