let order = {
    'soup': null,
    'main': null,
    'baverege': null
};

function calculatePrice() {
    let sum = 0;
    for (let el in order) {
        if (order[el]) {
            sum += order[el].price;
        }
    }
    document.getElementById('order-price').textContent = `${sum}₽`;
}

function updateOrder() {
    if (order['soup'] || order['main'] || order['baverege']) {
        document.getElementById('selected-nothing').hidden = true;
        document.querySelector('.order').hidden = false;
        for (let el in order) {
            if (order[el]) {
                let id = 'selected-' + order[el].category;
                let text = order[el].name + ' ' + order[el].price + '₽';
                document.getElementById(id).textContent = text;
            }
        }
    } else {
        for (let el in order) {
            let id = 'selected-' + el;
            let text = 'Блюдо не выбрано';
            document.getElementById(id).textContent = text;
        }
        document.getElementById('selected-nothing').hidden = false;
        document.querySelector('.order').hidden = true;
    }
    calculatePrice();
}

function addDish(keyword) {
    let dish = dishArray.find(dish => dish.keyword === keyword);
    order[dish.category] = dish;
    updateOrder();
}

function showDishes() {
    let sortedDishes = dishArray.sort((a, b) => a.name.localeCompare(b.name));
    let sections = document.querySelectorAll('.dishes');

    for (let dish of sortedDishes) {
        let dishCard = document.createElement('div');

        dishCard.classList.add('dish-card');
        dishCard.setAttribute('data-dish', dish.keyword);
        dishCard.innerHTML = `
                    <img src='${dish.image}' alt='${dish.name}'>
                    <p class="price">${dish.price}₽</p>
                    <p class="name">${dish.name}</p>
                    <p class="prop">${dish.count} г</p>
                    <button>Добавить</button>`;
        
        dishCard.querySelector('button').onclick = (
            
        ) => addDish(dishCard.getAttribute('data-dish'));

        let sectionId;
        switch (dish.category) {
        case 'soup':
            sectionId = 0;
            break;
        case 'main':
            sectionId = 1;
            break;
        default:
            sectionId = 2;
            break;
        }

        sections[sectionId].append(dishCard);
    }
}

function resetOrder() {
    for (let el in order) {
        order[el] = null;
    }

    updateOrder();
    console.log('Order reseted successfully');
}

function submitOrder() {
    for (let el in order) {
        let value = document.getElementById(el + '-value');
        if (order[el]) {
            value.value = order[el].keyword;
        } else {
            value.value = '';
        }
    }
}

document.addEventListener("DOMContentLoaded", showDishes);
document.getElementById('reset').onclick = () => resetOrder();
document.getElementById('submit').onclick = () => submitOrder();
