const firebaseConfig = {
  apiKey: "your api key",
  authDomain: "authdomain",
  projectId: "login-famer-s",
  storageBucket: "wrt",
  messagingSenderId: "senderID",
  appId: "appID"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

let confirmationResult;

function checkPhoneNumber() {
  let PhoneNumber = document.getElementById("PhoneNumber");
  let OTP = document.getElementById("OTP");
  PhoneNumber.value = PhoneNumber.value.replace(/\D/g, '').slice(0, 10);

  OTP.style.opacity = "0%";
  if (PhoneNumber.value.length === 10) {
      OTP.classList.add("otpview");
      OTP.style.opacity = "100%";
  } else {
      OTP.classList.remove("otpview");
      OTP.style.opacity = "0%";
  }
}

function sendOTP() {
  let status=document.getElementById("status")
  const phoneNumber = document.getElementById("PhoneNumber").value;

  // Use test phone numbers bypassing reCAPTCHA verification
  status.style.opacity="100%"
  status.classList.add("status-down")
  if (phoneNumber.length === 10) {
      const fullPhoneNumber = `+91${phoneNumber}`; // Add country code +91 for India
      firebase.auth().signInWithPhoneNumber(fullPhoneNumber, window.recaptchaVerifier)
          .then((result) => {
              confirmationResult = result;
              document.getElementById("status").innerText = "✅ OTP Sent!";
              document.getElementById("otp_input").disabled = false;
          })
          .catch((error) => {
              document.getElementById("status").innerText = "❌ Error: " + error.message;
          });
  } else {
      alert("Please enter a valid 10-digit phone number.");
  }
}


function login() {
  let status=document.getElementById("status")
  const otp = document.getElementById("otp_input").value;
  confirmationResult.confirm(otp).then((result) => {
      // Successful login
      const user = result.user;
      
      // Display Login Successful message in the status paragraph
      status.innerText = "✅ Login Successful!";

      window.location.href="language.html"
      
      // You can also redirect the user or proceed to the next step
      // For example, redirect to a new page:
      // window.location.href = "dashboard.html";
  }).catch((error) => {
      document.getElementById("status").innerText = "❌ Incorrect OTP, enter valid OTP";
  });
}


// Initialize reCAPTCHA
window.onload = function () {
  window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
    size: 'invisible',
    callback: function(response) {
        sendOTP();
    }
});
  recaptchaVerifier.render();
};

