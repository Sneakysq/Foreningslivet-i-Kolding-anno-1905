let data = [];

fetch("data.csv")
    .then(response => response.text())
    .then(text => {
        const rows = text.split("\n").slice(1);
        data = rows.map(row => {
            const [forening, navn, adresse, stilling, fodselsdato] = row.split(",");
            return { forening, navn, adresse, stilling, fodselsdato };
        });
    });

document.getElementById("searchInput").addEventListener("input", function () {
    const query = this.value.toLowerCase();
    const filtered = data.filter(person =>
        person.forening.toLowerCase().includes(query) ||
        person.navn.toLowerCase().includes(query) ||
        person.adresse.toLowerCase().includes(query)
    );
    showResults(filtered);
});

function showResults(results) {
    const tbody = document.getElementById("results");
    tbody.innerHTML = "";

    results.forEach(person => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${person.forening}</td>
            <td>${person.navn}</td>
            <td>${person.adresse}</td>
            <td>${person.stilling}</td>
            <td>${person.fodselsdato}</td>
        `;
        tbody.appendChild(row);
    });
}
