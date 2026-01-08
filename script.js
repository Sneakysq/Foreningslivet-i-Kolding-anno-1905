let data = [];

// Hent JSON-data
fetch("data.json")
    .then(response => response.json())
    .then(json => {
        data = json;
        console.log("Antal poster:", data.length);
        render(data);
    })
    .catch(err => console.error("Kunne ikke indlæse data.json", err));

// Søgning
document.getElementById("searchInput").addEventListener("input", function () {
    const query = this.value.toLowerCase();

   const filtered = data.filter(p =>
    (p.forening || "").toLowerCase().includes(query) ||
    (p.navn || "").toLowerCase().includes(query) ||
    (p.adresse || "").toLowerCase().includes(query)
);

    render(filtered);
});

function render(results) {
    const tbody = document.getElementById("results");
    tbody.innerHTML = "";

    results.forEach(p => {
        const row = document.createElement("tr");
       row.innerHTML = `
    <td>${p.Forening}</td>
    <td>${p.Navn}</td>
    <td>${p.Adresse}</td>
    <td>${p.Stilling}</td>
    <td>${p.Fødselsdato}</td>
        `;
        tbody.appendChild(row);
    });
}





