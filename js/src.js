let actionButtons = document.getElementsByClassName('action-pill');
for (let i = 0; i<actionButtons.length; i++) {
    actionButtons[i].addEventListener('click', (event) => {
        handlePillClick(event);
    });  
}

hideAllDescriptions();

setActiveBlock(actionButtons[0]);
document.getElementById('language-details').style.display = 'inline-block';


function setActiveBlock(block) {
    block.style.display = 'inline-block';
    block.classList.add('active');
}

function hideAllDescriptions() {
    let allDescriptionBlocks = document.querySelectorAll('div.skill-description ul');
    allDescriptionBlocks.forEach(block => {
        block.style.display = 'none';
    })
    for (let i = 0; i<actionButtons.length; i++) {
        actionButtons[i].classList.remove('active')
    }
}

function handlePillClick(event) {
    
    hideAllDescriptions()

    // Show the correct block on click
    let target = event.target.id;
    setActiveBlock(event.target);
    let blockID = target + '-details'
    document.getElementById(blockID).style.display = 'inline-block'
    document.querySelectorAll('i.fa-solid.fa-circle-minus')[0].classList.replace('fa-circle-minus', 'fa-circle-plus');
    document.getElementById(target).querySelectorAll('i.fa-solid.fa-circle-plus')[0].classList.replace('fa-circle-plus', 'fa-circle-minus');
    
}


