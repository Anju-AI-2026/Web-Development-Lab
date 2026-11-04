const contactForm = document.getElementById("contact-form");
const nameInput = document.getElementById("name");
const phoneInput = document.getElementById("phone");
const emailInput = document.getElementById("email");
const searchInput = document.getElementById("search");
const contactList = document.getElementById("contact-list");
const contactCount = document.getElementById("contact-count");
const emptyMessage = document.getElementById("empty-message");
const formTitle = document.getElementById("form-title");
const saveButton = document.getElementById("save-button");
const cancelButton = document.getElementById("cancel-button");

let contacts = JSON.parse(localStorage.getItem("contacts")) || [];
let editingId = null;

function saveContacts() {
    localStorage.setItem("contacts", JSON.stringify(contacts));
}

function displayContacts() {
    const searchValue = searchInput.value.toLowerCase();

    const filteredContacts = contacts.filter(contact =>
        contact.name.toLowerCase().includes(searchValue) ||
        contact.phone.includes(searchValue)
    );

    contactList.innerHTML = "";

    contactCount.textContent =
        contacts.length + (contacts.length === 1 ? " Contact" : " Contacts");

    emptyMessage.style.display =
        filteredContacts.length === 0 ? "block" : "none";

    filteredContacts.forEach(contact => {
        const card = document.createElement("div");
        card.className = "contact-card";

        const heading = document.createElement("h3");
        heading.textContent = contact.name;

        const phone = document.createElement("p");
        phone.textContent = "Phone: " + contact.phone;

        const email = document.createElement("p");
        email.textContent = "Email: " + (contact.email || "Not provided");

        const actions = document.createElement("div");
        actions.className = "card-actions";

        const editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.className = "edit-button";

        editButton.addEventListener("click", () => editContact(contact.id));

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.className = "delete-button";

        deleteButton.addEventListener("click", () => deleteContact(contact.id));

        actions.append(editButton, deleteButton);
        card.append(heading, phone, email, actions);
        contactList.appendChild(card);
    });
}

contactForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const name = nameInput.value.trim();
    const phone = phoneInput.value.trim();
    const email = emailInput.value.trim();

    if (!name || !phone) {
        alert("Please enter the name and phone number.");
        return;
    }

    const duplicate = contacts.some(contact =>
        contact.phone === phone && contact.id !== editingId
    );

    if (duplicate) {
        alert("This phone number already exists.");
        return;
    }

    if (editingId !== null) {
        contacts = contacts.map(contact =>
            contact.id === editingId
                ? { ...contact, name, phone, email }
                : contact
        );
    } else {
        contacts.push({
            id: Date.now(),
            name,
            phone,
            email
        });
    }

    saveContacts();
    resetForm();
    displayContacts();
});

function editContact(id) {
    const contact = contacts.find(item => item.id === id);

    if (!contact) return;

    nameInput.value = contact.name;
    phoneInput.value = contact.phone;
    emailInput.value = contact.email;

    editingId = id;
    formTitle.textContent = "Edit Contact";
    saveButton.textContent = "Update Contact";
    cancelButton.style.display = "block";

    window.scrollTo({ top: 0, behavior: "smooth" });
}

function deleteContact(id) {
    const confirmed = confirm("Are you sure you want to delete this contact?");

    if (!confirmed) return;

    contacts = contacts.filter(contact => contact.id !== id);

    saveContacts();
    displayContacts();
}

function resetForm() {
    contactForm.reset();
    editingId = null;
    formTitle.textContent = "Add New Contact";
    saveButton.textContent = "Add Contact";
    cancelButton.style.display = "none";
}

cancelButton.addEventListener("click", resetForm);

searchInput.addEventListener("input", displayContacts);

displayContacts();