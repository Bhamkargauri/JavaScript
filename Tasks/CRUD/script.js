let btn = document.getElementById("submitBtn");
// https://6880ebc1f1dcae717b63f94b.mockapi.io/users
let currentEditId = null;
let isEditMode = false;
btn.addEventListener("click", async function (event) {
    event.preventDefault();
    let myName = document.getElementById("nameInput").value.trim();
    let email = document.getElementById("emailInput").value.trim();

    if (!myName || !email) {
        document.getElementById("message").innerHTML = `<p style="color:red">Please fill all fields!</p>`;
        return;
    }

    let user = { myName, email };
    // console.log(user);

    try {

        if (isEditMode) {
            const response = await fetch(`https://6880ebc1f1dcae717b63f94b.mockapi.io/users/${currentEditId}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-type": "application/json",
                    },
                    body: JSON.stringify(user),
                }
            );
            if (!response.ok) {
                throw new Error("Fetch data failed Error:404");
            }
            document.getElementById("message").innerHTML = `<p>Data Updated Successfully</p>`;
            btn.innerHTML = "Submit";
        }
        else {

            const api = await fetch(
                "https://6880ebc1f1dcae717b63f94b.mockapi.io/users",
                {
                    method: "POST",
                    headers: {
                        "Content-type": "application/json",
                    },
                    body: JSON.stringify(user),
                }
            );
            if (!api.ok) {
                throw new Error("Fetch data failed Error:404");
            }

            document.getElementById("message").innerHTML = `<p>Data Submitted Successfully</p>`;
        }

        document.getElementById("nameInput").value = "";
        document.getElementById("emailInput").value = "";
        fetchData();

    } catch (err) {
        document.getElementById("message").innerHTML = `<p>Data Not Submitted</p>`;
        // console.log(err);
    }
});

async function fetchData() {
    document.getElementById("fetchDataContainer").innerHTML = "";

    try {
        let storeData = await fetch("https://6880ebc1f1dcae717b63f94b.mockapi.io/users");
        if (!storeData.ok) {
            throw new Error("Fetch data failed Error:404");
        }
        let data = await storeData.json();
        // console.log(data);

        data.forEach((value, index) => {
            // console.log("Value =", value);

            const { id, myName, email } = data[index];
            // console.log("id= ", id);
            // console.log("name= ", myName);
            // console.log("email= ", email);

            let divContainer = document.getElementById("fetchDataContainer");
            let idPara = document.createElement("p");
            idPara.innerHTML = `id: ${id}`;
            idPara.style.marginBottom = "0px";

            let namePara = document.createElement("p");
            namePara.innerHTML = `Name: ${myName}`;


            let emailPara = document.createElement("p");
            emailPara.innerHTML = `Email: ${email}`;

            let editBtn = document.createElement("button");
            editBtn.innerHTML = "Edit";
            editBtn.classList.add("btn", "btn-primary");
            editBtn.style.marginBottom = "5px"

            let deleteBtn = document.createElement("button");
            deleteBtn.innerHTML = "Delete";
            deleteBtn.style.marginLeft = "5px";
            deleteBtn.classList.add("btn", "btn-primary");
            deleteBtn.style.marginBottom = "5px"

            let line = document.createElement("hr");

            divContainer.appendChild(idPara);
            divContainer.appendChild(namePara);
            divContainer.appendChild(emailPara);
            divContainer.appendChild(editBtn);
            divContainer.appendChild(deleteBtn);
            divContainer.appendChild(line);

            deleteBtn.addEventListener("click", () => deleteData(id));
            editBtn.addEventListener("click", () => editData(value));

        });

    } catch (err) {
        console.log(err);
    }
}
// fetchData();
document.getElementById("fetchBtn").addEventListener("click", fetchData);

async function deleteData(id) {
    console.log("id= ", id);
    try {
        const api = await fetch(`https://6880ebc1f1dcae717b63f94b.mockapi.io/users/${id}`,
            {
                method: "DELETE"
            }
        );

        document.getElementById("message").innerHTML = `<p>id: ${id} Data Deleted Successfully</p>`;
        fetchData();
    }
    catch (err) {
        console.log(err);
    }
}

async function editData(userData) {           //value pass by event listener and receive here in user
    // console.log("edit data = ", userData);
    isEditMode = true;
    currentEditId = userData.id;
    // console.log("current id= ", currentEditId);

    let newName = document.getElementById("nameInput");
    let newEmail = document.getElementById("emailInput");

    newName.value = userData.myName;
    newEmail.value = userData.email;

    // console.log("newName = ", newName.value);
    // console.log("newEmail =", newEmail.value);

    document.getElementById("submitBtn").innerHTML = "Update";

    // console.log("update = ", document.getElementById("submitBtn").innerHTML);
}
