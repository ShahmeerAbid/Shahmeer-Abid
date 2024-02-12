document.addEventListener('DOMContentLoaded', function () {
    const addButton = document.querySelector('#add');

    // local storage

    const updateLSdata = () => {
        const textareadata = document.querySelectorAll('textarea');
        const notes = [];
        console.log(textareadata);
        textareadata.forEach((note) => {
            return notes.push(note.value);
        })
        console.log(notes);
        localStorage.setItem('notes', JSON.stringify(notes))
    }

    // new note
    const addNewNote = (text = '') => {
        const note = document.createElement('div');
        note.classList.add('note');

        const htmldata = `<div class="operation">
<button class="edit"><i class="fas fa-edit"></i></button>
<button class="delete"><i class="far fa-trash-alt"></i></button>
</div>
<div class="main ${text ? "" : "hidden"}"></div>
<textarea class="${text ? "hidden" : ""}"></textarea>`;

        note.insertAdjacentHTML('afterbegin', htmldata);

        // getting the reference
        const editbutton = note.querySelector('.edit');
        const delbutton = note.querySelector('.delete');
        const maindiv = note.querySelector('.main');
        const textarea = note.querySelector('textarea');

        // deleting button
        delbutton.addEventListener('click', () => {
            note.remove();
        })

        // toggle using edit button
        textarea.value = text;
        maindiv.innerHTML = text;

        editbutton.addEventListener('click', () => {
            maindiv.classList.toggle('hidden');
            textarea.classList.toggle('hidden');
        })

        textarea.addEventListener('change', (event) => {
            const value = event.target.value;
            maindiv.innerHTML = value;

            updateLSdata();
        })

        document.body.appendChild(note);
    }

    const notes = JSON.parse(localStorage.getItem('notes'))
    if (notes) { notes.forEach((note) => addNewNote(note)) };

    // notes adding button
    addButton.addEventListener('click', () => addNewNote());
})


