document.addEventListener('DOMContentLoaded', () => {
    const recommendationsContainer = document.querySelector('.recommendations-container');
    const searchForm = document.getElementById('search-form');
    const searchInput = document.getElementById('search-input');

    // Function to fetch recommendations data
    const fetchRecommendations = async () => {
        try {
            const response = await fetch('travel_recommendation_api.json');
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();
            console.log('Fetched data:', data); // Check data in the console
            return data;
        } catch (error) {
            console.error('Fetch error:', error);
        }
    };

    // Function to render recommendations
    const renderRecommendations = (data) => {
        recommendationsContainer.innerHTML = '';
        
        if (!data) return;

        const { countries, temples, beaches } = data;
        const searchTerm = searchInput.value.toLowerCase();

        const matchRecommendation = (item) => {
            return item.name.toLowerCase().includes(searchTerm);
        };

        const renderItem = (item) => {
            recommendationsContainer.innerHTML += `
                <div class="recommendation">
                    <img src="${item.imageUrl}" alt="${item.name}">
                    <h3>${item.name}</h3>
                    <p>${item.description}</p>
                </div>
            `;
        };

        // Filter and render countries
        countries.forEach(country => {
            country.cities.forEach(city => {
                if (matchRecommendation(city)) {
                    renderItem(city);
                }
            });
        });

        // Filter and render temples
        temples.forEach(temple => {
            if (matchRecommendation(temple)) {
                renderItem(temple);
            }
        });

        // Filter and render beaches
        beaches.forEach(beach => {
            if (matchRecommendation(beach)) {
                renderItem(beach);
            }
        });
    };

    // Handle search form submission
    searchForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const data = await fetchRecommendations();
        renderRecommendations(data);
    });
});

// Handle clear button click
clearButton.addEventListener('click', () => {
searchInput.value = '';
recommendationsContainer.innerHTML = '';
});
// Initial data fetch and render
fetchRecommendations().then(data => renderRecommendations(data));