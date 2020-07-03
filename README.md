# Stock'Em!

Link to live app: https://stock-em.vercel.app/

## Description
Stock'Em! is an app specifically for tracking inventory coming into and out of a business. Add SKUs, Customers, and Suppliers. Edit your customer and supplier information as necessary. Submit Customer and Supplier PO's. Inventory will automatically be updated from these PO's. View all past orders, whether for a customer or a supplier.

## Screenshots
__Landing Page__

![Landing Page for App](/src/pictures/StockEmLanding.PNG)

__Inventory__
![Large Screen View of Inventory](/src/pictures/StockEmLargeInventory.PNG)

![Small Screen View of Inventory](/src/pictures/StockEmSmallInventory.PNG)

__Suppliers__
![Large Screen View of Suppliers](/src/pictures/StockEmLargeSuppliers.PNG)

![Small Screen View of Suppliers](/src/pictures/StockEmSmallSuppliers.PNG)

__Customers__
![Large Screen View of Customers](/src/pictures/StockEmLargeCustomers.PNG)

![Small Screen View of Customers](/src/pictures/StockEmSmallCustomers.PNG)

__Order History__
![Large Screen View of Order History](/src/pictures/StockEmLargePastOrders.PNG)

![Small Screen View of OrderHistory](/src/pictures/StockEmSmallPastOrders.PNG)

__Add & Edit Customers__
![Add and Edit Customers Page](/src/pictures/StockEmAddEditCustomerInfo.PNG)

__Add & Edit Suppliers__
![Add and Edit Suppliers Page](/src/pictures/StockEmAddEditSupplierInfo.PNG)

__Add SKUs__
![Add and Edit SKU Page](/src/pictures/StockEmAddSKUs.PNG)

__Customer Order__
![Create Customer PO](/src/pictures/StockEmCustomerPO.PNG)

__Supplier Order__
![Create Supplier PO](/src/pictures/StockEmSupplierPO.PNG)

## Technology Used
React, HTML, Javascript, CSS, NodeJs, PostgreSQL

## API documentation/shcemas
Please see the endpoints and schemas below:
Github for API: `https://github.com/juliawithers/stock-em-api`

```
`https://stock-em-api.herokuapp.com/api/stock-em`
/inventory
/suppliers
/customers
/past_orders
/skus
```
### /inventory 

__GET__: 
request query: 
```
    `https://stock-em-api.herokuapp.com/api/stock-em/inventory/?user_id=${user_id}`
```
returns: 
```
    [{
        "id": 1,
        "sku": 1234,
        "quantity": 25,
        "inv_description": "capacitor",
        "inv_location": "M01",
        "date_entered": "2020-5-5"
    },...]
```
__POST__: 

body:  
```
    {
        "sku": 1234,
        "quantity": 25,
        "inv_description": "capacitor",
        "inv_location": "M01",
        "date_entered": "2020-5-5"
    }
```
returns: 
```
    {
        "id": "newid",
        "sku": 1234,
        "quantity": 25,
        "inv_description": "capacitor",
        "inv_location": "M01",
        "date_entered": "2020-5-5"
    }
```
__DELETE__:

body: 
```
    {
        "id": the inventory id
    }
```
returns:
```
    {
        "id": deleted id
    }
```



### /suppliers

__GET__:

query params:
```
    `https://stock-em-api.herokuapp.com/api/stock-em/suppliers/?user_id=${user_id}`
```
returns:
```
    [
        {
            "id": 1,
            "company": "Company 1",
            "contact": "John Doe",
            "phone": "111-111-1112",
            "email": "111222@gmail.com",
            "sup_address": "1234 Main St., Nowhere USA"
        },...
    ]
```
__POST__: 

body:  
```
    {
        "company": "Company 1",
        "contact": "John Doe",
        "phone": "111-111-1112",
        "email": "111222@gmail.com",
        "sup_address": "1234 Main St., Nowhere USA"
    }
```
returns: 
```
    {
        "id": new id,
        "company": "Company 1",
        "contact": "John Doe",
        "phone": "111-111-1112",
        "email": "111222@gmail.com",
        "sup_address": "1234 Main St., Nowhere USA"
    }
```
__PATCH__:

body:  
```
    {
        "id": id,
        "company": "UPDATED COMPANY",
        "contact": "John Doe",
        "phone": "111-111-1112",
        "email": "111222@gmail.com",
        "sup_address": "1234 Main St., Nowhere USA"
    }
```
returns: 
```
    {
        "id": id,
        "company": "UPDATED COMPANY",
        "contact": "John Doe",
        "phone": "111-111-1112",
        "email": "111222@gmail.com",
        "sup_address": "1234 Main St., Nowhere USA"
    }
```

### /customers

__GET__:

query params:
```
    `https://stock-em-api.herokuapp.com/api/stock-em/customers/?user_id=${user_id}`
```

returns: 
```
   [
       {
            "id": 1,
            "company": "Company 1",
            "contact": "Jane Doe",
            "phone": "111-111-1112",
            "email": "111222@gmail.com",
            "bill_address": "1234 Main St., Nowhere USA",
            "ship_address": "1234 Main St., Nowhere USA"
        },...
    ]
```
__POST__ :

body: 
```
    {
        "company": "Company 1",
        "contact": "Jane Doe",
        "phone": "111-111-1112",
        "email": "111222@gmail.com",
        "bill_address": "1234 Main St., Nowhere USA",
        "ship_address": "1234 Main St., Nowhere USA"
    }
```
returns: 
```
    {
        "id": new id,
        "company": "Company 1",
        "contact": "Jane Doe",
        "phone": "111-111-1112",
        "email": "111222@gmail.com",
        "bill_address": "1234 Main St., Nowhere USA",
        "ship_address": "1234 Main St., Nowhere USA"
    }
```
__PATCH__:

body: 
```
    {
        "id": 1,
        "company": "UPDATED CUSTOMER COMPANY",
        "contact": "Jane Doe",
        "phone": "111-111-1112",
        "email": "111222@gmail.com",
        "bill_address": "1234 Main St., Nowhere USA",
        "ship_address": "1234 Main St., Nowhere USA"
    }
```
returns: 
```
    {
        "id": 1,
        "company": "UPDATED CUSTOMER COMPANY",
        "contact": "Jane Doe",
        "phone": "111-111-1112",
        "email": "111222@gmail.com",
        "bill_address": "1234 Main St., Nowhere USA",
        "ship_address": "1234 Main St., Nowhere USA"
    }
```

### /past_orders
__GET__:

query params:
```
    `https://stock-em-api.herokuapp.com/api/stock-em/past-orders/?user_id=${user_id}`
```

returns: 
```
   [
       {
            "id": 1,
            "company":"Some Company",
            "sku": 1234,
            "quantity": 100,
            "inv_description": "capacitor",
            "cust_order": "PO123",
            "sup_order": "",
            "date_entered": "2020-1-1"
        },...
    ]
```
__POST__:

body: 
```
    {
        "company":"Some Company",
        "sku": 1234,
        "quantity": 100,
        "inv_description": "capacitor",
        "cust_order": "PO123",
        "sup_order": "",
        "date_entered": "2020-1-1"
    }
```
returns: 
```
    {
        "id": new id,
        "company":"Some Company",
        "sku": 1234,
        "quantity": 100,
        "inv_description": "capacitor",
        "cust_order": "PO123",
        "sup_order": "",
        "date_entered": "2020-1-1"
    }
```

### /skus

__GET__:

query params:
```
    `https://stock-em-api.herokuapp.com/api/stock-em/skus/?user_id=${user_id}`
```

returns: 
```
   [
       {
            "id": 1,
            "sku": 1234,
            "inv_description": "capacitor",
            "date_entered": "2020-5-5"
        },...
    ]
```
__POST__:

body: 
```
   {
        "sku": 1234,
        "inv_description": "capacitor",
        "date_entered": "2020-5-5"
    }
```
returns: 
```
    {
        "id": new id,
        "sku": 1234,
        "inv_description": "capacitor",
        "date_entered": "2020-5-5"
    },
```

