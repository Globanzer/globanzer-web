(function () {
  var form = document.getElementById("inquire-form");
  if (!form) return;
  var status = document.getElementById("inquire-status");
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var trap = form.querySelector("[name='_gotcha']");
    if (trap && trap.value) return;
    status.hidden = false;
    status.textContent = form.getAttribute("data-sending") || "";
    var payload = {
      name: form.elements.namedItem("name").value,
      company: form.elements.namedItem("company").value,
      email: form.elements.namedItem("email").value,
      phone: form.elements.namedItem("phone").value,
      message: form.elements.namedItem("message").value,
      _subject: "GLOBANZER web inquiry"
    };
    fetch("https://formsubmit.co/ajax/Contact.us@globanzer.com", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(payload)
    })
      .then(function (res) {
        return res.json().then(function (body) {
          return { ok: res.ok, body: body };
        });
      })
      .then(function (result) {
        if (result.ok && result.body && result.body.success !== false) {
          status.textContent = form.getAttribute("data-ok") || "";
          form.reset();
        } else {
          status.textContent = form.getAttribute("data-err") || "";
        }
      })
      .catch(function () {
        status.textContent = form.getAttribute("data-err") || "";
      });
  });
})();
