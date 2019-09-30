const class_form_html = `<input type="text" class="class-name" placeholder="Class Name" name="names[]">
    <input type="tel"  class="period" min="1" max="9" step="1" placeholder="Period" name="periods[]">
    <input type="text"  class="letter-name" placeholder="Letter Days (e.g. &quot;A,C,D,F,G,H&quot;)" name="letters[]">
    <input type="text" class="room" placeholder="Room (Optional)" name="rooms[]">
    <input type="text" class="teacher" placeholder="Teacher (Optional)" name="teachers[]">
<button class="delete-button" type="button">×</button>`;

let autosaved = window.localStorage.getItem("student-data-2.0");
if (autosaved && (autosaved = JSON.parse(autosaved)) && autosaved.classes.length > 0) {
    $('#type_selector').selectedIndex = autosaved.type;
    autosaved.classes.forEach(cl => {
        addClass(cl.name, cl.period, cl.letters, cl.room, cl.teacher);
    });
} else {
    for (let i = 0; i < startingClassAmount; i++) {
        addClass();
    }
}


$('#add-class-button').addEventListener('click', e => addClass() && saveToStorage());
$('#main_form').addEventListener("click", ev => {
    if (ev.target && ev.target.classList.contains('delete-button')) {
        ev.target.parentElement.remove();
        updateClassCounter();
        saveToStorage();
    }
});
$('#main_form').addEventListener("focusout", ev => {
    if (ev.target && ev.target.tagName.toLowerCase() === "input") {
        saveToStorage();
    }
});

$$('.period').forEach(el => {
    el.addEventListener('keyup', e => checkPeriodNums(true));
});
$$('.letter-name').forEach(el => {
    el.addEventListener('keyup', e => checkLetterDays(true));
});

function updateClassCounter() {
    $('#class-counter').innerText = $$('.class-input-group').length;
}

/**
 *
 * @param name
 * @param period
 * @param letterday
 * @param room
 * @param teacher
 */
function addClass(name, period, letterday, room, teacher,) {
    const div = document.createElement('div');
    div.classList.add('class-input-group');
    div.innerHTML = class_form_html;
    if (name) {
        div.querySelector('.class-name').value = name;
        div.querySelector('.period').value = period;
        div.querySelector('.letter-name').value = letterday;
        div.querySelector('.room').value = room || "";
        div.querySelector('.teacher').value = teacher || "";
    }
    $('#main_form').append(div);
    updateClassCounter();
}

$('#submit-button').addEventListener('click', e => {
    $$('.submit-error').forEach(e => e.remove());
    const names = checkClassNames();
    const letters = checkLetterDays(false);
    const periods = checkPeriodNums(false);

    if (!names || !letters || !periods) {
        e.target.insertAdjacentHTML('beforebegin', '<span class="form-error submit-error">Please fix the errors above.</span>')
    } else if ($$('.class-input-group').length === 0) {
        e.target.insertAdjacentHTML('beforebegin', '<span class="form-error submit-error">If you have no classes you don\'t need a schedule. ;) Please add add least one class.</span>')
    } else {
        const data = new URLSearchParams(new FormData($('#main_form')));
        getHTMLTable(data);
        $('#main').removeAttribute("active");
        $('#submit-message').setAttribute("active", "");
    }
});
$('#type_selector').addEventListener("change", e => saveToStorage());

function saveToStorage() {
    console.log("Autosave");
    window.localStorage.setItem("student-data-2.0", JSON.stringify(objectFromInputs()));
}

function objectFromInputs() {
    let array = [];
    $$('.class-input-group').forEach(el => {
        array.push({
            name: el.querySelector('.class-name').value,
            period: el.querySelector('.period').value,
            letters: el.querySelector('.letter-name').value,
            room: el.querySelector('.room').value,
            teacher: el.querySelector('.teacher').value
        });
    });
    return {type: $('#type_selector').selectedIndex, classes: array};
}
$('#open-import-button').addEventListener("click", (ev => {
    $('.import-container').setAttribute("active", "");
}));
$('#import-button').addEventListener("click", (ev => {
    $('.import-error').innerText = "";
    $$('.class-input-group').forEach(el => {
        if (el.querySelector('.class-name').value === "") {
            el.querySelector('.delete-button').click();
        }
    });
    const input = $('.import-input').value;
    let classObjects = scheduleToObject(input);
    if (!classObjects) {
        $('.import-error').innerText = "An error occurred while importing. Internet Explorer and Edge are not supported, please use Google Chrome, Safari, Firefox, or just about any other browser.";
        return;
    }
    classObjects.forEach(classObj => addClass(classObj.name, classObj.period, classObj.days, classObj.room, classObj.teacher));
    $('.import-container').removeAttribute("active");
    saveToStorage();
}));


