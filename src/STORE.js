export default {
    "users": [
        {
            "id": "1",
            "username": "username1",
            "password":"password1"
        },
        {
            "id": "2",
            "username": "username2",
            "password":"password2"
        }
    ],
    "inventories": [
        {
            "id": "1",
            "user_id": "1",
            "skus": [
                {
                    "id": 1,
                    "sku":1234,
                    "quantity":25,
                    "description": "capacitor",
                    "location": "M01",
                    "date_added": "2020-5-5"
                },
                {
                    "id": 2,
                    "sku":12344,
                    "quantity":5,
                    "description": "overload",
                    "location": "M03",
                    "date_added": "2020-5-1"
                },
                {
                    "id": 3,
                    "sku":1234,
                    "quantity":5,
                    "description": "capacitor",
                    "location": "M03",
                    "date_added": "2020-5-1"
                },
                {
                    "id": 4,
                    "sku":5555,
                    "quantity":15,
                    "description": "relay",
                    "location": "M03",
                    "date_added": "2020-5-1"
                }
            ],
        },
        {
            "id": "2",
            "user_id": "2",
            "skus": [
                {
                    "id": 1,
                    "sku":2222,
                    "quantity":250,
                    "description": "relay",
                    "location": "M01",
                    "date_added": "2020-5-5"
                },
                {
                    "id": 2,
                    "sku":223344,
                    "quantity":15,
                    "description": "overload",
                    "location": "M03",
                    "date_added": "2020-5-1"
                }
            ],
        }
    ],
    "skus": [
        {
            "id": "1",
            "user_id": "1",
            "skus": [
                {
                    "id": 1,
                    "sku":1234,
                    "description": "capacitor",
                    "date_added": "2020-5-5"
                },
                {
                    "id": 2,
                    "sku":12344,
                    "description": "overload",
                    "date_added": "2020-5-1"
                },
                {
                    "id": 3,
                    "sku":5555,
                    "description": "relay",
                    "date_added": "2020-5-1"
                },
                {
                    "id": 4,
                    "sku":12345,
                    "description": "overload",
                    "date_added": "2020-5-1"
                }
            ],
        },
        {
            "id": "2",
            "user_id": "2",
            "skus": [
                {
                    "id": 1,
                    "sku":2222,
                    "description": "relay",
                    "date_added": "2020-5-5"
                },
                {
                    "id": 2,
                    "sku":223344,
                    "description": "overload",
                    "date_added": "2020-5-1"
                }
            ],
        }
    ],
    "suppliers": [
        {
            "id": "1",
            "user_id":"1",
            "suppliers_data": [
                {
                    "id": 1,
                    "company": "Company 1",
                    "contact": "John Doe",
                    "phone": "111-111-1112",
                    "email": "111222@gmail.com",
                    "address": "1234 Main St., Nowhere USA"
                },
                {
                    "id": 2,
                    "company": "Company 2",
                    "contact": "John Smith",
                    "phone": "111-111-2222",
                    "email": "1234@gmail.com",
                    "address": "555 Main St., Nowhere USA"
                }
            ]
        },
        {
            "id": "2",
            "user_id":"2",
            "suppliers_data": [
                {
                    "id": 1,
                    "company": "Company 1",
                    "contact": "John Doe",
                    "phone": "111-111-1112",
                    "email": "111222@gmail.com",
                    "address": "1234 Main St., Nowhere USA"
                },
                {
                    "id": 2,
                    "company": "Company 2",
                    "contact": "John Smith",
                    "phone": "111-111-2222",
                    "email": "1234@gmail.com",
                    "address": "555 Main St., Nowhere USA"
                }
            ]
        }
    ],
    "customers": [
        {
            "id": "1",
            "user_id":"1",
            "customers_data": [
                {
                    "id": 1,
                    "company": "Company 1",
                    "contact": "Jane Doe",
                    "phone": "111-111-1112",
                    "email": "111222@gmail.com",
                    "bill_address": "1234 Main St., Nowhere USA",
                    "ship_address": "1234 Main St., Nowhere USA"
                },
                {
                    "id": 2,
                    "company": "Company 2",
                    "contact": "Jane Smith",
                    "phone": "111-111-2222",
                    "email": "1234@gmail.com",
                    "bill_address": "555 Main St., Nowhere USA",
                    "ship_address": "555 Main St., Nowhere USA"
                }
            ]
        },
        {
            "id": "2",
            "user_id":"2",
            "customers_data": [
                {
                    "id": 1,
                    "company": "Company 1",
                    "contact": "Jane Doe",
                    "phone": "111-111-1112",
                    "email": "111222@gmail.com",
                    "bill_address": "1234 Main St., Nowhere USA",
                    "ship_address": "1234 Main St., Nowhere USA"
                },
                {
                    "id": 2,
                    "company": "Company 2",
                    "contact": "Jane Smith",
                    "phone": "111-111-2222",
                    "email": "1234@gmail.com",
                    "bill_address": "555 Main St., Nowhere USA",
                    "ship_address": "555 Main St., Nowhere USA"
                }
            ]
        }
    ],
    "past_orders": [
        {
            "id": "1",
            "user_id": "1",
            "order_history": [
                {
                    "id": 1,
                    "company":"Some Company",
                    "sku": 1234,
                    "quantity": 100,
                    "description": "capacitor",
                    "order": "PO123",
                    "date_entered": "2020-1-1"
                },
                {
                    "id": 2,
                    "company":"Some Company Two",
                    "sku": 1234,
                    "quantity": 50,
                    "description": "capacitor",
                    "order": "PO1234",
                    "date_entered": "2020-1-1"
                }
            ]
        },
        {
            "id": "2",
            "user_id": "2",
            "order_history": [
                {
                    "id": 1,
                    "company":"Some Company",
                    "sku": 1234,
                    "quantity": 100,
                    "description": "capacitor",
                    "order": "PO123",
                    "date_entered": "2020-1-1"
                },
                {
                    "id": 2,
                    "company":"Some Company Two",
                    "sku": 1234,
                    "quantity": 50,
                    "description": "capacitor",
                    "order": "PO1234",
                    "date_entered": "2020-1-1"
                }
            ]
        }
    ]
}   


// Table submission would look like this: 

// user: {
//     username: username,
//     passw: password,
// }

// inventories: {
//     user_id: user_id,
//     sku: sku,
//     quantity: quantity, 
//     description: description, 
//     location: location,
//     date_added: date
// }

// suppliers: {
//     user_id: user_id,
//     company: companyName,
//     contact: contactName,
//     phone: supplierPhoneNumber,
//     email: supplierEmail,
//     address: supplierAddress
// }

// customers: {
//     user_id: user_id,
//     company: companyName,
//     contact: contactName,
//     phone: customerPhone,
//     email: customerEmail,
//     bill_address: customerBillAddress,
//     ship_address: customerShipAddress
// },


// order: {
//     user_id: user_id,
//     company: customerCompanyName, 
//     sku: sku,
//     quantity: quantity,
//     description: description,
//     order: orderPO,
//     date_entered: date
// }

// skus: {
//     user_id: user_id,
//     sku: sku,
//     description: description, 
//     date_added: date
// }