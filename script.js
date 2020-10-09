;
(function() {
    'use strict';

    var userData = [{
        username: 'Fatih',
        link: 'https://github.com/FatihSengul',
        password:'123456789'
    }];

    // Update table according to data
    var updateTable = function() {
        var dataTable = document.getElementById('table1'),
            tableHead = document.getElementById('table-head'),
            tbody = document.createElement('tbody');

        while (dataTable.firstChild) {
            dataTable.removeChild(dataTable.firstChild);
        }
        dataTable.appendChild(tableHead);

        for (var i = 0; i < userData.length; i++) {
            var tr = document.createElement('tr'),
                td0 = document.createElement('td'),
                td1 = document.createElement('td'),
                td2 = document.createElement('td'),
                td3 = document.createElement('td'),
                td4 = document.createElement('td'),
                td5= document.createElement('td'),
                td6=document.createElement('td'),
                btnDelete = document.createElement('input'),
                btnEdit = document.createElement('input'),
                btnShow = document.createElement('input'),
                password = document.createElement("input");
                password.type = "password";
                password.disabled = true;

            btnDelete.setAttribute('type', 'button');
            btnDelete.setAttribute('value', 'Delete');
            btnDelete.setAttribute('class', 'btnDelete');
            btnDelete.setAttribute('id', i);

            btnEdit.setAttribute('type', 'button');
            btnEdit.setAttribute('value', 'Edit');
            btnEdit.setAttribute('id', i);
            

            td3.appendChild(password);
            tr.appendChild(td0);
            tr.appendChild(td1);
            tr.appendChild(td2);
            tr.appendChild(td3);
            tr.appendChild(td4);
            tr.appendChild(td5);
            tr.appendChild(td6);


            td0.innerHTML = i + 1;
            td1.innerHTML = userData[i].username;
            td2.innerHTML = userData[i].link;
            password.value= userData[i].password;
            td4.appendChild(btnEdit);
            td5.appendChild(btnDelete);
            td6.appendChild(btnShow);
            btnDelete.onclick = (function() {
                return function() {
                    if (confirm("Kaydı Silmek İstediğinize Emin Misiniz?")) {
                        var deleteId = this.getAttribute('id');
                        userData.splice(deleteId, 1);
                        updateTable();
                        refreshForm();
                    }
                };
            })();
            btnEdit.addEventListener('click', function() {
                var editId = this.getAttribute('id');
                window.scrollTo({
                    top: 0,
                    left: 0,
                    behavior: 'smooth'
                });
                updateForm(editId);
            }, false);

            tbody.appendChild(tr);
        }
        dataTable.appendChild(tbody);
    }
    // Set form for data edit
    var updateForm = function(id) {
        console.log(userData[id].name);
        var userNameField = document.getElementById('username'),
            linkField = document.getElementById('link'),
            passwordField = document.getElementById('password'),
            saveButton = document.getElementById('btnSave');

        userNameField.value = userData[id].username;
        linkField.value = userData[id].link;
        passwordField.value = userData[id].password;
        saveButton.value = 'Update';
        saveButton.setAttribute('data-update', id);
    }
    // Save new data
    var saveData = function() {
        var newUserName = document.getElementById('username').value,
            newLink = document.getElementById('link').value,
            newPassword = document.getElementById('password').value,
            datatoAdd = {
                username: newUserName,
                link: newLink,
                password: newPassword,
            };
            if ((newUserName.length==0) || (newLink.length==0) || (newPassword.length==0)){
                alert("Alanların Hepsini Doldurmalısınız");
            }
            else {
                userData.push(datatoAdd);
                updateTable();
            }
    }
    // Update data
    var updateData = function(id) {
        var upUserName = document.getElementById('username').value,
            upLink = document.getElementById('link').value,
            upPassword = document.getElementById('password').value;
        userData[id].username = upUserName;
        userData[id].link = upLink;
        userData[id].link =upPassword;
        if ((upUserName.length == 0) || (upLink.length == 0) || (upPassword.length == 0)){
            alert("Alanların Hepsini Doldurmalısınız");
        }
        else {

            updateTable();
        }
    }
    // Reset the form
    var refreshForm = function() {
        var userNameField = document.getElementById('username'),
            linkField = document.getElementById('link'),
            passwordField = document.getElementById('password'),
            saveButton = document.getElementById('btnSave');

        userNameField.value = '';
        linkField.value = '';
        passwordField.value = '';
        saveButton.value = 'Save';
        saveButton.removeAttribute('data-update');
    }
    // Main function
    var init = function() {
        updateTable();

        var btnSave = document.getElementById('btnSave'),
            btnRefresh = document.getElementById('btnRefresh');

        btnSave.onclick = function() {
            if (btnSave.getAttribute('data-update')) {
                updateData(btnSave.getAttribute('data-update'));
            } else {
                saveData();
            }
            refreshForm();
        };

        btnRefresh.onclick = function() {
            refreshForm();
        };
    };
    init(); //Intialize the table
})();