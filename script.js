getvalue = localStorage.getItem("username");
    aa.innerHTML = `WELCOME ${getvalue}`;
    function logout(){
        window.location = "index.html"
        }
        

const apiUrl = 'https://jsonplaceholder.typicode.com/users';


function createCard(data) {
    const card = document.createElement('div');
    card.classList.add('card');

    const cardContent = `
    <h4>${data.id}</h4>
        <h2>${data.name}</h2>
        <p><strong>Username:</strong> ${data.username}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Phone:</strong> ${data.phone}</p>
        <p><strong>Website:</strong> <a href="http://${data.website}" target="_blank">${data.website}</a></p>
    `;   

    card.innerHTML = cardContent;
    return card;
}


async function fetchData() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        const cardContainer = document.getElementById('card-container');
        data.forEach(item => {
            const card = createCard(item);
            cardContainer.appendChild(card);
        });
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}


window.onload = fetchData;
username.value = "";



function search() {
    const userId = document.getElementById('fmsearch').value;
    fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
     .then(response => response.json())
     .then(data => {
        const userDetails = `
          <div class="card">
            <h2 class="card-title">ID: ${data.id}</h2>
            <div class="card-body">
              <p class="card-text">Name: ${data.name}</p>
              <p class="card-text">Username: ${data.username}</p>
              <p class="card-text">Email: ${data.email}</p>
              <p class="card-text">Website: ${data.website}</p>
            </div>
          </div>
        `;
        const newPage = window.open('', '_blank');
        newPage.document.write(`
          <html>
            <head>
              <title>User Details</title>
              <style>
                body {
                  font-family: Arial, sans-serif;
                  background-color: #f0f0f0;
                }
               .card {
                  width: 300px;
                  margin: 40px auto;
                  padding: 20px;
                  border: 1px solid #ddd;
                  border-radius: 10px;
                  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                }
               .card-title {
                  font-size: 24px;
                  font-weight: bold;
                  margin-bottom: 10px;
                }
               .card-body {
                  padding: 20px;
                }
               .card-text {
                  margin-bottom: 10px;
                }
              </style>
            </head>
            <body>
              ${userDetails}
            </body>
          </html>
        `);
        newPage.document.close();
      })
     .catch(error => console.error('Error:', error));
  }