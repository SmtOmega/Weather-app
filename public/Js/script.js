console.log("We coming for u");

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector('#mess-1')
const messageTwo = document.querySelector('#mess-2')

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const location = search.value;
  messageOne.textContent = "Loading..."
  messageTwo.textContent = ""
  fetch(`/weather?address=${location}`).then((res) =>
    res.json().then((data) => {
      if (data.error) {
        messageOne.textContent = data.error
      } else {
        messageOne.textContent = data.forcast.temp
        messageTwo.textContent = data.location
      }
    })
  );
});
