let incidents = [];

function renderIncidents() {
    const incidentListContainer = document.getElementById('incident-list-container');
    incidentListContainer.innerHTML = '';

    const filterSeverity = document.getElementById('filter-severity').value;
    const sortDate = document.getElementById('sort-date').value;

    let filteredIncidents = incidents.filter(incident => {
        return filterSeverity ? incident.severity === filterSeverity : true;
    });

    if (sortDate === 'newest') {
        filteredIncidents.sort((a, b) => new Date(b.reportedDate) - new Date(a.reportedDate));
    } else {
        filteredIncidents.sort((a, b) => new Date(a.reportedDate) - new Date(b.reportedDate));
    }

    filteredIncidents.forEach((incident, index) => {
        const incidentDiv = document.createElement('div');
        incidentDiv.classList.add('incident');
        incidentDiv.innerHTML = `
            <h3>${incident.title}</h3>
            <p>Severity: ${incident.severity} | Reported Date: ${incident.reportedDate}</p>
            <button onclick="toggleDescription(${index})">View Details</button>
            <div class="description" id="desc-${index}" style="display: none;">
                <p>${incident.description}</p>
            </div>
        `;
        incidentListContainer.appendChild(incidentDiv);
    });
}

function toggleDescription(index) {
    const description = document.getElementById(`desc-${index}`);
    description.style.display = description.style.display === 'none' ? 'block' : 'none';
}

document.getElementById('incident-form').addEventListener('submit', function (event) {
    event.preventDefault();

    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const severity = document.getElementById('severity').value;

    if (title && description && severity) {
        const reportedDate = new Date().toISOString();

        incidents.push({
            title,
            description,
            severity,
            reportedDate,
        });

        document.getElementById('incident-form').reset();

        renderIncidents();
    } else {
        alert("All fields are required!");
    }
});

document.getElementById('filter-severity').addEventListener('change', renderIncidents);
document.getElementById('sort-date').addEventListener('change', renderIncidents);

renderIncidents();
