const gridData = [
    {
        "Currency": "AUD", 
        "Amount": 1100.00,
    },
    {
        "Currency": "MYR", 
        "Amount": 899.00,
    },
    {
        "Currency": "GBP", 
        "Amount": 56000.00,
    },
    {
        "Currency": "EUR", 
        "Amount": 5388.00,
    }
]

let sortOrder = { Currency: true, Amount: true };

// Fetch table header
function getTH() 
{
    const column = Object.keys(gridData[0]);
    const head = document.querySelector('thead');
    
    let content = "<tr>";
    column.forEach((col) => {
        content += `<th class="tableHeader" onclick="sortTableByColumn('${col}', this)">${col}</th>`;
    });
    content += "</tr>"

    head.innerHTML = content;

    getTD();
}

// Fetch table data
function getTD() 
{
    const body = document.querySelector('tbody');
    
    let content = "";
    gridData.forEach(d => {
        content += `<tr>
                <td>${d.Currency}</td>
                <td>${d.Amount.toFixed(2)}</td>
                </tr>`
    })

    body.innerHTML = content;
}

// Sorting
function sortTableByColumn(column, thElement)
{
    const direction = sortOrder[column] ? 1 : -1;

    gridData.sort((a, b) => {
        if (typeof a[column] === 'string'){
            return a[column].localeCompare(b[column]) * direction;
        }
        else if (typeof a[column] === 'number'){
            return (a[column] - b[column]) * direction;
        }
    });

    sortOrder[column] = !sortOrder[column];
    updateTHClass(thElement, column);
    getTD(); 
}

// Add class for icon display
function updateTHClass(thElement, column){
    const allHeaders = document.querySelectorAll('th');
    allHeaders.forEach(th => th.classList.remove('th-sort-asc', 'th-sort-desc'));

    if (sortOrder[column]){
        thElement.classList.add('th-sort-asc');
    }
    else{
        thElement.classList.add('th-sort-desc');
    }
}
