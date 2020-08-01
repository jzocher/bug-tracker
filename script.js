$(document).ready(function() {
    $(".search").keyup(function () {
        var searchTerm = $(".search").val();
        var listItem = $('.results tbody').children('tr');
        var searchSplit = searchTerm.replace(/ /g, "'):containsi('")
        
        $.extend($.expr[':'], {'containsi': function(elem, i, match, array){
            return (elem.textContent || elem.innerText || '').toLowerCase().indexOf((match[3] || "").toLowerCase()) >= 0;
        }
        });
        
        $(".results tbody tr").not(":containsi('" + searchSplit + "')").each(function(e){
            $(this).attr('visible','false');
        });
    
        $(".results tbody tr:containsi('" + searchSplit + "')").each(function(e){
            $(this).attr('visible','true');
        });
    
        var jobCount = $('.results tbody tr[visible="true"]').length;
            $('.counter').text(jobCount + ' results');
    
        if(jobCount == '0') {
            $('.no-result').show();
        }
        else {$('.no-result').hide();
        }
    });
});

//Table sorting
function sortTableByColumn(table, column, asc = true) {
    const dirModifier = asc ? 1 : -1;
    const tBody = table.tBodies[0];
    const rows = Array.from(tBody.querySelectorAll("tr"));

    //sort rows
    const sortedRows = rows.sort((a, b) => {
        const aColText = a.querySelector(`td:nth-child(${ column + 1})`).textContent.trim();
        const bColText = b.querySelector(`td:nth-child(${ column + 1})`).textContent.trim();

        return aColText > bColText ? (1 * dirModifier) : (-1 * dirModifier);
    });

    //Remove all existing trs
    while (tBody.firstChild) {
        tBody.removeChild(tBody.firstChild);
    }

    //Readd sorted rows
    tBody.append(...sortedRows);

    //Remember current sorting
    //Clear any existing sorting class
    table.querySelectorAll("th").forEach(th => th.classList.remove("th-sort-asc", "th-sort-desc"));
    //Add sorting class based on current 
    table.querySelector(`th:nth-child(${ column + 1})`).classList.toggle("th-sort-asc", asc);
    table.querySelector(`th:nth-child(${ column + 1})`).classList.toggle("th-sort-desc", !asc);
}

document.querySelectorAll(".table-sortable th").forEach(headerCell => {
    headerCell.addEventListener("click", () => {
        const tableElement = headerCell.parentElement.parentElement.parentElement; //References table tag (th ^ tr ^ tBody ^ table)
        const headerIndex = Array.prototype.indexOf.call(headerCell.parentElement.children, headerCell); // Calls indexOf on each child of header
        const currentIsAscending = headerCell.classList.contains("th-sort-asc"); //Table is ascending if it has the 'th-sort-asc' class

        sortTableByColumn(tableElement, headerIndex, !currentIsAscending);
    });
});