// about.js
const aboutCover = document.getElementById('aboutCover');
const openAbout = document.getElementById('openAbout');
const closeAbout = document.getElementById('closeAbout');

if (openAbout && aboutCover) {
  openAbout.addEventListener('click', (e) => {
    e.preventDefault();
    aboutCover.style.display = "block";
  });
}

if (closeAbout && aboutCover) {
  closeAbout.addEventListener('click', () => {
    aboutCover.style.display = "none";
  });
}
