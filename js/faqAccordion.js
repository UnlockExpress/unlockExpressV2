// FAQ Accordion
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {

        // 1️⃣ Fermer toutes les réponses
        document.querySelectorAll('.view').forEach(openAnswer => {
            if (openAnswer !== question.nextElementSibling) {
                openAnswer.classList.remove('view');
                openAnswer.parentElement.classList.remove('display');

                const openIcon = openAnswer.nextElementSibling;
                openIcon.classList.remove('less-sign');
            }
        });


        // 2️⃣ Toggle la réponse cliquée
        const answer = question.nextElementSibling;
        const icon = answer.nextElementSibling;

        const isOpen = answer.classList.contains('view');

        question.parentElement.classList.toggle('display', !isOpen);
        answer.classList.toggle('view', !isOpen);
        icon.classList.toggle('less-sign', !isOpen);
    });
});