const form = document.getElementById("vcard-form");
const qrContainer = document.getElementById("qrcode");
const preview = document.getElementById("vcard-preview");

let qrInstance = null; // keep a reference so we can clear/redraw on regenerate

form.addEventListener("submit", function (e) {
  e.preventDefault(); // stop the page from reloading on submit

  // 1. Read every field the user typed in
  const fn = document.getElementById("Name").value.trim();
  const tel = document.getElementById("Phone").value.trim();
  const email = document.getElementById("Email").value.trim();
  const url = document.getElementById("Website").value.trim();
  const org = document.getElementById("Company").value.trim();
  const title = document.getElementById("Title").value.trim();
  const adr = document.getElementById("Address").value.trim();

  // 2. Build the QR text using plain, human-readable labels instead of the
  //    official vCard field names. NOTE: this means phones will show this as
  //    plain scanned text, not an auto "Import contact" prompt, since the
  //    BEGIN:VCARD / VERSION / END:VCARD markers and standard field names
  //    (FN, TEL, EMAIL...) are what phones look for to recognize a contact.
  let vcard = "";
  if (fn) vcard += `Name:${fn}\n`;
  if (tel) vcard += `Phone:${tel}\n`;
  if (email) vcard += `Email:${email}\n`;
  if (url) vcard += `Website:${url}\n`;
  if (org) vcard += `Company:${org}\n`;
  if (title) vcard += `Title:${title}\n`;
  if (adr) vcard += `Address:${adr}\n`;
  vcard = vcard.trim(); // drop the trailing newline after the last field

  // 3. Show the raw text so you can see exactly what's being encoded
  preview.textContent = vcard;

  // 4. Clear any previously drawn QR code, then draw a new one
  qrContainer.innerHTML = "";
  qrInstance = new QRCode(qrContainer, {
    text: vcard,
    width: 220,
    height: 220,
  });
});