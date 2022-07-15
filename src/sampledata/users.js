const data = [
    {
        name : 'Amy',
        points : 7,
        phone : '085647687533',
        bon : [],
        lastEdit : Date.now()
    },
    {
        name : 'Elma',
        points : 2,
        phone : '085647687533',
        bon : [],
        lastEdit : Date.now()
    },
    {
        name : 'Porter',
        points : 200,
        phone : '085647687533',
        bon : [],
        lastEdit : Date.now()
    }
    ,
    {
        name : 'Suis',
        points : 300,
        phone : '085647687533',
        bon : [{ 
            name : 'Pan',
            prices : [{min : 0, price : 53300, pointsPrice : 250, profit : 10000}],
            unit : 'pcs',
            lastEdit : Date.now(),
            count : 2
        }],
        lastEdit : Date.now()
    }

]

export default data