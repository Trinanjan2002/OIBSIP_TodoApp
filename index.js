let itemsJSON = null;
let itemJsonArray = null;

populateTable();

add = document.getElementById("save");
add.addEventListener("click", () => {
    titl = document.getElementById("titl").value;
    desc = document.getElementById("desc").value;
    itemsJSON = localStorage.getItem('itemsJSON');
    if (itemsJSON == null) {
        itemJsonArray = [];
        itemJsonArray.push({ titl, desc });
        localStorage.setItem('itemsJSON', JSON.stringify(itemJsonArray));
        document.getElementById("titl").value = null;
        document.getElementById("desc").value = null;
        console.log("Updated List");
    } else {
        itemJsonArray = JSON.parse(itemsJSON);
        itemJsonArray.push({ titl, desc });
        localStorage.setItem('itemsJSON', JSON.stringify(itemJsonArray));
        document.getElementById("titl").value = null;
        document.getElementById("desc").value = null;
        console.log("Updated List");
    }
    populateTable();
});

function populateTable() {
    itemsJSON = localStorage.getItem('itemsJSON');
    itemsJSON == null ? itemJsonArray = [] : itemJsonArray = JSON.parse(itemsJSON);
    tableBody = document.getElementById('tableBody');
    str = "";
    itemJsonArray.forEach((item, index) => {
        (item.desc.length > 150)
            ?
            str += `<tr>
                    <th>${item.titl}</th>
                    <td class="des">
                        ${item.desc.substring(0, 150) + `....<button class="des-btn" onclick="openPopup(${index})">show more</button>`}
                    </td>
                    <td><button class="delete" onclick="deleteItem(${index})">Delete</button></td>
                </tr>`
            :
            str += `<tr>
                    <th>${item.titl}</th>
                    <td class="des">
                        ${item.desc}
                    </td>
                    <td><button class="delete" onclick="deleteItem(${index})">Delete</button></td>
                </tr>`
    });
    tableBody.innerHTML = str;
}

function deleteItem(index) {
    itemsJSON = localStorage.getItem('itemsJSON');
    itemJsonArray = JSON.parse(itemsJSON);
    itemJsonArray.splice(index, 1);
    localStorage.setItem('itemsJSON', JSON.stringify(itemJsonArray));
    populateTable();
}

function openPopup(index) {
    popup = document.getElementById("pop-up");
    popTitle = document.getElementById("pop-title");
    popDesc = document.getElementById("pop-desc");

    itemsJSON = localStorage.getItem('itemsJSON');
    itemJsonArray = JSON.parse(itemsJSON);

    popTitle.innerHTML = itemJsonArray[index].titl;
    popDesc.innerHTML = itemJsonArray[index].desc;

    popup.classList.remove("hidden")
}

function closePopup() {
    popup = document.getElementById("pop-up");
    popup.classList.add("hidden");
}
