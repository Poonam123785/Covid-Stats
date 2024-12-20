document.addEventListener('DOMContentLoaded', function () {
    fetch('https://disease.sh/v3/covid-19/countries')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            const tbody = document.getElementById('tbody');
            data.forEach(country => {
                const totalActive = country.cases - country.recovered - country.deaths;
                const tableRow = `
                    <tr>
                        <td>${country.country}</td>
                        <td>${country.cases}</td>
                        <td>${totalActive}</td>
                        <td>${country.recovered}</td>
                        <td>${country.deaths}</td>
                    </tr>
                `;
                tbody.insertAdjacentHTML('beforeend', tableRow);
            });
            $('#covidtable').DataTable();
        })
        .catch(error => console.error('Error fetching data:', error));
});