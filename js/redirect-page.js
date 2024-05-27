document.addEventListener('DOMContentLoaded', () => {
    const challengeRows = document.querySelectorAll('.challenge-row');
    challengeRows.forEach((challengeRow, index) => {
        challengeRow.addEventListener('click', () => {
            window.location.href = `challenge${index + 1}.html`;
        });
    });
});