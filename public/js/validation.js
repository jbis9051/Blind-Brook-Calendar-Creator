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
