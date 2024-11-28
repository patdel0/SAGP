import { fetchUsers, createUser } from './users.js'

// Placeholder code to interact with form
const usersListElement = document.querySelector("ul")
const formElement = document.querySelector("form")
const userNameElement = document.querySelector("input")

usersListElement.innerText = JSON.stringify(Object.values(await fetchUsers()))

formElement.addEventListener("submit", async (event) => {
  event.preventDefault();
  await createUser({ name: userNameElement.value });
  usersListElement.innerText = JSON.stringify(Object.values(await fetchUsers()))
  userNameElement.value = ""
})

