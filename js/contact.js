const contactCover = document.getElementById('contactCover');
const openContact = document.getElementById('openContact');
const closeContact = document.getElementById('closeContact');

if (openContact && contactCover) {
  openContact.addEventListener('click', (e) => {
    e.preventDefault();
    contactCover.style.display = "block"; // Hide on load
  });
}

if (closeContact && contactCover) {
  closeContact.addEventListener('click', () => {
    contactCover.style.display = "none";
  });
}


