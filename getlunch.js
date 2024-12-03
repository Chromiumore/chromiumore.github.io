// let order = {
//     'soup': null,
//     'main-course': null,
//     'salad': null,
//     'drink': null,
//     'dessert':null
// };

let categories = ['soup', 'main-course', 'salad', 'drink', 'dessert'];

let dishArray = [];

function prepareComboPanel() {
    let window = document.createElement('div');
    window.classList.add('combo-panel');

    let message = document.createElement('p');
    message.classList.add('combo-price');
    window.appendChild(message);

    let button = document.createElement('button');
    button.textContent = 'Перейти к оформлению';
    button.disabled = true;
    let link = document.createElement('a');
    link.classList.add('combo-link');
    link.href = 'getorder.html';
    link.appendChild(button);
    window.appendChild(link);

    document.body.appendChild(window);
    window.style.display = 'none';
    console.log('Combo panel prepeared');

    return window;
}

let panel = prepareComboPanel();

function calculatePrice() {
    let sum = 0;
    for (let el of categories) {
        let id = localStorage.getItem(el);
        if (id) {
            let dish = dishArray.find(dish => dish.id == id);
            sum += dish.price;
        }
    }
    return sum;
}

function getNotificationMessage() {
    isEmpty = true;
    for (let el of categories) {
        if (localStorage.getItem(el)) {
            isEmpty = false;
            break;
        }
    }
    if (isEmpty) {
        return 'Ничего не выбрано. Выберите блюда для заказа';
    }

    if (!localStorage.getItem('drink')) {
        return 'Выберите напиток';
    }

    if (localStorage.getItem('soup')
        && !localStorage.getItem('main-course')
        && !localStorage.getItem('salad')) {
        return 'Выберите блюдо/салат/стартер';
    }

    if (localStorage.getItem('salad')
        && !localStorage.getItem('main-course')
        && !localStorage.getItem('soup')) {
        return 'Выберите суп или главное блюдо';
    }

    if ((localStorage.getItem('drink')
        || localStorage.getItem('dessert'))
        && !localStorage.getItem('main-course')
        && !localStorage.getItem('soup')
        && !localStorage.getItem('salad')) {
        return 'Выберите главное блюдо';
    }

    return '';
}

function checkCombo() {
    let price = calculatePrice();
    document.querySelector('.combo-price').textContent = 'Итого: ' + price;

    if (localStorage.getItem('soup') || localStorage.getItem('main-course')
        || localStorage.getItem('drink') || localStorage.getItem('dessert')
        || localStorage.getItem('salad')) {
        document.querySelector('.combo-panel').style.display = 'flex';
    }

    let message = getNotificationMessage();
    let button = document.querySelector('.combo-link').firstChild;
    if (message === '') {
        button.disabled = false;
    } else {
        button.disabled = true;
    }
}

function addDish(keyword) {
    let dish = dishArray.find(dish => dish.keyword == keyword);
    localStorage.setItem(dish.category, dish.id);
    checkCombo();
}

function manageSelected(dishCard) {
    let cards = dishCard.parentElement.children;
    for (let el of cards) {
        el.classList.remove('selected-dish');
    }
    dishCard.classList.add('selected-dish');
}

function buttonPressed(dishCard) {
    manageSelected(dishCard);
    addDish(dishCard.getAttribute('data-dish'));
}

function showDishes() {
    let sortedDishes = dishArray.sort((a, b) => a.name.localeCompare(b.name));
    let sections = document.querySelectorAll('.dishes');

    for (let dish of sortedDishes) {
        let dishCard = document.createElement('div');

        dishCard.classList.add('dish-card');
        dishCard.setAttribute('data-dish', dish.keyword);
        dishCard.setAttribute('data-kind', dish.kind);
        dishCard.innerHTML = `
                    <img src='${dish.image}' alt='${dish.name}'>
                    <p class="price">${dish.price}₽</p>
                    <p class="name">${dish.name}</p>
                    <p class="prop">${dish.count} г</p>
                    <button>Добавить</button>`;
        
        dishCard.querySelector('button').onclick = (
            
        ) => buttonPressed(dishCard);

        let sectionId;
        switch (dish.category) {
        case 'soup':
            sectionId = 0;
            break;
        case 'main-course':
            sectionId = 1;
            break;
        case 'salad':
            sectionId = 2;
            break;
        case 'drink':
            sectionId = 3;
            break;
        case 'dessert':
            sectionId = 4;
            break;
        }

        sections[sectionId].append(dishCard);

        if (localStorage.getItem(dish.category) == dish.id) {
            manageSelected(dishCard);
        }
    }
    checkCombo();
}

async function loadDishes() {
    let url = 'https://edu.std-900.ist.mospolytech.ru/labs/api/dishes';
    const response = await fetch(url);
    const json = await response.json();
    console.log(json);
    dishArray = json;
    showDishes();
}

loadDishes();

function activateFilters() {
    let filters = document.getElementsByClassName('filters');
    for (let filter of filters) {
        for (let button of filter.children) {
            button.addEventListener('click', function(event) {
                let kind = event.target.getAttribute('data-kind');
                let section = event.target.parentElement.parentElement;
                let dishes = section.querySelector('.dishes');
                for (let dish of dishes.children) {
                    if (dish.getAttribute('data-kind') !== kind
                    && !event.target.classList.contains('active')) {
                        dish.style.display = 'none';
                    } else {
                        dish.style.display = 'block';
                    }
                }
                
                if (event.target.classList.contains('active')) {
                    event.target.classList.remove('active');
                } else {
                    for (let i of event.target.parentElement.children) {
                        i.classList.remove('active');
                    }
                    event.target.classList.add('active');
                }
            });
        }
    }    
}

activateFilters();
