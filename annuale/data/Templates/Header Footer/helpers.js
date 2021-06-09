
function getPageInfo (pages, index) {
    const group = pages[index].group
    
    let gstart = index
    while (gstart - 1 > -1 && pages[gstart - 1].group === group) {
        gstart--
    }

    let gend = index
    while ((gend + 1 < pages.length) && pages[gend + 1].group === group) {
        gend++
    }
           
    return (index - gstart + 1) + ' di ' + (gend - gstart + 1)
}


