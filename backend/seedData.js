const mongoose = require('mongoose');
const MenuItem = require('./models/MenuItems');

// if anyone is reading this please know this is the one and only time I would put a connection string here (for hw assignment)
const uri = "mongodb+srv://admin:HFnaN0XAdnOZsU6d@cluster0.agwnq69.mongodb.net/?appName=Cluster0";

const menuItems = [
    {
        name: "Avocado Toast",
        price: 9.99,
        description: "Smashed organic avocado on toasted GF superseed bread, topped with cherry tomatoes, microgreens, hemp seeds, and a sprinkle of sea salt.",
        image: "https://images.unsplash.com/photo-1650092194571-d3c1534562be?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1740",
        category: "breakfast"
    },
    {
        name: "Açai Smoothie Bowl",
        price: 8.99,
        description: "Blend of organic açai berries topped with fresh strawberries, sliced bananas, crunchy granola, coconut flakes.",
        image: "https://images.unsplash.com/photo-1684403731883-67a71a793d2d?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=774",
        category: "breakfast"
    },
    {
        name: "Breakfast Burrito",
        price: 9.99,
        description: "GF wrap filled with seasoned tofu scramble, creamy avocado, sautéed peppers and onions, black beans, and fresh salsa.",
        image: "https://images.unsplash.com/photo-1566740933430-b5e70b06d2d5?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1740",
        category: "breakfast"
    },
    {
        name: "Roasted Veggie Bowl",
        price: 12.99,
        description: "Roasted sweet potatoes, seasonal vegetables, chickpeas, and quinoa drizzled with creamy tahini lemon dressing.",
        image: "https://images.unsplash.com/photo-1631311695255-8dde6bf96cb5?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=776",
        category: "lunch & dinner"
    },
    {
        name: "Black Bean Burger",
        price: 12.99,
        description: "House-made black bean patty topped with fresh lettuce, tomato, avocado, and vegan aioli on a toasted GF bun. Served with crispy sweet potato fries.",
        image: "https://images.unsplash.com/photo-1525059696034-4967a8e1dca2?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=776",
        category: "lunch & dinner"
    },
    {
        name: "Pesto Pasta",
        price: 11.99,
        description: "GF pasta tossed in house-made basil pesto with roasted cherry tomatoes, spinach, and pine nuts.",
        image: "https://plus.unsplash.com/premium_photo-1661293863488-4bed6c84c77a?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=774",
        category: "lunch & dinner"
    }
];



async function seedDatabase() {
    try {
        await mongoose.connect(uri);
        console.log('wooo mongoDB connected wpooooooo');

        await MenuItem.deleteMany({});
        console.log('cleared menu itess');

        await MenuItem.insertMany(menuItems);
        
        mongoose.disconnect();
    } catch (error) {
        console.error('NOOOOOOoooooooo', error);
    }
}

seedDatabase();
