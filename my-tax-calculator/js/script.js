document.getElementById('tax-form').addEventListener('submit', function(event) {
    event.preventDefault();
document.querySelectorAll('input[type="text"]').forEach(function(input) {
    input.addEventListener('input', function() {
        var isValid = !isNaN(parseFloat(this.value)) && isFinite(this.value);
        var errorIcon = this.nextElementSibling;

        if (isValid) {
            errorIcon.style.display = 'none'; $(errorIcon).tooltip('hide');
        } else {
            errorIcon.style.display = 'inline-block';
            $(errorIcon).tooltip('show');
        }
    });

    input.addEventListener('blur', function() {
        var errorIcon = this.nextElementSibling;
        if (errorIcon.style.display === 'inline-block') {
            $(errorIcon).tooltip('hide');
        }
    });
});

$(function () {
    $('[data-toggle="tooltip"]').tooltip()
})

    // Validate and calculate tax
    const grossIncome = parseFloat(document.getElementById('gross-income').value);
    const extraIncome = parseFloat(document.getElementById('extra-income').value);
    const deductions = parseFloat(document.getElementById('deductions').value);
    const ageGroup = document.getElementById('age-group').value;

    // Reset feedback display
    document.querySelectorAll('.invalid-feedback1, .invalid-feedback2, .invalid-feedback3, .invalid-feedback').forEach(function(feedback) {
        feedback.style.display = 'none';
    });

    // Validate each input individually
    const inputs = [
        { value: grossIncome, feedback: document.querySelector('.invalid-feedback1') },
        { value: extraIncome, feedback: document.querySelector('.invalid-feedback2') },
        { value: deductions, feedback: document.querySelector('.invalid-feedback3') },
    ];

    let allValid = true;

    inputs.forEach(input => {
        if (isNaN(input.value)) {
            input.feedback.style.display = 'block';
            allValid = false;
        }
    });

    if (!ageGroup) {
        document.querySelector('.invalid-feedback').style.display = 'block';
        allValid = false;
    }

    if (!allValid) {
        return; // Stop execution if any input is invalid
    }

    const totalIncome = grossIncome + extraIncome - deductions;
    let tax = 0;

    if (totalIncome > 800000) {
        const taxableIncome = totalIncome - 800000;
        if (ageGroup === '<40') {
            tax = taxableIncome * 0.3;
        } else if (ageGroup === '40-60') {
            tax = taxableIncome * 0.4;
        } else if (ageGroup === '60+') {
            tax = taxableIncome * 0.1;
        }
    }

    // Format the tax value as "9.6 Lakhs" for a value of 960000

    
    const moneyleft=totalIncome- tax
    // Format the tax value as "9.6 Lakhs" for a value of 960000
    const formatteddmoney=(moneyleft/100000).toFixed(1);

    // Update the modal body with the formatted tax
    document.querySelector('.modal-body').textContent = `Your overall income will be ${formatteddmoney} Lakhs. after tax deductions `;

    // Show the modal
    $('#incomeModal').modal('show');
});
