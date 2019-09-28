const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

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
        addClass(cl.name, cl.period, cl.letters, cl.room,cl.teacher);
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

function checkPeriodNums(acceptEmpty) {
    let valid = true;
    $$('.period-error').forEach(e => e.remove());
    $$('.period').forEach(e => {

        if ((e.value === "" && !acceptEmpty) || isNaN(e.value) || parseInt(e.value) > 9 || parseInt(e.value) < 1) {
            valid = false;
            e.insertAdjacentHTML('beforebegin', '<span class="form-error period-error">Please fill in a valid number between 1 and 9</span>')
        }
    });
    return valid;
}

function checkClassNames() {
    let valid = true;
    $$('.class-error').forEach(e => e.remove());
    $$('.class-name').forEach(e => {
        if (e.value.trim() === "") {
            valid = false;
            e.insertAdjacentHTML('beforebegin', '<span class="form-error class-error">Please fill in a valid name</span>')
        }
    });
    return valid;
}

function checkLetterDays(acceptEmpty) {
    let valid = true;
    $$('.letter-error').forEach(e => e.remove());
    $$('.letter-name').forEach(e => {
        if (e.value.trim() === "") {
            if (acceptEmpty) {
                return;
            }
            valid = false;
            e.insertAdjacentHTML('beforebegin', '<span class="form-error letter-error">Please fill in letter days</span>')
        } else if (!e.value.match(/([A-H],?)*[A-H]$/)) {
            valid = false;
            e.insertAdjacentHTML('beforebegin', '<span class="form-error letter-error">Please fill in a letter days in the following format: "A,C,D,F,G,H".</span>')
        }

    });
    return valid;
}

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
        fetch('/submit-html', {
            method: 'POST',
            body: data
        }).then(res => res.text()).then(html => {
            $('#printable_schedule').innerHTML = html + `<p class="only-print">Created by bbscheduler.com Copyright &copy; ${new Date().getFullYear()} Josh Brown </p>`;
            if($$('table .room').length === 0){
                $('#room-toggle').setAttribute('disabled','');
                $('#room-toggle').checked = false;
            }
            if($$('table .teacher').length === 0){
                $('#teacher-toggle').setAttribute('disabled','');
                $('#teacher-toggle').checked = false;
            }
            if($$('table .free-text').length === 0){
                $('#free-toggle').setAttribute('disabled','');
                $('#free-toggle').checked = false;
            }
            if ($$('table .class').length === 0) {
                $('#colors-toggle').setAttribute('disabled', '');
                $('#colors-toggle').checked = false;
            }
            $('#main_form').submit();
        });
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
        $('.import-error').innerText = "An error occurred while importing. Internet Explorer and Edge are not supported, please use Google Chrome, Safari, Firefox, or just about any other browser."
    }
    classObjects.forEach(classObj => addClass(classObj.name,classObj.period,classObj.days,classObj.room,classObj.teacher));
    $('.import-container').removeAttribute("active");
    saveToStorage();
}));


$('#teacher-toggle').addEventListener('change', evt => {
    if($('#teacher-toggle').checked){
        $$('table .teacher').forEach(el => el.removeAttribute('hidden'));
    } else {
        $$('table .teacher').forEach(el => el.setAttribute('hidden',''))
    }
});
$('#room-toggle').addEventListener('change', evt => {
    if($('#room-toggle').checked){
        $$('table .room').forEach(el => el.removeAttribute('hidden'));
    } else {
        $$('table .room').forEach(el => el.setAttribute('hidden',''))
    }
});
$('#free-toggle').addEventListener('change', evt => {
    if($('#free-toggle').checked){
        $$('table .free-text').forEach(el => el.removeAttribute('hidden'));
    } else {
        $$('table .free-text').forEach(el => el.setAttribute('hidden',''))
    }
});
$('#colors-toggle').addEventListener('change', evt => {
    if ($('#colors-toggle').checked) {
        $$('table .class').forEach(el => el.classList.add('color'))
    } else {
        $$('table .class').forEach(el => el.classList.remove('color'));
    }
});
