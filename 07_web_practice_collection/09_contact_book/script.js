const contactForm = document.getElementById("contact-form");
const nameInput = document.getElementById("name");
const phoneInput = document.getElementById("phone");
const searchInput = document.getElementById("search");
const contactList = document.getElementById("contact-list");

let contacts = JSON.parse(localStorage.getItem("contacts")) || [];

function displayContacts(contactArray) {
    contactList.innerHTML = "";

    contactArray.forEach((contact) => {
        const li = document.createElement("li");

        const details = document.createElement("span");
        details.textContent = contact.name + " - " + contact.phone;

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";

        deleteButton.addEventListener("click", () => {
            contacts = contacts.filter(item => item.id !== contact.id);
            saveContacts();
            searchContacts();
        });

        li.appendChild(details);
        li.appendChild(deleteButton);
        contactList.appendChild(li);
    });
}

function saveContacts() {
    localStorage.setItem("contacts", JSON.stringify(contacts));
}

contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = nameInput.value.trim();
    const phone = phoneInput.value.trim();

    if (name === "" || phone === "") {
        alert("Please enter all details.");
        return;
    }

    const newContact = {
        id: Date.now(),
        name: name,
        phone: phone
    };

    contacts.push(newContact);
    saveContacts();
    contactForm.reset();
    searchContacts();
});

function searchContacts() {
    const searchValue = searchInput.value.toLowerCase();

    const filteredContacts = contacts.filter(contact =>
        contact.name.toLowerCase().includes(searchValue)
    );

    displayContacts(filteredContacts);
}

searchInput.addEventListener("input", searchContacts);

displayContacts(contacts);