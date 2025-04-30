import React from 'react';
// import { CheckCircle, ShieldCheck, Truck, Users } from 'lucide-react';
import PharmacyHome from './components/PharmacyHome';
import HomeDeals from './components/HomeDeals';
import Navbar from './components/Navbar';

// Mock data for products and categories (replace with your actual data)
// const featuredProducts = [
//     { id: 1, name: 'Product 1', price: 10.99, image: 'https://placehold.co/150x150/EEE/31343C' },
//     { id: 2, name: 'Product 2', price: 19.99, image: 'https://placehold.co/150x150/EEE/31343C' },
//     { id: 3, name: 'Product 3', price: 14.50, image: 'https://placehold.co/150x150/EEE/31343C' },
//     { id: 4, name: 'Product 4', price: 25.00, image: 'https://placehold.co/150x150/EEE/31343C' },
//     { id: 5, name: 'Product 5', price: 12.00, image: 'https://placehold.co/150x150/EEE/31343C' },
//     { id: 6, name: 'Product 6', price: 30.00, image: 'https://placehold.co/150x150/EEE/31343C' },
// ];

// const trendingProducts = [
//     { id: 7, name: 'Trending Product 1', price: 17.99, image: 'https://placehold.co/150x150/EEE/31343C' },
//     { id: 8, name: 'Trending Product 2', price: 22.50, image: 'https://placehold.co/150x150/EEE/31343C' },
//     { id: 9, name: 'Trending Product 3', price: 15.75, image: 'https://placehold.co/150x150/EEE/31343C' },
//     { id: 10, name: 'Trending Product 4', price: 28.00, image: 'https://placehold.co/150x150/EEE/31343C' },
// ];

// const categories = [
//     { id: 1, name: 'Vitamins', image: 'https://placehold.co/100x100/EEE/31343C' },
//     { id: 2, name: 'Supplements', image: 'https://placehold.co/100x100/EEE/31343C' },
//     { id: 3, name: 'Personal Care', image: 'https://placehold.co/100x100/EEE/31343C' },
//     { id: 4, name: 'Medicine', image: 'https://placehold.co/100x100/EEE/31343C' },
//     { id: 5, name: 'Fitness', image: 'https://placehold.co/100x100/EEE/31343C' },
//     { id: 6, name: 'Skin Care', image: 'https://placehold.co/100x100/EEE/31343C' },
// ];

// const benefits = [
//     { id: 1, title: 'Quality Products', description: 'Wide selection of trusted brands.', icon: <CheckCircle className="w-6 h-6 text-green-500" /> },
//     { id: 2, title: 'Secure Checkout', description: 'Your data is protected.', icon: <ShieldCheck className="w-6 h-6 text-green-500" /> },
//     { id: 3, title: 'Fast Delivery', description: 'Get your order quickly.', icon: <Truck className="w-6 h-6 text-green-500" /> },
//     { id: 4, title: 'Customer Support', description: 'We are here to help.', icon: <Users className="w-6 h-6 text-green-500" /> },
// ];

// const testimonial = {
//     quote: "Great service and fast delivery. I highly recommend this pharmacy.",
//     author: "John Smith",
//     image: "https://placehold.co/80x80/EEE/31343C",
// };

// const stores = [
//     { id: 1, name: "Store 1", address: "123 Main St" },
//     { id: 2, name: "Store 2", address: "456 Elm St" },
//     { id: 3, name: "Store 3", address: "789 Oak Ave" },
// ];

export default function Home() {
  return (
    <div>
      <Navbar />
      <PharmacyHome />
      <HomeDeals />
    </div>
  )
}

