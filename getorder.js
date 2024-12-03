let categories = ['soup', 'main-course', 'salad', 'drink', 'dessert'];

let dishArray = [];

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

function setPrice() {
    let sum = calculatePrice();
    document.getElementById('order-price').textContent = `${sum}₽`;
}

function updateOrder() {
    if (localStorage.getItem('soup') || localStorage.getItem('main-course')
        || localStorage.getItem('drink') || localStorage.getItem('dessert')
        || localStorage.getItem('salad')) {
        document.getElementById('selected-nothing').hidden = true;
        document.getElementById('components-nothing').hidden = true;
        document.querySelector('.order-dishes').style.display = 'grid';
        document.querySelector('.order').hidden = false;
        for (let el of categories) {
            let numId = localStorage.getItem(el);
            if (numId) {
                let dish = dishArray.find(dish => dish.id == numId);
                let id = 'selected-' + dish.category;
                let text = dish.name + ' ' + dish.price + '₽';
                document.getElementById(id).textContent = text;
            } else {
                let text = 'Блюдо не выбрано';
                document.getElementById('selected-' + el).textContent = text;
            }
        }
    } else {
        for (let el of categories) {
            let id = 'selected-' + el;
            let text = 'Блюдо не выбрано';
            document.getElementById(id).textContent = text;
        }
        document.getElementById('selected-nothing').hidden = false;
        document.getElementById('components-nothing').hidden = false;
        document.querySelector('.order-dishes').style.display = 'inline';
        document.querySelector('.order').hidden = true;
    }

    for (let el of document.querySelectorAll('.dish-card')) {
        if (el.style.display !== 'none') {
            let dish = dishArray.find(
                d => el.getAttribute('data-dish') === d.keyword);
            if (dish) {
                let cat = dish.category;
                if (!localStorage.getItem(cat)) {
                    el.style.display = 'none';
                }
            }
        }
        
    }

    console.log(localStorage);
    setPrice();
}

function deleteDish(keyword) {
    let dish = dishArray.find(d => d.keyword == keyword);
    let cat = dish['category'];
    localStorage.removeItem(cat);
}

function buttonPressed(dishCard) {
    deleteDish(dishCard.getAttribute('data-dish'));
    updateOrder();
}

function showOrder() {
    let sortedDishes = dishArray.sort((a, b) => {
        a.name.localeCompare(b.name);
        a.category.localeCompare(b.category);
    });
    let orderDishes = document.getElementsByClassName('order-dishes')[0];

    for (let dish of sortedDishes) {
        let dishCard = document.createElement('div');

        dishCard.classList.add('dish-card');
        dishCard.setAttribute('data-dish', dish.keyword);
        dishCard.setAttribute('data-kind', dish.kind);
        dishCard.innerHTML = `
                    <img src='${dish.image}' alt='${dish.name}'>
                    <p class="price">${dish.price}₽</p>
                    <p class="name">${dish.name}</p>
                    <p class="prop">${dish.count}</p>
                    <button>Удалить</button>`;
        
        dishCard.querySelector('button').onclick = (
        ) => deleteDish(buttonPressed(dishCard));

        if (localStorage.getItem(dish.category) != dish.id) {
            dishCard.style.display = 'none';
        }
        orderDishes.append(dishCard);
    }
    updateOrder();
}

async function loadDishes() {
    let url = 'https://edu.std-900.ist.mospolytech.ru/labs/api/dishes';
    const response = await fetch(url);
    const json = await response.json();
    console.log(json);
    dishArray = json;
    showOrder();
}

loadDishes();

function resetOrder() {
    for (let el of categories) {
        localStorage.removeItem(el);
    }

    updateOrder();

    for (let filter of document.getElementsByClassName('filters')) {
        for (let button of filter.children) {
            button.classList.remove('active');
        }
    }

    for (let section of document.querySelectorAll('.dishes')) {
        for (let dish of section.children) {
            dish.style.display = 'block';
        }
    }

    console.log('Order reseted successfully');
}

function prepareNotification() {
    let window = document.createElement('div');
    window.classList.add('notification');

    let message = document.createElement('p');
    message.classList.add('notification-message');
    window.appendChild(message);

    let button = document.createElement('button');
    button.textContent = 'Окей👌';
    button.onclick = () => window.hidden = true;
    window.appendChild(button);

    document.body.appendChild(window);
    window.hidden = true;
    console.log('Notification prepeared');

    return window;
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

let notificationWindow = prepareNotification();

function comboNotification() {
    let message = getNotificationMessage();

    if (message === '') {
        return false;
    }

    let text
    = document.getElementsByClassName('notification-message')[0];
    console.log(text);
    text.textContent = message;

    notificationWindow.hidden = false;
    console.log('show notification', message);
    return true;
}

async function submitOrder() {
    event.preventDefault();
    
    for (let el of categories) {
        let value = document.getElementById(el + '-value');
        let id = localStorage.getItem(el);
        if (id) {
            let dish = dishArray.find(dish => dish.id == id);
            value.value = dish.keyword;
        } else {
            value.value = '';
        }
    }

    if (comboNotification()) {
        return;
    }

    let formData = new FormData();

    formData.append('full_name', document.getElementById('name-input').value);
    formData.append('email', document.getElementById('email-input').value);
    let subscribe;
    if (document.getElementById('news-checkbox').value) {
        subscribe = 1;
    } else {
        subscribe = 0;
    }
    formData.append('subscribe', subscribe);
    formData.append('phone', document.getElementById('phone-input').value);
    formData.append('delivery_address',
        document.getElementById('address-input').value);
    formData.append('delivery_type',
        document.querySelector('input[name="delivery"]:checked').value);
    formData.append('delivery_time', document.getElementById('time').value);
    formData.append('comment', document.getElementById('comment').value);

    if (localStorage.getItem('soup')) {
        formData.append('soup_id', localStorage.getItem('soup'));
    }
    if (localStorage.getItem('main_course')) {
        formData.append('main_course_id', localStorage.getItem('main_course'));
    }
    if (localStorage.getItem('salad')) {
        formData.append('salad_id', localStorage.getItem('salad'));
    }
        
    if (localStorage.getItem('drink')) {
        formData.append('drink_id', localStorage.getItem('drink'));
    }
        
    if (localStorage.getItem('dessert')) {
        formData.append('dessert_id', localStorage.getItem('dessert'));
    }

    let key = 'e0f88639-908c-4bd5-9568-97250c9e9938';
    let url = 'https://edu.std-900.ist.mospolytech.ru/labs/api/orders?api_key=';

    try {
        const response = await fetch(url + key, {
            method: 'POST',
            body: formData, 
        });

        if (response.ok) {
            alert('Заказ принят');
            localStorage.clear();
            updateOrder();
        } else {
            alert('Ошибка на сервере!');
        }   
    } catch {
        alert('Ошибка! ' + error.message);
    }
}

document.getElementById('reset').onclick = () => resetOrder();
document.getElementById('submit').onclick = () => submitOrder();
