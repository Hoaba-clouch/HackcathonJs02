const tasks = [];
let editingIndex = -1;





const form = document.querySelector(".task-form")
const taskNameInput = document.getElementById("tencongviec")
const deadlineInput = document.getElementById("deadline")
const leaderInput = document.getElementById("phutrach")
const statusInput = document.getElementById("trangthai")
const tableBody = document.querySelector("table tbody")
const searchInput = document.getElementById("searchTask");
const submit = document.getElementById("submit")

const renderTasks = (list) => {
    let html = "";
    list.forEach((task, index) => {
        html += `
            <tr class="task-table__row">
                <td class="task-table__cell">${task.name}</td>
                <td class="task-table__cell">${task.deadline}</td>
                <td class="task-table__cell">${task.leader}</td>
                <td class="task-table__cell">${task.status}</td>
                <td class="task-table__cell">
                    <button onclick="editTask(${index})" class="btn btn-success">Sửa</button>
                    <button onclick="deleteTask(${index})" class="btn btn-danger">Xoá</button>
                </td>
            </tr>
        `;
    });
    tableBody.innerHTML = html;
};

submit.addEventListener("click", (e) => {
    e.preventDefault();
    const name = taskNameInput.value.trim();
    const deadline = deadlineInput.value;
    const leader = leaderInput.value.trim();
    const status = statusInput.value;


    document.querySelector(".Name").innerHTML = ""
    document.querySelector(".Deadline").innerHTML = ""
    document.querySelector(".Leader").innerHTML = ""
    document.querySelector(".Status").innerHTML = ""
    let value = true

    if (!name) {
        document.querySelector(".Name").innerHTML = "Không được để trống!";
        value = false
    }

    if (!deadline) {
        document.querySelector(".Deadline").innerHTML = "Phải chọn ngày!";
        value = false
    }

    if (!leader) {
        document.querySelector(".Leader").innerHTML = "không được để trống!";
        value = false
    }

    if (!status || status === "-- Chọn trạng thái --") {
        document.querySelector(".Status").innerHTML = "Phải chọn trạng thái!";
        value = false
    }

    if (!value) return;

    const newTask = {
        name,
        deadline,
        leader,
        status
    }

    if (editingIndex === -1) {
        tasks.push(newTask);
    } else {
        tasks[editingIndex] = newTask;
        alert("Cập nhật hành công!");
        editingIndex = -1;
    }

    renderTasks(tasks);
    form.reset();

});

searchInput.addEventListener("change", () => {
    const keyword = searchInput.value.toLowerCase();
    const rows = tableBody.querySelectorAll("tr");

    rows.forEach(row => {
        const taskName = row.children[0].textContent.toLowerCase();
        row.style.display = taskName.includes(keyword) ? "" : "none";
    });
});

function deleteTask(index) {
    if (confirm("Bạn có chắc chắn muốn xoá công việc này không?")) {
        tasks.splice(index, 1);
        renderTasks(tasks);

    }
}

function editTask(index) {
    const task = tasks[index];
    taskNameInput.value = task.name;
    deadlineInput.value = task.deadline;
    leaderInput.value = task.leader;
    statusInput.value = task.status;
    editingIndex = index;
}