
let tasks = [];


function renderEditor() {
    let inputEl = document.querySelector("#default-todo-panel .todo-editor > input");

    let addTask = () => {
        if (inputEl.value.length == 0) {
            return;
        }
        let newTask = {
            title: inputEl.value,
            done: false,
            import: false,
        };
        inputEl.value = "";
        tasks.push(newTask);
        console.log("tasks: ", tasks);
        renderTaskItems();
    };
    inputEl.onkeypress = (e) => {
        if (e.key === "Enter") {
            addTask();
        }
    };
    let addEl = document.querySelector("#default-todo-panel .todo-editor > button");
    addEl.onclick = (e) => {
        addTask();
    };
}




function renderTaskItems() {
    console.log("render items");
    let itemsEl = document.querySelector("#default-todo-panel .todo-items");
    itemsEl.querySelectorAll("div").forEach((node) => node.remove());
    console.log(itemsEl);
    for (let i = 0; i < tasks.length; i++) {
        let task = tasks[i];
        let itemEl = document.createElement("div");
        itemEl.className = "task";
        //事项完成
        let doneEl = document.createElement("input");
        doneEl.type = "checkbox";
        doneEl.checked = task.done;
        if (task.done) {
            itemEl.classList.add("done");
        } else {
            itemEl.classList.remove("done");
        }
        doneEl.onchange = (e) => {
            task.done = e.target.checked;
            if (task.done) {
                itemEl.classList.add("done");
            } else {
                itemEl.classList.remove("done");
            }
        }
        itemEl.append(doneEl);
        //获取title
        let titleEl = document.createElement("label");
        titleEl.innerText = task.title;
        itemEl.append(titleEl);
        let ctrlbarEl = renderTaskCtrlBar(tasks, i);
        itemEl.append(ctrlbarEl);
        itemsEl.append(itemEl);
        //重要程度
        let impEl = document.querySelectorAll(".ctrlbar input")[i];
        impEl.checked = task.import;
        if (task.import) {
            itemEl.classList.add("import");
        }
        else {
            itemEl.classList.remove("import");
        }
        impEl.onchange = (e) => {
            task.import = e.target.checked;
            if (task.import) {
                itemEl.classList.add("import");
            }
            else {
                itemEl.classList.remove("import");
            }
        }
    }
}



function renderTaskCtrlBar(tasks, taskIdx) {
    let ctrlbarEl = document.createElement("div");
    ctrlbarEl.className = "ctrlbar";
    //重要程度按钮
    let impEl = document.createElement("input");
    impEl.type = "checkbox";
    ctrlbarEl.append(impEl);
    //上移按钮
    let upEl = document.createElement("button");
    if (taskIdx ===0){
        upEl.disabled = true;
    }
    upEl.innerText = "↑";
    upEl.onclick = () => {
        let t=tasks[taskIdx];
        tasks[taskIdx]=tasks[taskIdx-1];
        tasks[taskIdx-1]=t;
        renderTaskItems();
    };
    ctrlbarEl.append(upEl);
    //下移按钮
    let downEl = document.createElement("button");
    downEl.innerText = "↓";
    downEl.onclick = () => {
        let t=tasks[taskIdx];
        tasks[taskIdx]=tasks[taskIdx+1];
        tasks[taskIdx+1]=t;
        renderTaskItems();
    };
    ctrlbarEl.append(downEl);
    //删除按钮
    let cancelEl = document.createElement("button");
    cancelEl.innerText = "X";
    cancelEl.onclick = () => {
        tasks.splice(taskIdx, 1);
        renderTaskItems();
    };

    ctrlbarEl.append(cancelEl);

    return ctrlbarEl;
}


renderEditor();
renderTaskItems();