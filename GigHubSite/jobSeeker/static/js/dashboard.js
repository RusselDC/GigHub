const ctx = document.getElementById("application_overview");

new Chart(ctx, {
  type: "pie",
  data: {
    labels: ["Pending", "Accepted", "Reviewed", "Rejected"],
    datasets: [
      {
        data: [statuses.pending, statuses.hired, statuses.review, statuses.rejected],
        backgroundColor: ["#008080", "#2f88da", "#001f3f", "#b3b3dc"],
        borderWidth: 1,
      },
    ],
  },
  options: {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  },
});
const jpo = document.getElementById("jobPosting_overview");

new Chart(jpo, {
  type: "line",
  data: {
    labels: ["Pending", "Accepted", "Reviewed", "Rejected"],
    datasets: [
      {
        label: "Job Posting Overview",
        data: [statuses.pending, statuses.hired, statuses.review, statuses.rejected],
        backgroundColor: ["#008080", "#2f88da", "#001f3f", "#b3b3dc"],
        borderWidth: 5,
        tension: 0.5,
      },
    ],
  },
  options: {
    // animations: {
    //   tension: {
    //     duration: 1000,
    //     easing: "linear",
    //     from: 1,
    //     to: 0,
    //     loop: true,
    //   },
    // },
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  },
});
