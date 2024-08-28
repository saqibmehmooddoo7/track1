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
    document.cookie = `uniqueId=${uniqueId}; path=/; max-age=31536000; SameSite=Lax`;
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
    fetch('https://backend-js-sable.vercel.app/track', { // Ensure no double slashes
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(trackingData),
      credentials: 'include'
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.text();
    })
    .then(data => {
      console.log('Tracking data sent successfully');
    })
    .catch(error => console.error('Error sending tracking data:', error.message));
  }

  // Send page view event immediately after page load
  window.addEventListener('load', () => {
    getUserLocation().then(location => {
      const pageViewData = {
        uniqueId: uniqueId,
        url: window.location.href,
        userAgent: navigator.userAgent,
        country: location.country,
        city: location.city,
        eventType: 'page_view',
        timestamp: new Date().toISOString()
      };
      sendTrackingData(pageViewData);
    });
  });

  // Function to handle form submission
  function handleFormSubmission(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const formDataObject = {};
    formData.forEach((value, key) => {
      formDataObject[key] = value;
    });
    getUserLocation().then(location => {
      const formSubmissionData = {
        uniqueId: uniqueId,
        url: window.location.href,
        userAgent: navigator.userAgent,
        country: location.country,
        city: location.city,
        eventType: 'form_submission',
        formData: formDataObject,
        timestamp: new Date().toISOString()
      };
      sendTrackingData(formSubmissionData);
    });
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
    getUserLocation().then(location => {
      const clickData = {
        uniqueId: uniqueId,
        url: window.location.href,
        userAgent: navigator.userAgent,
        country: location.country,
        city: location.city,
        eventType: eventType,
        timestamp: new Date().toISOString()
      };
      sendTrackingData(clickData);
    });
  }

  // Add event listeners for button clicks
  const contactButton = document.getElementById('contactt');
  if (contactButton) {
    contactButton.addEventListener('click', () => handleButtonClick('contact_button_click'));
  }

  const aboutButton = document.getElementById('abdullbari');
  if (aboutButton) {
    aboutButton.addEventListener('click', () => handleButtonClick('about_button_click'));
  }

  const servicesButton = document.getElementById('saqibbbb');
  if (servicesButton) {
    servicesButton.addEventListener('click', () => handleButtonClick('services_button_click'));
  }
})();
