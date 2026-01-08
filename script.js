let data = [];

// Hent JSON-data
fetch("data.json")
    .then(response => {
        if (!response.ok) {
            throw new Error("Kunne ikke hente data.json");
        }
        return response.json();
    })
    .then(json => {
        data = json;
        console.log("Antal poster indlæst:", data.length);
        render(data); // Vis alle poster ved start
    })
    .catch(err => {
        console.error("Fejl ved indlæsning af data:", err);
    });

// Søgning
document.getElementById("searchInput").addEventListener("input", function () {
    const query = this.value.toLowerCase().trim();

    const filtered = data.filter(p =>
        (p.Forening || "").toLowerCase().includes(query) ||
        (p.Navn || "").toLowerCase().includes(query) ||
        (p.Adresse || "").toLowerCase().includes(query)
    );

    render(filtered);
});

// Render tabel
function render(results) {
    const tbody = document.getElementById("results");
    tbody.innerHTML = "";

    results.forEach(p => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${p.Forening || ""}</td>
            <td>${p.Navn || ""}</td>
            <td>${p.Adresse || ""}</td>
            <td>${p.Stilling || ""}</td>
            <td>${p.Fødselsdato || ""}</td>
        `;

        tbody.appendChild(row);
    });
}
