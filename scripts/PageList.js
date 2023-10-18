import API_KEY from "./key.js";

export const PageList = (argument = "") => {
  let currentPage = 1; // Track the current page
  const perPage = 9; // Number of articles to display per page

  const preparePage = () => {
    const cleanedArgument = argument.trim().replace(/\s+/g, "-");

    const displayResults = (articles) => {
      // Use slice to display only the desired number of articles per page
      const startIndex = (currentPage - 1) * perPage;
      const endIndex = startIndex + perPage;
      const displayedArticles = articles.slice(startIndex, endIndex);
      console.log("from PageList");
      console.log(articles[0]);

      const resultsContent = displayedArticles.map(
        (article) =>
          `<article class="cardGame">
            <img src="${article.background_image}" alt="${article.name}" class="game-image">
            <h1>${article.name}</h1>
            <h2>${article.released}</h2>
            <div class="screen">
            <img src="${article.short_screenshots[1].image}" class="screen-shot">
            <img src="${article.short_screenshots[2].image}" class="screen-shot">
            <img src="${article.short_screenshots[3].image}" class="screen-shot">
            <img src="${article.short_screenshots[4].image}" class="screen-shot">
            </div>
            <a href="#pagedetail/${article.id}">show details</a>
          </article>`
      );

      const resultsContainer = document.querySelector(".page-list .articles");
      resultsContainer.innerHTML = resultsContent.join("\n");

      // Check if there are more articles to load
      if (articles.length > endIndex) {
        // Add a button to load more articles
        const loadMoreButton = document.createElement("button");
        loadMoreButton.textContent = "Show More";
        loadMoreButton.addEventListener("click", loadMoreArticles);
        resultsContainer.appendChild(loadMoreButton);
      }
    };

    const fetchList = (url, argument, page) => {
      const finalURL = argument
        ? `${url}&search=${argument}&page=${page}`
        : `${url}&page=${page}`;

      fetch(finalURL)
        .then((response) => response.json())
        .then((responseData) => {
          displayResults(responseData.results);
        });
    };

    const loadMoreArticles = () => {
      currentPage++;
      fetchList(
        `https://api.rawg.io/api/games?key=${API_KEY}`,
        cleanedArgument,
        currentPage
      );
    };

    const resultsContainer = document.querySelector(".page-list .articles");

    // Initial fetch and display
    fetchList(
      `https://api.rawg.io/api/games?key=${API_KEY}`,
      cleanedArgument,
      currentPage
    );
  };

  const render = () => {
    pageContent.innerHTML = `
      <section class="page-list">
        <div class="articles">Loading...</div>
      </section>
    `;

    preparePage();
  };

  render();
};
