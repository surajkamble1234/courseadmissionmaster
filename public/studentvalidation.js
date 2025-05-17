

function validateStudent(str) {
  let namevalid = true;
  const validatestudent = document.getElementById("sone");
     setTimeout(() => {
     validatestudent.style.display="none";
    }, 3000);
  if (str.trim().length === 0) {
    namevalid = false;
  } else {
    for (let i = 0; i < str.length; i++) {
      let ch = str.charCodeAt(i);
      if ((ch >= 65 && ch <= 90) || (ch >= 97 && ch <= 122) || ch === 32) {
        continue;
      } else {
        namevalid = false;
        break;
      }
    }
  }

  if (namevalid) {
    validatestudent.style.color = "green";
    validatestudent.innerHTML = "Valid name";
  } else {
    validatestudent.style.color = "red";
    validatestudent.innerHTML = "Invalid name";
  }

  return namevalid;
}

function validateEmail(str) {
  const msg = document.getElementById("eone");
    setTimeout(() => {
     msg.style.display="none";
    }, 3000);
  str = str.trim();
  let atFound = false;
  let dotFound = false;
  let isValid = true;
  let atPos = -1;
  let dotPos = -1;

  if (str.length === 0) {
    isValid = false;
  }

  for (let i = 0; i < str.length; i++) {
    let ch = str.charAt(i);
    if (ch === '@') {
      if (atFound) {
        isValid = false;
        break;
      }
      atFound = true;
      atPos = i;
    }
    if (ch === '.') {
      dotFound = true;
      dotPos = i;
    }
  }

  if (!atFound || !dotFound || atPos === 0 || dotPos < atPos + 2 || dotPos === str.length - 1) {
    isValid = false;
  }

  if (isValid) {
    msg.style.color = "green";
    msg.innerHTML = "Valid email";
  } else {
    msg.style.color = "red";
    msg.innerHTML = "Invalid email";
  }

  return isValid;
}

function validateContact(str) {
  const vcontact = document.getElementById("cone");
    setTimeout(() => {
     vcontact.style.display="none";
    }, 3000);
  let Valid = true;
  
  if (str.length !== 10) {
    Valid = false;
  } else {
    for (let i = 0; i < str.length; i++) {
      let ch = str.charCodeAt(i);
      if (ch < 48 || ch > 57) {
        Valid = false;
        break;
      }
    }
  }

  if (Valid) {
    vcontact.style.color = "green";
    vcontact.innerHTML = "Valid contact";
  } else {
    vcontact.style.color = "red";
    vcontact.innerHTML = "Invalid contact";
  }

  return Valid;
}

 function submitForm(e) {
  let name = document.getElementById("n").value;
  let email = document.getElementById("em").value;
  let contact = document.getElementById("c").value;
  let course = document.getElementById("course").value;

  let check1 = validateStudent(name);
  let check2 = validateEmail(email);
  let check3 = validateContact(contact);

  if (!check1 || !check2 || !check3 || course === "") {
    let ss=document.getElementById("h");
    ss.innerHTML="plz Fill The Valid Data";
    ss.style.color="red";
    
     setTimeout(() => {
     ss.style.display="none";
    }, 3000);


    if (e) e.preventDefault(); 
    return false; 
  }

  return true; 
}

    window.onload = function () {
    let msgSpan = document.getElementById("msg");
        msgSpan.style.color="green"
    if (msgSpan && msgSpan.innerHTML.trim() !== "") {
        setTimeout(() => {
            msgSpan.style.display = "none";
        }, 3000); // hide after 3 seconds
    }
};