function maxPage(pages, pageCount) {
    return Math.ceil(pages / pageCount);
}

for (let i = 0; i < 60; i++) {
    console.log(i, maxPage(i, 10));
}
