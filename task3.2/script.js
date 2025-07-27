async function getJoke() {
  const category = document.getElementById("category").value;
  const jokeText = document.getElementById("joke-text");
  const loader = document.getElementById("loader");

  // Show loading
  loader.classList.remove("hidden");
  jokeText.innerText = "";

  try {
    const response = await fetch(`https://v2.jokeapi.dev/joke/${category}?blacklistFlags=nsfw,religious,political,racist,sexist,explicit`);
    const data = await response.json();

    let joke = "";

    if (data.type === "single") {
      joke = data.joke;
    } else {
      joke = `${data.setup}\n\n${data.delivery}`;
    }

    jokeText.innerText = joke;
  } catch (error) {
    jokeText.innerText = "Oops! Something went wrong. Try again.";
    console.error("Error fetching joke:", error);
  } finally {
    loader.classList.add("hidden");
  }
}
