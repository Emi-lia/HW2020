
let tasks = [];//创建一个tasks数组



//本函数提供输入、按键提交、enter提交功能
function renderEditor() {
    let inputEl = document.querySelector("#default-todo-panel .todo-editor > input");
    let deadlineEl = document.querySelector("#default-todo-panel .todo-editor > input#deadline");
    inputEl.onkeypress = (e) => {
        if (e.key === "Enter") {
            addTask();
        }
    };
    let addTask = () => {
        if (inputEl.value.length == 0) {
            return;
        }
        let newTask = {
            title: inputEl.value,
            dl: deadlineEl.value,
            done: false,
            import: false,
        };
        inputEl.value = "";
        deadlineEl.value = "";
        tasks.push(newTask);
        renderTaskItems();
    };

    let addEl = document.querySelector("#default-todo-panel .todo-editor > button");
    addEl.onclick = (e) => {
        addTask();
    };
}


//本函数实现了完成、title、重要程度
function renderTaskItems() {
    let itemsEl = document.querySelector("#default-todo-panel .todo-items");
    itemsEl.querySelectorAll("div").forEach((node) => node.remove());//删除之前已经添加的项目
    //创建新元素
    for (let i = 0; i < tasks.length; i++) {
        let task = tasks[i];
        let itemEl = document.createElement("div");
        itemEl.className = "task";
        //事项完成元素
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
        //获取完成日期
        let dlEl = document.createElement("label");
        dlEl.id = "dl";
        dlEl.innerHTML = task.dl;
        itemEl.append(dlEl);
        //创建操作栏元素
        let ctrlbarEl = renderTaskCtrlBar(tasks, i);
        itemEl.append(ctrlbarEl);
        itemsEl.append(itemEl);
        //创建重要程度元素
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


//本函数实现操作栏里边的上移、下移、重要程度、删除
function renderTaskCtrlBar(tasks, taskIdx) {
    let ctrlbarEl = document.createElement("div");
    ctrlbarEl.className = "ctrlbar";
    //重要程度按钮
    let impEl = document.createElement("input");
    impEl.type = "checkbox";
    ctrlbarEl.append(impEl);
    //上移按钮
    let upEl = document.createElement("button");
    if (taskIdx === 0) {
        upEl.disabled = true;
    }
    upEl.innerText = "↑";
    upEl.onclick = () => {
        let t = tasks[taskIdx];
        tasks[taskIdx] = tasks[taskIdx - 1];
        tasks[taskIdx - 1] = t;
        renderTaskItems();
    };
    ctrlbarEl.append(upEl);
    //下移按钮
    let downEl = document.createElement("button");
    if (taskIdx+1 === tasks.length){
        downEl.disabled = true;
    }
    downEl.innerText = "↓";
    downEl.onclick = () => {
        let t = tasks[taskIdx];
        tasks[taskIdx] = tasks[taskIdx + 1];
        tasks[taskIdx + 1] = t;
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