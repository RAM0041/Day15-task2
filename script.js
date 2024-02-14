const apiUrl = 'https://raw.githubusercontent.com/Rajavasanthan/jsondata/master/pagenation.json';

fetch(apiUrl)
.then(response => response.json())
.then(data => {
    const dataList = document.getElementById('dataList');
    const pagination = document.getElementById('pagination');
    const dataPerPage = 10;
    let currentPage = 1;

    function displayData(page) {
        dataList.innerHTML = '';
        const startIndex = (page - 1) * dataPerPage;
        const endIndex = startIndex + dataPerPage;
        const currentData = data.slice(startIndex, endIndex);
        currentData.forEach(item => {
            const li = document.createElement('li');
            li.textContent = item.name;
            dataList.appendChild(li);
        });
    }

    function setupPagination() {
        pagination.innerHTML = '';
        const pageCount = Math.ceil(data.length / dataPerPage);
        for (let i = 1; i <= pageCount; i++) {
            const button = document.createElement('button');
            button.textContent = i;
            button.addEventListener('click', function() {
                currentPage = i;
                displayData(currentPage);
                setupPagination();
            });
            pagination.appendChild(button);
        }
    }

    function updatePagination() {
        const prevButton = document.getElementById('prevButton');
        const nextButton = document.getElementById('nextButton');

        prevButton.disabled = currentPage === 1;
        nextButton.disabled = currentPage === Math.ceil(data.length / dataPerPage);

        prevButton.addEventListener('click', function() {
            if (currentPage > 1) {
                currentPage--;
                displayData(currentPage);
                setupPagination();
                updatePagination();
            }
        });

        nextButton.addEventListener('click', function() {
            if (currentPage < Math.ceil(data.length / dataPerPage)) {
                currentPage++;
                displayData(currentPage);
                setupPagination();
                updatePagination();
            }
        });
    }

    displayData(currentPage);
    setupPagination();
    updatePagination();
})
.catch(error => {
    console.error('There was a problem with your fetch operation:', error);
});
