import API_KEY from "./key.js";

export const PageDetail = (argument) => {
  const preparePage = () => {
    const cleanedArgument = argument.trim().replace(/\s+/g, "-");

    const displayGame = (gameData) => {
      console.log("from PageDetail");
      console.log(gameData);
      const {
        name,
        background_image,
        released,
        description,
        rating,
        ratings_count,
        short_screenshots,
        publishers,
        tags,
      } = gameData;
      const articleDOM = document.querySelector(".page-detail .article");
      articleDOM.querySelector("h1.title").innerHTML = name;
      articleDOM.querySelector("img.image").src = background_image;

      articleDOM.querySelector("p.release-date span").innerHTML = released;
      articleDOM.querySelector("p.description").innerHTML += description;
      articleDOM.querySelector("p.rating").innerHTML =
        "Rating: " + rating + " , Rating-counts: " + ratings_count;
      // Check if short_screenshots is defined before iterating
      if (short_screenshots && short_screenshots.length > 0) {
        // Create and append img elements for each screenshot
        const screenshotsContainer = articleDOM.querySelector(".screen-shots");
        short_screenshots.forEach((screenshot) => {
          const imgElement = document.createElement("img");
          imgElement.src = screenshot.image;
          screenshotsContainer.appendChild(imgElement);
        });
      }
      const publisherList = articleDOM.querySelector("p.publisher");
      publishers.forEach((publishers, index) => {
        if (index > 0) {
          publisherList.innerHTML += " / ";
        }
        publisherList.innerHTML += publishers.name;
      });

      const tagList = articleDOM.querySelector("p.tag");
      tags.forEach((tag, index) => {
        if (index > 0) {
          tagList.innerHTML += " / ";
        }
        tagList.innerHTML += tag.name;
      });

      articleDOM.innerHTML +=
        "<a href='#pagelist' class='button'>back to list </a>";
    };

    const fetchGame = (url, argument) => {
      fetch(`${url}/${argument}?key=${API_KEY}`)
        .then((response) => response.json())
        .then((responseData) => {
          displayGame(responseData);
        });
    };

    fetchGame("https://api.rawg.io/api/games", cleanedArgument);
  };

  const render = () => {
    pageContent.innerHTML = `
      <section class="page-detail">
        <div class="article">
          <h1 class="title"></h1>
          <div class="image-single">
            <img src="" class="image">
          </div>
          <p class="release-date">Release date : <span></span></p>
          <div class="description">
            <p class="description">Game description: </p>
          </div>
          <p class="rating"></p>
          <div class="screen-shots"></div>
          <p class="publisher">Publisher(s): </p>
          <p class="tag">Tags: </p>
        </div>
      </section>
    `;

    preparePage();
  };

  render();
};
