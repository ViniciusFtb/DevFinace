const modalButton = document.getElementById('openModal');
const closeModalButton = document.getElementById('cancel');
const saveButton = document.getElementById('save');
const modal = document.getElementById('modal-container');

function openOrCloseModal(){
    if (modal.style.display != 'flex'){
        modal.style.display = 'flex';
    }else{
        modal.style.display = 'none';
    }
}
modalButton.addEventListener('click', openOrCloseModal);

closeModalButton.addEventListener('click', openOrCloseModal);

saveButton.addEventListener('click', openOrCloseModal);