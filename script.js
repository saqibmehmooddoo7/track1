(function() {
  // Function to generate a unique ID
  function generateUniqueId() {
      return 'xxxxxxxxyxxxxyx'.replace(/[xy]/g, function(c) {
          const r = Math.random() * 16 | 0;
          const v = c === 'x' ? r : (r & 0x3 | 0x8);
          return v.toString(16);
      });
  }

  // Function to get a cookie value by name
  function getCookie(name) {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop().split(';').shift();
      return null;
  }

  // Check if the user already has a unique ID stored in a cookie
  let uniqueId = getCookie('uniqueId');
  if (!uniqueId) {
      // Generate a new unique ID if not found
      uniqueId = generateUniqueId();
      // Store the unique ID in a cookie for 1 year
      document.cookie = `uniqueId=${uniqueId}; path=/; max-age=31536000;`; // 1 year
  }

  // Function to get user location using an IP-based API
  function getUserLocation() {
      return fetch('https://ipinfo.io?token=c9b99fcc3675c3')
          .then(response => response.json())
          .then(data => ({
              country: data.country,
              city: data.city
          }))
          .catch(error => {
              console.error('Error fetching location data:', error.message);
              return { country: 'Unknown', city: 'Unknown' };
          });
  }

  // Function to send tracking data
  function sendTrackingData(trackingData) {
      fetch('https://backend-8eoysop6j-saqib-mehmoods-projects-734912ba.vercel.app', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(trackingData),
          mode: 'no-cors'
      })
      .then(response => {
          if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
      })
      .then(data => {
          console.log('Tracking data sent:', data);
      })
      .catch(error => console.error('Error sending tracking data:', error.message));
  }

  // Send page view event immediately after page load
  window.addEventListener('load', () => {
      getUserLocation().then(location => {
          const pageViewData = {
              uniqueId: uniqueId,
              url: window.location.href,
              userAgent: navigator.userAgent, // Include userAgent for page view
              country: location.country,      // Include country for page view
              city: location.city,            // Include city for page view
              eventType: 'page_view',
              timestamp: new Date().toISOString()
          };
          sendTrackingData(pageViewData);
      });
  });

  // Function to handle form submission
  function handleFormSubmission(event) {
      event.preventDefault(); // Prevent the default form submission behavior

      const formData = new FormData(event.target);
      const formDataObject = {};
      formData.forEach((value, key) => {
          formDataObject[key] = value;
      });

      const formSubmissionData = {
          uniqueId: uniqueId,
          url: window.location.href,
          eventType: 'form_submission',
          formData: formDataObject, // Add form data to tracking data
          timestamp: new Date().toISOString()
      };
      sendTrackingData(formSubmissionData);

      // Optionally, you can submit the form normally after tracking
      // event.target.submit();
  }

  // Add event listener for form submission
  const form = document.getElementById('form-button');
  if (form) {
      form.addEventListener('submit', handleFormSubmission);
  }

  // Function to handle button clicks
  function handleButtonClick(eventType) {
      const clickData = {
          uniqueId: uniqueId,
          url: window.location.href,
          eventType: eventType,
          timestamp: new Date().toISOString()
      };
      sendTrackingData(clickData);
  }

  // Add event listeners for button clicks
  const contactButton = document.getElementById('contactt');
  contactButton.addEventListener('click', () => handleButtonClick('contact_button_click'));

  const aboutButton = document.getElementById('abdullbari');
  aboutButton.addEventListener('click', () => handleButtonClick('about_button_click'));

  const servicesButton = document.getElementById('saqibbbb');
  servicesButton.addEventListener('click', () => handleButtonClick('services_button_click'));

})();
// ====================Scroll Section Active Link================//
let Sections = document.querySelectorAll("section");
let navLinks = document.querySelectorAll("header nav a");

window.onscroll = () => {
  Sections.forEach((sec) => {
    let top = window.scrollY;
    let offset = sec.offsetTop - 150;
    let height = sec.offsetHeight;
    let id = sec.getAttribute("id");

    if (top >= offset && top < offset + height) {
      navLinks.forEach((links) => {
        links.classList.remove("active");
        document
          .querySelector(`header nav a[href*="${id}"]`)
          .classList.add("active");
      });
    }
  });
  // ===========================sticky navbar=================//

  let header = document.querySelector("header");
  header.classList.toggle("sticky", window.scrollY > 100);

  // ========================Remove toggle icon and navbar when click navbar link(scroll)=================//

  menuIcon.classList.remove("bx-x");
  navbar.classList.remove("active");
};

//========================scroll Reveal=================//

ScrollReveal({
  //   reset: true,
  distance: "80px",
  duration: 2000,
  delay: 200,
});
ScrollReveal().reveal(".home-content, .heading", { origin: "top" });
ScrollReveal().reveal(
  ".home-img, .services-container, .portfolio-box, .contact form",
  { origin: "bottom" }
);
ScrollReveal().reveal(".home-content h1, .about-img", { origin: "left" });
ScrollReveal().reveal(".home-content p, .about-content", { origin: "right" });

//========================Typed JS=================//
const typed = new Typed(".multiple-text", {
  strings: ["Frontend Developer", "Graphic Designer", "Video Editor"],
  typeSpeed: 50,
  backSpeed: 50,
  backDelay: 1000,
  loop: true,
});
