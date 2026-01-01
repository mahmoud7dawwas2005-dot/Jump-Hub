function closeStartAd() {
  audio.ad.play();
  document.getElementById("startAd").style.display = "none";
  document.getElementById("startScreen").style.display = "flex";
}

function showDeathAd() {
  audio.ad.play();
  document.getElementById("deathAd").style.display = "flex";
}

function showWinAd() {
  audio.ad.play();
  document.getElementById("winAd").style.display = "flex";
}

function closeDeathAd() {
  location.reload();
}
