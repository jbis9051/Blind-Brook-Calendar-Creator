const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const class_form_html = `<input type="text" class="class-name" placeholder="Class Name" name="names[]">
    <input type="tel"  class="period" min="1" max="9" step="1" placeholder="Period" name="periods[]">
    <input type="text"  class="letter-name" placeholder="Letter Days" name="letters[]">
    <input type="text" class="room" placeholder="Room" name="rooms[]">
<button class="delete-button" type="button">×</button>`;

let autosaved = window.localStorage.getItem("student-data-2.0");
if (autosaved && (autosaved = JSON.parse(autosaved)) && autosaved.classes.length > 0) {
    $('#type_selector').selectedIndex = autosaved.type;
    autosaved.classes.forEach(cl => {
        addClass(cl.name, cl.period, cl.letters, cl.room);
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
 */
function addClass(name = undefined, period = undefined, letterday = undefined, room = undefined) {
    const div = document.createElement('div');
    div.classList.add('class-input-group');
    div.innerHTML = class_form_html;
    if (name) {
        div.querySelector('.class-name').value = name;
        div.querySelector('.period').value = period;
        div.querySelector('.letter-name').value = letterday;
        div.querySelector('.room').value = room;
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
            room: el.querySelector('.room').value
        });
    });
    return {type: $('#type_selector').selectedIndex, classes: array};
}

$('#open-import-button').addEventListener("click", (ev => {
    $('.import-container').setAttribute("active", "");
}));
$('#import-button').addEventListener("click", (ev => {
    $$('.class-input-group').forEach(el => {
        if (el.querySelector('.class-name').value === "") {
            el.querySelector('.delete-button').click();
        }
    });
    const input = $('.import-input').value;
    const classes = input.split("\n");
    classes.forEach(aClass => {
        const attributes = aClass.split("\t");
        if (attributes[0] === "Days" || !attributes[0].match(/([A-H],?)*[A-H]$/)) { /* if they copied the headers or something else then skip it */
            return;
        }
        if (parseInt(attributes[1]) === 9) { // community service will be the only thing 9th period and it is not included on the schedule so we skip it
            return;
        }
        addClass(attributes[4], attributes[1], attributes[0], attributes[2]);
    });
    $('.import-container').removeAttribute("active");
    saveToStorage();
}));