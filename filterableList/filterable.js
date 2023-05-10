let dataArray;

async function getUsers() {
	try {
		const response = await fetch(
			"https://randomuser.me/api/?nat=fr&results=50"
		);

		const { results } = await response.json();
		orderList(results);
		dataArray = results;
		createUserList(dataArray);
	} catch (error) {
		console.log(error);
	}
}
getUsers();

function orderList(data) {
	data.sort((a, b) => {
		if (a.name.last < b.name.last) {
			return -1;
		} else if (a.name.last > b.name.last) {
			return 1;
		} else {
			return 0;
		}
	});
}

var sortable = document.querySelector(".table-title");
sortable.addEventListener("click", function () {
	var sorted = dataArray.reverse();
	createUserList(sorted, true);
});

const tableResults = document.querySelector(".table-results");

function createUserList(array, replace = false) {
	array.forEach((user) => {
		let index = array.indexOf(user);
		const listItem = document.createElement("li");
		listItem.className = "table-item";

		listItem.innerHTML = `
      <p class="main-info">
        <img
          src=${user.picture.thumbnail}
          alt="avatar picture"
        />
        <span>${user.name.last} ${user.name.first}</span>
      </p>
      <p class="email">${user.email}</p>
      <p class="phone">${user.phone}</p>

    `;
		if (replace) {
			tableResults.replaceChild(listItem, tableResults.childNodes[index]);
		} else {
			tableResults.appendChild(listItem);
		}
	});
}

const searchInput = document.querySelector("#search");

searchInput.addEventListener("input", filterData);

function filterData(e) {
	tableResults.textContent = "";

	const searchedString = e.target.value.toLowerCase().replace(/\s/g, "");

	const filteredArr = dataArray.filter((userData) =>
		searchForOccurences(userData)
	);

	function searchForOccurences(userData) {
		const searchTypes = {
			firstname: userData.name.first.toLowerCase(),
			lastName: userData.name.last.toLowerCase(),
			firstAndLast: `${userData.name.first + userData.name.last}`.toLowerCase(),
			lastAndFirst: `${userData.name.last + userData.name.first}`.toLowerCase(),
		};
		for (const prop in searchTypes) {
			if (searchTypes[prop].includes(searchedString)) {
				return true;
			}
		}
	}

	createUserList(filteredArr);
}
