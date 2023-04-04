import {
    saveTask,
    getTasks,
    getTask,
    onGetTasks,
    deteleTask,
    updateTask
} from '../controllers/firebase-crud.js'

import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-auth.js"
import { auth } from '../controllers/firebase.js'

const addBox = document.querySelector(".add-box"),
    popupBox = document.querySelector(".popup-box"),
    popupTitle = popupBox.querySelector(".content-header p"),
    closeIcon = popupBox.querySelector(".content-header i"),
    titleTag = popupBox.querySelector("input"),
    descTag = popupBox.querySelector("textarea");
// addBtn = popupBox.querySelector("button");
const taskForm = document.getElementById('task-form');
let taskContainer = document.getElementById('tasks-container')

let editState = false;
let id = '';
let user_id; // define a global variable to store the user ID

function getUserID() {
    return new Promise((resolve, reject) => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          console.log('OnAuthStateChanged: ', user.uid);
          const user_id = user.uid;
          console.log('Ya tengo bien el uid: ', user_id);
          resolve(user_id);
        } else {
          reject('User not logged in.');
        }
      });
    });
  }


async function getUserIDAndUpdateGlobalVariable() {
  try {
    user_id = await getUserID();
    return(user_id) // set the global variable to the user ID
  } catch (error) {
    console.error(error);
  }
}

// getUserIDAndUpdateGlobalVariable(); // call the async function to get the user ID and update the global variable

window.addEventListener('DOMContentLoaded', async () => {
    let x = await getUserIDAndUpdateGlobalVariable();
    console.log('Listo para comparar el user id: !', x)
    onGetTasks((querySnapshot) =>  {

        let html = '';
        let compare_uid;
        querySnapshot.forEach(doc => {
            compare_uid = (doc.data().uid_note)
            console.log(compare_uid)

            if (x == compare_uid){
                console.log(doc.data())
                const task = doc.data()
                html +=  `
                        <li class="note">
                            <div class="details">
                                <p>${task.title}</p>
                                <span>${task.description}</span>
                            </div>
                            <div class="bottom-content">
                                <span>date</span>
                                <div class="settings">
                                    <i class="uil uil-ellipsis-h"></i>
                                    <ul class="menu">
                                        <li><i class="uil uil-pen"><button class='btn-edit' data-id="${doc.id}">Editar</button></i></li>
                                        <li><i class="uil uil-trash"><button class='btns-delete' data-id="${doc.id}">Borrar</button></i></li>
                                    </ul>
                                </div>
                            </div>
                        </li>
                    `;
            }

        })

        taskContainer.innerHTML = html;

        const btnsDelete = taskContainer.querySelectorAll('.btns-delete');

        btnsDelete.forEach(btn => {
            btn.addEventListener('click', ({
                target: {
                    dataset
                }
            }) => {
                deteleTask(dataset.id)
            })
        })

        const btnsEdit = taskContainer.querySelectorAll('.btn-edit')
        btnsEdit.forEach((btn) => {
            btn.addEventListener('click', async ({
                target: {
                    dataset
                }
            }) => {
                console.log('Edit Works')
                addBox.click()
                console.log(dataset.id)
                const doc = await getTask(dataset.id)
                console.log(doc)
                const task = doc.data()

                taskForm['title'].value = task.title
                taskForm['description'].value = task.description

                editState = true;
                id = doc.id

                taskForm['bttn-note-form'].innerText = 'Actualizar'
            })
        })
    })
})



console.log(taskForm);

taskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log('User ID: Works with this', user_id);
    const title = taskForm['title'].value;
    const description = taskForm['description'].value;
    const uid_note = user_id;

    console.log(title, description);

    if (!editState) {
        saveTask(title, description, uid_note)
        console.log(title, description, uid_note);
    } else {
        updateTask(id, {
            title: title,
            description: description
        })

        editState = false;
    }

    taskForm.reset()
    closeIcon.click();
})

// array de meses para la fecha de la nota
const months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];






const notes = JSON.parse(localStorage.getItem("notes") || "[]");
let isUpdate = false,
    updateId;



// abrir popup de form
addBox.addEventListener("click", () => {
    popupTitle.innerText = "Agregar nueva nota";
    popupBox.classList.add("show");
    document.querySelector("body").style.overflow = "hidden";
    if (window.innerWidth > 660) titleTag.focus();
});


// cerrar popup
closeIcon.addEventListener("click", () => {
    isUpdate = false;
    titleTag.value = descTag.value = "";
    popupBox.classList.remove("show");
    document.querySelector("body").style.overflow = "auto";
});


// // mostrar las notas en la web
// function showNotes() {
//     if(!notes) return;
//     document.querySelectorAll(".note").forEach(li => li.remove());
//     notes.forEach((note, id) => {
//         let filterDesc = note.description.replaceAll("\n", '<br/>');
//         let liTag = `<li class="note">
//                         <div class="details">
//                             <p>${note.title}</p>
//                             <span>${filterDesc}</span>
//                         </div>
//                         <div class="bottom-content">
//                             <span>${note.date}</span>
//                             <div class="settings">
//                                 <i onclick="showMenu(this)" class="uil uil-ellipsis-h"></i>
//                                 <ul class="menu">
//                                     <li onclick="updateNote(${id}, '${note.title}', '${filterDesc}')"><i class="uil uil-pen"></i>Editar</li>
//                                     <li onclick="deleteNote(${id})"><i class="uil uil-trash"></i>Borrar</li>
//                                 </ul>
//                             </div>
//                         </div>
//                     </li>`;
//         addBox.insertAdjacentHTML("afterend", liTag);
//     });
// }
// showNotes();


// abrir settings menu
// function showMenu(elem) {
//     elem.parentElement.classList.add("show");
//     document.addEventListener("click", e => {
//         if(e.target.tagName != "I" || e.target != elem) {
//             elem.parentElement.classList.remove("show");
//         }
//     });
// }

// // settings - borrar
// function deleteNote(noteId) {
//     let confirmDel = confirm("¿Seguro que quieres eliminar la nota?");
//     if(!confirmDel) return;
//     notes.splice(noteId, 1);
//     localStorage.setItem("notes", JSON.stringify(notes));
//     showNotes();
// }

// // actualizar notas
// function updateNote(noteId, title, filterDesc) {
//     let description = filterDesc.replaceAll('<br/>', '\r\n');
//     updateId = noteId;
//     isUpdate = true;
//     addBox.click();
//     titleTag.value = title;
//     descTag.value = description;
//     popupTitle.innerText = "Actualizar nota";
//     addBtn.innerText = "Actualizar";
// }


// // crear notas - popup
// addBtn.addEventListener("click", e => {
//     e.preventDefault();
//     let title = titleTag.value.trim(),
//     description = descTag.value.trim();


//     // si la nota tiene texto
//     if(title || description) {
//         let currentDate = new Date(),

//         // fecha de la nota - mes, dia año - 
//         // recorrer array de meses. 
//         month = months[currentDate.getMonth()],
//         day = currentDate.getDate(),
//         year = currentDate.getFullYear();

//         let noteInfo = {title, description, date: `${month} ${day}, ${year}`}
//         if(!isUpdate) {
//             notes.push(noteInfo);
//         } else {
//             isUpdate = false;
//             notes[updateId] = noteInfo;
//         }

//         // guardar nota en local storage
//         localStorage.setItem("notes", JSON.stringify(notes));
//         showNotes();
//         closeIcon.click();
//     }
// });