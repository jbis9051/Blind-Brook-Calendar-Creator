function getHTMLTable(data) {
    fetch('/submit-html', {
        method: 'POST',
        body: data
    }).then(res => res.text()).then(html => {
        $('#printable_schedule').innerHTML = html + `<p class="only-print">Created by bbscheduler.com Copyright &copy; ${new Date().getFullYear()} Josh Brown </p>`;
        if ($$('table .room').length === 0) {
            $('#room-toggle').setAttribute('disabled', '');
            $('#room-toggle').checked = false;
        }
        if ($$('table .teacher').length === 0) {
            $('#teacher-toggle').setAttribute('disabled', '');
            $('#teacher-toggle').checked = false;
        }
        if ($$('table .free-text').length === 0) {
            $('#free-toggle').setAttribute('disabled', '');
            $('#free-toggle').checked = false;
        }
        if ($$('table .class').length === 0) {
            $('#colors-toggle').setAttribute('disabled', '');
            $('#colors-toggle').checked = false;
        }
        $('#main_form').submit();
    });
}

$('#teacher-toggle').addEventListener('change', evt => {
    if ($('#teacher-toggle').checked) {
        $$('table .teacher').forEach(el => el.removeAttribute('hidden'));
    } else {
        $$('table .teacher').forEach(el => el.setAttribute('hidden', ''))
    }
});
$('#room-toggle').addEventListener('change', evt => {
    if ($('#room-toggle').checked) {
        $$('table .room').forEach(el => el.removeAttribute('hidden'));
    } else {
        $$('table .room').forEach(el => el.setAttribute('hidden', ''))
    }
});
$('#free-toggle').addEventListener('change', evt => {
    if ($('#free-toggle').checked) {
        $$('table .free-text').forEach(el => el.removeAttribute('hidden'));
    } else {
        $$('table .free-text').forEach(el => el.setAttribute('hidden', ''))
    }
});
$('#colors-toggle').addEventListener('change', evt => {
    if ($('#colors-toggle').checked) {
        $$('table .class').forEach(el => el.classList.add('color'))
    } else {
        $$('table .class').forEach(el => el.classList.remove('color'));
    }
});
