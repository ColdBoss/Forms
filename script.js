
const form = document.getElementById('myForm');
const nameInput = document.getElementById('name');
const ctx = document.getElementById('leaderboardChart').getContext('2d');


let submissions = {};


let chart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: [],
        datasets: [{
            label: 'Submissions',
            data: [],
            backgroundColor: 'rgba(54, 162, 235, 0.7)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
        }]
    },
    options: {
        indexAxis: 'y', // horizontal bars
        responsive: false,
        scales: {
            x: { beginAtZero: true }
        },
        plugins: {
            legend: { display: false }
        }
    }
});


form.addEventListener('submit', e => {
    e.preventDefault(); // prevent actual submission to test leaderboard

    const name = nameInput.value.trim();
    if (!name) return;

  
    submissions[name] = (submissions[name] || 0) + 1;

    // Sort top 5 submitters
    const top = Object.entries(submissions)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5);


    chart.data.labels = top.map(([n]) => n);
    chart.data.datasets[0].data = top.map(([_, count]) => count);
    chart.update();

  
    nameInput.value = '';
});
