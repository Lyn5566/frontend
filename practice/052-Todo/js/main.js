; (function () {
    'use strict'

    let todoForm = document.getElementById('todo-form');
    let todoInput = todoForm.querySelector('[name=title]');
    let todoList = document.getElementById('todo-list');
    let catForm = document.getElementById('add-form');

    let catInput = catForm.querySelector('[name=name]');
    let addCat = document.getElementById('add-cat');
    let catList = document.getElementById('cat-list');

    let $todoList = [];
    let $catList;
    //当前todo里更新的id
    let currentTodoId = null;
    //当前cat里更新的id
    let currentCatId = null;

    let $currentCatId = null;
    

    boot();
    function boot() {
        readTodo();
        readCat();
        bindEvents();

    }
    function bindEvents() {
        bindTodoSubmit();
        bindToggleCatForm();
        bindClickCatForm();
        bindCatSubmit();

    }

    function setCatFormVisible(visible = true) {
        catForm.hidden = !visible;
        // + 表示される
        addCat.hidden = !catForm.hidden;
        if (catForm.hidden) {
            currentCatId = null;
            catForm.reset();
        }
        else {
            catInput.focus();

        }

    }

    function bindToggleCatForm() {
        addCat.addEventListener('click', e => {
            setCatFormVisible(true);

        })
    }
    function bindClickCatForm() {
        catForm.addEventListener('click', e => {
            let target = e.target;
            if (target.classList.contains('cancel'))
                setCatFormVisible(false);
        })
    }
    function bindCatSubmit() {
        catForm.addEventListener('submit', e => {
            e.preventDefault();
            let name = catInput.value;
            if (currentCatId) {
                updateCat(currentCatId, { name });
            
            }else{

                createCat({ name });
            }
        })
    }
    function readCat() {
        api('cat/read', null, r => {
            $catList = r.data || [];
            renderCat();
        })
    }

    function createCat(row) {
        api('cat/create', row, r => {
            if (r.success)
                readCat();
                setCatFormVisible(false);
        })
    }

    function removeCat(id) {
        api('cat/delete', { id }, r => {
            readCat();
        });
    }
    function updateCat(id, row) {
        api('cat/update', { id, ...row }, r => {
            if (r.success) {
                currentCatId = null;
                readCat();
                setCatFormVisible(false);

            }
        })
    }

    function renderCat() {
        catList.innerHTML = '';
        $catList.forEach(it => {
            let item = document.createElement('div');
            item.$id = it.id;
            item.classList.add('item');
            item.innerHTML = `
            <span class ="name">${it.name}</span>
            <span class ="operations">
           <button class ="fill">更新</button>
           <button class ="delete">削除</button>
            </span>
            `;
            catList.appendChild(item);
            item.addEventListener('click', e => {
                let klass = e.target;
                if (klass.classList.contains('delete')) {
                    removeCat(it.id);
                }
                if (klass.classList.contains('fill')) {
                    setCatFormVisible(true);
                    currentCatId = it.id;
                    catInput.value = it.name;

                }
                if(klass.classList.contains('name')){
                    $currentCatId = it.id;
                    highlightCurrentCat();
                    readTodo();
                }
            })
        })
    }

    function readTodo(params) {

        params = params || {};
        params.where = {
            and:{
                cat_id:$currentCatId,
            }
        }
        //默认post提交
        api('todo/read', params, r => {
            $todoList = r.data || [];
            renderTodo();
            todoForm.reset();
        })
    }
    function bindTodoSubmit() {
        todoForm.addEventListener('submit', e => {
            e.preventDefault();
            let title = todoInput.value
            //$list.title = val;
            if (currentTodoId)
                updateTodo(currentTodoId, { title });

            else
                createTodo({ title });
        })
    }
    function createTodo(row) {
        row.cat_id = $currentCatId;
        api('todo/create', row, r => {
            if (r.success)
                readTodo();
        });
    }

    function setCompleted(id, completed) {
        api('todo/update', { id, completed })
    }
    function removeTodo(id) {
        api('todo/delete', { id }, r => {
            readTodo();
        });
    }
    function updateTodo(id, row) {
        api('todo/update', { id, ...row }, r => {
            if (r.success) {
                currentTodoId = null;
                readTodo();
                todoForm.reset();
            }
        })
    }

    function renderTodo() {
        todoList.innerHTML = '';
        if ($todoList == null)
            return;

        $todoList.forEach(it => {
            let item = document.createElement('div');
            item.classList.add('todo-item');
            item.innerHTML = `
            <input class = "completed" type="checkbox" ${it.completed ? 'checked' : ''}>
            </div>
            <div class="title">${it.title}</div>
            <div class="operations">
                <button class="update">更新</button>
                <button class="delete">削除</button>
            </div>`;
            let checkbox = item.querySelector('.completed');
            let operations = item.querySelector('.operations');

            operations.addEventListener('click', e => {
                let target = e.target;
                if (target.classList.contains('delete'))
                    removeTodo(it.id);
                if (target.classList.contains('update')) {
                    todoInput.value = it.title;
                    currentTodoId = it.id;
                }
            });
            checkbox.addEventListener('change', e => {
                setCompleted(it.id, checkbox.checked);
            });
            todoList.appendChild(item);
        })
    }
    function highlightCurrentCat(){
        let items = catList.children;
        for(let i = 0;i<items.length;i++){
            let catItem = items[i];
            if($currentCatId == catItem.$id){
                catItem.classList.add('active');
            }else{
                catItem.classList.remove('active');
            }
        }

    }

})();