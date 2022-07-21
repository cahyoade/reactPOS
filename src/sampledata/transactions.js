const data1 = JSON.parse(
    `{
        "user": {
            "id": 2,
            "name": "Elma",
            "points": 2,
            "phone": "085647687533",
            "lastEdit": 1658298786245
        },
        "total": 152500,
        "cash": 160000,
        "payment": "cash",
        "change": 7500,
        "pointsAdded": 15,
        "profit": 24590,
        "products": [
            {
                "id": 2,
                "name": "Orange",
                "prices": [
                    {
                        "min": 0,
                        "price": 15300,
                        "profit": 1530
                    },
                    {
                        "min": 7,
                        "price": 14700,
                        "profit": 1470
                    }
                ],
                "unit": "kg",
                "lastEdit": 1658298786245,
                "count": 3
            },
            {
                "id": 3,
                "name": "Pan",
                "prices": [
                    {
                        "min": 0,
                        "price": 53300,
                        "pointsPrice": 250,
                        "profit": 10000
                    }
                ],
                "unit": "pcs",
                "count": 2,
                "lastEdit": 1658298786245
            }
        ],
        "date": ""
    }`
);

data1.date = new Date();

const data2 = JSON.parse(`{
    "user": {
        "id": 3,
        "name": "Porter",
        "points": 200,
        "phone": "085647687533",
        "lastEdit": 1658298786245
    },
    "total": 118500,
    "cash": 120000,
    "payment": "cash",
    "change": 1500,
    "pointsAdded": 11,
    "profit": 11250,
    "products": [
        {
            "id": 2,
            "name": "Orange",
            "prices": [
                {
                    "min": 0,
                    "price": 15300,
                    "profit": 1530
                },
                {
                    "min": 7,
                    "price": 14700,
                    "profit": 1470
                }
            ],
            "unit": "kg",
            "lastEdit": 1658298786245,
            "count": 3
        },
        {
            "id": 1,
            "name": "Apple",
            "prices": [
                {
                    "min": 0,
                    "price": 24200,
                    "profit": 2220
                },
                {
                    "min": 7,
                    "price": 23400,
                    "profit": 2140
                }
            ],
            "unit": "kg",
            "lastEdit": 1658298786245,
            "count": 3
        }
    ],
    "date": ""
}`);

data2.date = new Date(2022, 6, 3, 3, 24, 0);

const data3 = JSON.parse(`{
    "user": {
        "id": 3,
        "name": "Suis",
        "points": 300,
        "phone": "085647687533",
        "lastEdit": 1658298786245
    },
    "total": 30600,
    "cash": 35000,
    "payment": "cash",
    "change": 4400,
    "pointsAdded": 3,
    "profit": 3060,
    "products": [
        {
            "id": 2,
            "name": "Orange",
            "prices": [
                {
                    "min": 0,
                    "price": 15300,
                    "profit": 1530
                },
                {
                    "min": 7,
                    "price": 14700,
                    "profit": 1470
                }
            ],
            "unit": "kg",
            "lastEdit": 1658298786245,
            "count": 2
        }
    ],
    "date": ""
}`);

data3.date = new Date(2022, 6, 17, 3, 24, 0);

const data = [data1, data2, data3]

export default data;