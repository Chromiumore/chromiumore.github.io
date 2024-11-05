const dishArray = [
    // Soups
    {
        keyword: 'gaspacho',
        name: 'Гаспачо',
        price: 195,
        category:'soup',
        count: 350,
        image: 'resources/soups/gazpacho.jpg',
        kind: 'veg'
    },
    {
        keyword: 'mushroom_soup',
        name: 'Грибной суп-пюре',
        price: 185, category: 'soup', 
        count: 330,
        image: 'resources/soups/mushroom_soup.jpg',
        kind: 'veg'
    },
    {
        keyword: 'norwegian_soup',
        name: 'Норвежский суп',
        price: 270,
        category: 'soup',
        count: 330,
        image: 'resources/soups/norwegian_soup.jpg',
        kind: 'fish'
    },
    {
        keyword: 'chicken_soup',
        name: 'Куриный суп',
        price: 330,
        category: 'soup',
        count: 350,
        image: 'resources/soups/chicken.jpg',
        kind: 'meat' 
    },
    {
        keyword: 'ramen',
        name: 'Рамен',
        price: 375,
        category: 'soup',
        count: 425,
        image: 'resources/soups/ramen.jpg',
        kind: 'meat' 
    },
    {
        keyword: 'tomyum',
        name: 'Том ям с креветками',
        price: 650,
        category: 'soup',
        count: 500,
        image: 'resources/soups/tomyum.jpg',
        kind: 'fish' 
    },
    // Main course
    {
        keyword: 'fried_potatoes',
        name: 'Жареная картошка с грибами',
        price: 150,
        category: 'main',
        count: 250,
        image: 'resources/main_course/friedpotatoeswithmushrooms1.jpg',
        kind: 'veg'
    },
    {
        keyword: 'lasagna',
        name: 'Лазанья',
        price: 385,
        category: 'main',
        count: 310,
        image: 'resources/main_course/lasagna.jpg',
        kind: 'meat'
    },
    {
        keyword: 'chicken_cutlets',
        name: 'Котлеты из курицы с картофельным пюре',
        price: 225,
        category: 'main',
        count: 280,
        image: 'resources/main_course/chickencutletsandmashedpotatoes.jpg',
        kind: 'meat'
    },
    {
        keyword: 'fish_rice',
        name: 'Рыбная котлета с рисом и спаржей',
        price: 320,
        category: 'main',
        count: 270,
        image: 'resources/main_course/fishrice.jpg',
        kind: 'fish'
    },
    {
        keyword: 'pizza',
        name: 'Пицца маргарита',
        price: 450,
        category: 'main',
        count: 470,
        image: 'resources/main_course/pizza.jpg',
        kind: 'veg'
    },
    {
        keyword: 'shrimp_pasta',
        name: 'Паста с креветками',
        price: 340,
        category: 'main',
        count: 280,
        image: 'resources/main_course/shrimppasta.jpg',
        kind: 'fish'
    },
    // Salads and starters
    {
        keyword: 'caesar',
        name: 'Цезарь с цыплёнком',
        price: 370,
        category: 'salad_starter',
        count: 220,
        image: 'resources/salads_starters/caesar.jpg',
        kind: 'meat' 
    },
    {
        keyword: 'caprese',
        name: 'Капрезе с моцареллой',
        price: 350,
        category: 'salad_starter',
        count: 235,
        image: 'resources/salads_starters/caprese.jpg',
        kind: 'veg' 
    },
    {
        keyword: 'korean_salad',
        name: 'Корейский салат с овощами и яйцом',
        price: 330,
        category: 'salad_starter',
        count: 250,
        image: 'resources/salads_starters/saladwithegg.jpg',
        kind: 'veg'   
    },
    {
        keyword: 'tuna_salad',
        name: 'Салат с тунцом',
        price: 480,
        category: 'salad_starter',
        count: 250,
        image: 'resources/salads_starters/tunasalad.jpg',
        kind: 'fish' 
    },
    {
        keyword: 'fries_ketchup',
        name: 'Картофель фри с кетчупом',
        price: 260,
        category: 'salad_starter',
        count: 235,
        image: 'resources/salads_starters/frenchfries2.jpg',
        kind: 'veg' 
    },
    {
        keyword: 'fries_caesar',
        name: 'Картофель фри с соусом Цезарь',
        price: 280,
        category: 'salad_starter',
        count: 250,
        image: 'resources/salads_starters/frenchfries1.jpg',
        kind: 'veg'
    },
    // Beverages
    {
        keyword: 'orange_juice',
        name: 'Апельсиновый сок',
        price: 120,
        category: 'beverage',
        count: 300,
        image: 'resources/beverages/orangejuice.jpg',
        kind: 'cold'
    },
    {keyword: 'apple_juice',
        name: 'Яблочный сок',
        price: 90,
        category: 'beverage',
        count: 300,
        image: 'resources/beverages/applejuice.jpg',
        kind: 'cold'
    },
    {
        keyword: 'carrot_juice',
        name: 'Морковный сок',
        price: 110,
        category: 'beverage',
        count: 300,
        image: 'resources/beverages/carrotjuice.jpg',
        kind: 'cold'
    },
    {
        keyword: 'cappuccino',
        name: 'Капучино',
        price: 180,
        category: 'beverage',
        count: 300,
        image: 'resources/beverages/cappuccino.jpg',
        kind: 'hot'
    },
    {
        keyword: 'green_tea',
        name: 'Зелёный чай',
        price: 100,
        category: 'beverage',
        count: 300,
        image: 'resources/beverages/greentea.jpg',
        kind: 'hot'
    },
    {
        keyword: 'black_tea',
        name: 'Зелёный чай',
        price: 90,
        category: 'beverage',
        count: 300,
        image: 'resources/beverages/tea.jpg',
        kind: 'hot'
    },
    // Desserts
    {
        keyword: 'baklava',
        name: 'Пахлава',
        price: 220,
        category: 'dessert',
        count: 300,
        image: 'resources/desserts/baklava.jpg',
        kind: 'small' 
    },
    {
        keyword: 'cheesecake',
        name: 'Чизкейк',
        price: 240,
        category: 'dessert',
        count: 125,
        image: 'resources/desserts/checheesecake.jpg',
        kind: 'small' 
    },
    {
        keyword: 'chocolate_cake',
        name: 'Шоколадный торт',
        price: 270,
        category: 'dessert',
        count: 140,
        image: 'resources/desserts/chocolatecake.jpg',
        kind: 'medium' 
    },
    {
        keyword: 'chocolate_cheesecake',
        name: 'Шоколадный чизкейк',
        price: 260,
        category: 'dessert',
        count: 125,
        image: 'resources/desserts/chocolatecheesecake.jpg',
        kind: 'small' 
    },
    {
        keyword: 'donuts_3',
        name: 'Пончики (3 штуки)',
        price: 410,
        category: 'dessert',
        count: 350,
        image: 'resources/desserts/donuts2.jpg',
        kind: 'medium' 
    },
    {
        keyword: 'donuts_6',
        name: 'Пончики (6 штук)',
        price: 650,
        category: 'dessert',
        count: 700,
        image: 'resources/desserts/donuts.jpg',
        kind: 'large' 
    }
];
