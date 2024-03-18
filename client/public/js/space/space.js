
const toggle = document.querySelector(".theme-controller");
    const body = document.querySelector("body");
    body.setAttribute(
      "data-theme",
      localStorage.getItem("theme") ? localStorage.getItem("theme") : "light"
    );
    if (localStorage.getItem("theme") == "dark") {
      toggle.checked = true;
    }

    toggle.addEventListener("change", (e) => {
      if (e.target.checked) {
        body.setAttribute("data-theme", "dark");
        localStorage.setItem("theme", "dark");
      } else {
        body.setAttribute("data-theme", "light");
        localStorage.setItem("theme", "light");
      }
    });

    const ctx = document.getElementById("myChart");

    const chart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: ["Audios", "Videos", "Documents", "Photos", "Recycle Bin"],
        datasets: [
          {
            label: "Personal",
            data: [12, 19, 3, 5, 2],
            showLine: true,
            backgroundColor: [
              "rgba(255, 99, 132, 0.6)",
              "rgba(255, 159, 64, 0.6)",
              "rgba(255, 205, 86, 0.6)",
              "rgba(75, 192, 192, 0.6)",
              "rgba(54, 162, 235, 0.6)",
            ],
            borderColor: [
              "rgb(255, 99, 132)",
              "rgb(255, 159, 64)",
              "rgb(255, 205, 86)",
              "rgb(75, 192, 192)",
              "rgb(54, 162, 235)",
            ],
            borderWidth: 1,
            borderRadius: 5,
          },
        ],
      },
      options: {
        responsive: true,
        indexAxis: "y",
        scales: {
          y: {
            beginAtZero: true,
            styling: {
              maxBarThickness: 15,
            },
          },
        },
        plugins: {
          legend: {
            display: false,
          },
        },
      },
    });