# Book_Store_Frontend

A simple book store frontend which includes tables of orders, customers and books.

## Description

Welcome to our Book Ordering System! This project focuses on the customer experience, allowing users to seamlessly register an account, sign in, and earn points upon registration. These earned points can then be utilized to place orders for available books featured on the home page. When a user makes a purchase, the corresponding points are deducted from their total. Users can conveniently view their order history and perform actions such as editing or canceling orders. In the event of order cancellations, the user's points are automatically updated. The project, being compact and centered around the user(customer) entity, consists of feature where the customer can order books or cancel it.

## Stack

1. react
2. typescript
3. bootstrap
4. react-bootstrap

## Prerequisite

1. Install node version > 16
2. Install react version > 18

## Instructions

1. Rename `.env.sample` to `.env`
2. Update the variable, you just need to give your base URL.
3. `npm install`
4. `npm start` (to start the app)

## Book_Store_Backend

The backend for this project is:
[Book_Store_Backend](https://github.com/gondalhafizbilal/book_store_backend.git)

## Assumptions

Here, users have the ability to register and log in. Upon registration, each user is credited with 100 points. Users can utilize these points to order books, where each book is assigned a specific point value, functioning as its price these points will be deducted from the user total points and user can order books according to available points.
He can view his orders and can edit and cancel them upon canceling the user will got his points back which were deducted.
We've populated the system with book data using seeders for a comprehensive library.
Additionally, a few user profiles have been added to showcase functionality.
New users are encouraged to register and explore the platform.
