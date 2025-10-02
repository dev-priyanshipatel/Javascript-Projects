$(document).ready(function(){
  let form = document.getElementById("form");
  let nameElement = document.getElementById("name");
  let emailElement = document.getElementById("email");
  let passElement = document.getElementById("pass");
  let cpassElement = document.getElementById("cpass");
  let namePara = document.getElementById("namepara");
  let emailPara = document.getElementById("emailpara");
  let passPara = document.getElementById("passpara");
  let cpassPara = document.getElementById("cpasspara");
  let cityElement = document.getElementById("cities");
  let citiesPara = document.getElementById("citiespara");

  const emailregex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passregex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  $("#submitBtn").on("click", function (e) {
    e.preventDefault();

    let valid = true;

    if (nameElement.value.trim() === "") {
      namePara.innerText = "Enter valid Name";
      namePara.style.color = "red";
      valid = false;
    }

    if (!emailregex.test(emailElement.value.trim())) {
      emailPara.innerText = "Enter Valid Email";
      emailPara.style.color = "red";
      valid = false;
    }

    if (!passregex.test(passElement.value.trim())) {
      passPara.innerText = "Enter Valid Password";
      passPara.style.color = "red";
      valid = false;
    }

    if (cpassElement.value.trim() === "") {
      cpassPara.innerText = "Enter Conform Password";
      cpassPara.style.color = "red";
      valid = false;
    }

    if (cpassElement.value.trim() != passElement.value.trim()) {
      cpassPara.innerText = "Doesn't Match With Password";
      cpassPara.style.color = "red";
      valid = false;
    }

    if (cityElement.value === "default") {
      citiesPara.innerText = "Please Select City";
      citiesPara.style.color = "red";
      valid = false;
    }

    if (valid) {
      $("#form").submit();
    }
  });
})