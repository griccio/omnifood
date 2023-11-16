var users = [
  //   { firstname: "Mario", lastname: "Rossi" },
  //   { firstname: "Giuseppe", lastname: "Verdi" },
  //   { firstname: "Anna", lastname: "Bianchi" },
];

var user;

function clearTableUser() {
  let table = document.getElementById("users-table");
  if (table.rows.length > 1) {
    var totRows = table.rows.length;

    totRows = table.rows.length;
    while (totRows !== 1) {
      table.deleteRow(totRows - 1);
      totRows = table.rows.length;
    }
  }
}

async function getUsers() {
  console.log("inside getusers");
  let table = document.getElementById("users-table");
  // table.remove();
  console.log(table.rows.length);
  clearTableUser();
  console.log(table.rows.length);

  try {
    let res = await fetch("http://localhost:3000/users");
    // console.log(res.json());
    users = await res.json();

    for (let i = 0; i < users.length; i++) {
      // Create a row using the inserRow() method and
      // specify the index where you want to add the row
      let row = table.insertRow(-1); // We are adding at the end
      // Create table cells
      // console.log(users[i]);
      let c1 = row.insertCell(0);
      let c2 = row.insertCell(1);
      let c3 = row.insertCell(2);

      const deleteButton = document.createElement("button");
      deleteButton.id = "delete_" + users[i].id;
      deleteButton.setAttribute("type", "button");
      deleteButton.setAttribute("cursor", "pointer");
      deleteButton.className = "btn-table";
      deleteButton.innerText = "Delete";
      deleteButton.onclick = function (event) {
        //parse the id of the row from the id
        var rowNr = event.target.id.substr(
          "delete_".length,
          event.target.id.length
        );
        deleteUser(rowNr);
      };

      const selectButton = document.createElement("button");
      selectButton.id = "select_" + users[i].id;
      selectButton.setAttribute("type", "button");
      selectButton.setAttribute("cursor", "pointer");
      selectButton.className = "btn-table";
      selectButton.innerText = "Select";
      selectButton.onclick = function (event) {
        //parse the id of the row from the id
        var rowNr = event.target.id.substr(
          "select_".length,
          event.target.id.length
        );
        getUser(rowNr);
      };
      // Add data to c1 and c2
      c1.innerText = users[i].firstname;
      c2.innerText = users[i].lastname;
      c3.appendChild(deleteButton);
      c3.appendChild(selectButton);
    }

    // console.log(users);
  } catch (err) {
    console.log(err);
  }
}

async function getUser(id) {
  console.log("inside getuser", users);

  try {
    let res = await fetch("http://localhost:3000/users/" + id);
    // console.log(res.json());
    let user = await res.json();
    document.getElementById("id").value = user.id;
    document.getElementById("firstname").value = user.firstname;
    document.getElementById("lastname").value = user.lastname;

    // console.log(users);
  } catch (err) {
    console.log(err);
  }
}

async function addUser() {
  console.log("inside adduser");

  var firstname = document.getElementById("firstname").value;
  var lastname = document.getElementById("lastname").value;

  let promise = fetch("http://localhost:3000/users", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      firstname: document.getElementById("firstname").value,
      lastname: document.getElementById("lastname").value,
    }),
  });
  promise.then(function (res) {
    console.log(res);
    document.getElementById("firstname").value = "";
    document.getElementById("lastname").value = "";
    getUsers();
  });
}

async function updateUser() {
  console.log("inside updateuser");
  var id = document.getElementById("id").value;
  var firstname = document.getElementById("firstname").value;
  var lastname = document.getElementById("lastname").value;
  let promise = fetch("http://localhost:3000/users/" + id, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: document.getElementById("id").value,
      firstname: document.getElementById("firstname").value,
      lastname: document.getElementById("lastname").value,
    }),
  });
  promise.then(function (res) {
    console.log(res);
    document.getElementById("id").value = "";
    document.getElementById("firstname").value = "";
    document.getElementById("lastname").value = "";
    getUsers();
  });
}

async function deleteUser(id) {
  console.log("inside deleteUser " + id);

  const radioButtons = document.querySelectorAll('input[name="size"]');

  let promise = fetch("http://localhost:3000/users/" + id, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  promise.then(function (res) {
    console.log(res);
    getUsers();
  });
}

let btnRefresh = document.getElementById("btn-table-user-refresh");
btnRefresh.addEventListener("click", getUsers);

let btnUpdate = document.getElementById("btn-table-user-update");
btnUpdate.addEventListener("click", updateUser);

let btnDelete = document.getElementById("btn-table-user-delete");
btnDelete.addEventListener("click", deleteUser);
