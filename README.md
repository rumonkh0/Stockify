# **Stockify**

This is a **Node.js/Express.js** backend application for managing products and categories. It allows you to create, update, and retrieve products with features like auto-generated product codes, category associations, and filtering.

---

## **Features**

1. **Create a Product**:
   - Auto-generate a unique product code based on the product name.
   - Associate products with valid categories.
2. **Update Product Information**:
   - Update product status, description, and discount.
3. **Get Products with Filters**:
   - Filter products by category.
   - Search products by name (partial or full match).
   - Include original and discounted prices in the response.

---

## **Technologies Used**

- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Language**: JavaScript
- **Dependencies**:
  - `express`: Web framework.
  - `mongoose`: MongoDB object modeling.
  - `bcryptjs`: Hashing for product code generation.
  - `dotenv`: Environment variable management.
  - `cors`: Cross-Origin Resource Sharing.

---

## **Setup Instructions**

### **1. Prerequisites**

- Node.js installed (v14 or higher).
- MongoDB installed or a MongoDB Atlas connection string.

### **2. Clone the Repository**

You can either clone the repository or download it as a zip file.

#### **Option 1: Clone the Repository**

```
git clone https://github.com/rumonkh0/Stockify
cd stockify
```

#### **Option 2: Download and Unzip**

1. Download the repository as a **zip file**.
2. Unzip the file to your desired location.
3. Navigate to the project directory:

```
cd stockify
```

### **3. Install Dependencies**

```
npm install
```

### **4. Set Up Environment Variables**

rename the `config1.env` file to `config.env` in config folder and add the following variables:

```
MONGO_URI= /*your mongo uri*/
PORT=5000
```

### **5. Start the Server**

```
# Run in dev mode
npm run dev

# Run in prod mode
npm start
```

## The server will start on `http://localhost:5000`.

## **API Documentation**

Documentation with examples [here](https://documenter.getpostman.com/view/24171225/2sAYk8tMyn)

---

## **Database Design**

### **Data Model Diagram**

Below is the \***\*Data Model diagram\*\*** representation of the database structure:
![1741703145401](images/README/1741703145401.png)

### **Relationships**

1. **`categories`** and **`products`** have a **one-to-many** relationship.
   - A category can have multiple products.
   - A product belongs to a single category.

---

## **Contact**

For questions or feedback, please contact:

- **MD Rummanul Haque Khan Ruman**
- **Email**: [rummanul.khan@gmail.com](https://mailto:[rummanul.khan@gmail.com)
- **GitHub**: [rumonkh0](https://github.com/rumonkh0)
