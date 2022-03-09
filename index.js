const url =
    'https://en.wikipedia.org/w/api.php?action=query&list=search&srlimit=20&format=json&origin=*&srsearch=';

const searchForm = document.querySelector('.search-form');
const searchInput = document.querySelector('.form-input');
const searchResults = document.querySelector('.search-results');

searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const value = searchInput.value;
    if (!value) {
        searchResults.innerHTML =
            '<div class="error">Please enter a valid search term</div>';
        return;
    }
    fetchPages(value);
});

const fetchPages = async (searchValue) => {
    searchResults.innerHTML = '<div class="loader"></div>';
    try {
        const response = await fetch(`${url}${searchValue}`);
        const data = await response.json();
        const results = data.query.search;
        if (results.length < 1) {
            searchResults.innerHTML =
                '<div class="error">No matching results. Please try again</div>';
            return;
        }
        renderResults(results);
    } catch (error) {
        searchResults.innerHTML = '<div class="error">Something went wrong</div>';
    }
};

const renderResults = (list) => {
    const resultsList = list
        .map((item) => {
            const { title, snippet, pageid } = item;
            return `
            <div class="article">
              <a href=http://en.wikipedia.org/?curid=${pageid} target="_blank">${title}</a>
              <p>${snippet}</p>
            </div>`;
        })
        .join('');
    searchResults.innerHTML = `<div class="articles">
          ${resultsList}
        </div>`;
};