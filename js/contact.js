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


 const contactForm = document.getElementById("contactForm");

if (contactForm) {
  contactForm.addEventListener("submit", function(e) {
    e.preventDefault();

    emailjs.sendForm("service_r3cfncx", "template_l93dl3k", this)
      .then(() => {
        alert("✅ Message sent successfully!");
        contactForm.reset();
      })
      .catch((error) => {
        console.error("❌ Failed to send message:", error);
        alert("⚠️ Failed to send message. Please try again later.");
      });
  });
}
