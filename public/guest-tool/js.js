// document.addEventListener("click", function (e) {
//     console.log(e.target);
// })

// adding-modal 
const guestAddingModal = document.querySelector('.guest-adding-modal');
const childElementGuestAddingModal = guestAddingModal.querySelector(':first-child');
const showGuestAddingModal = document.querySelectorAll('.show-guest-adding-modal');
showGuestAddingModal.forEach(function (element) {
    element.addEventListener('click', function () {
        guestAddingModal.classList.remove('hidden');
        guestAddingModal.classList.remove('modal-close');
        guestAddingModal.classList.add('modal-open');
        childElementGuestAddingModal.classList.remove('slide-up');
        childElementGuestAddingModal.classList.add('slide-down');
    });
});
const closeGuestAddingModal = document.querySelector('.closeModal');
guestAddingModal.addEventListener('click', closeGAM);
closeGuestAddingModal.addEventListener('click', closeGAM);
function closeGAM(e) {
    if (!childElementGuestAddingModal.contains(e.target) || closeGuestAddingModal.contains(e.target)) {
        guestAddingModal.classList.remove('modal-open');
        guestAddingModal.classList.add('modal-close');
        childElementGuestAddingModal.classList.add('slide-up');
        childElementGuestAddingModal.classList.remove('slide-down');

        setTimeout(() => {
            guestAddingModal.classList.add('hidden');
        }, 250);
    }
}
// group-guest-modal 
const guestGroupModal = document.querySelector('.guest-group-modal');
const childElementItemGuestGroupModal = guestGroupModal.querySelector(':first-child');
const showGroupGuestModal = document.querySelectorAll('.show-guest-group-modal');
showGroupGuestModal.forEach(function (element) {
    element.addEventListener('click', function () {
        guestGroupModal.classList.remove('hidden');
        guestGroupModal.classList.remove('modal-close');
        guestGroupModal.classList.add('modal-open');
        childElementItemGuestGroupModal.classList.remove('slide-up');
        childElementItemGuestGroupModal.classList.add('slide-down');
    });
});
const closeGuestGroupModal = document.querySelector('.closeModal');
guestGroupModal.addEventListener('click', closeModalItem);
closeGuestGroupModal.addEventListener('click', closeModalItem);
function closeModalItem(e) {
    if (!childElementItemGuestGroupModal.contains(e.target) || closeGuestGroupModal.contains(e.target)) {
        guestGroupModal.classList.remove('modal-open');
        guestGroupModal.classList.add('modal-close');
        childElementItemGuestGroupModal.classList.add('slide-up');
        childElementItemGuestGroupModal.classList.remove('slide-down');

        setTimeout(() => {
            guestGroupModal.classList.add('hidden');
        }, 250);
    }
};

// table searching
const tableRows = document.querySelector('#table').querySelectorAll('tbody tr');
const searchableCells = Array.from(tableRows).map(row => row.querySelectorAll("td")[3]);



const searchBar = document.querySelector('#searchbar');
searchBar.addEventListener('input', () => {
    const searchQuery = searchBar.value.toLowerCase();
    for (const tableCell of searchableCells) {
        const row = tableCell.closest("tr");
        const value = tableCell.textContent.toLowerCase().replace(",", "");
        row.style.visibility = null;
        if (value.search(searchQuery) === -1) {
            row.style.visibility = "collapse";
        }
    }
});

// table selecting

const selectors = document.querySelectorAll('.selector');
selectors.forEach(selector => {
    let index = 0;
    switch (selector.id) {
        case "selector5":
            index = 5;
            break;
        case "selector6":
            index = 6;
            break;
        case "selector7":
            index = 7;
            break;
    };
    const selectableCells = Array.from(tableRows).map(row => row.querySelectorAll("td")[index]);
    selector.addEventListener('change', () => {
        const option = selector.value.toLowerCase();
        for (const tableCell of selectableCells) {
            const row = tableCell.closest("tr");
            const value = tableCell.textContent.toLowerCase().replace(",", "");
            row.style.visibility = null;
            if (value.search(option) === -1) {
                row.style.visibility = "collapse";
            }
        }
    });
});
