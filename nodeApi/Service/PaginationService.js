module.exports = {
    getRercord
}

async function getRercord(modal, query) {
    query = JSON.parse(query.query);
    let skipRecords = query.PageSize * (query.CurrentPage - 1);
    const pageWiseData = await modal.find({}, {}, { skip: skipRecords, limit: parseInt(query.PageSize) }).sort({ $natural: -1 });
    const totalData = await modal.find().count();
    return { data: pageWiseData, totalRecords: totalData, pageSize: query.PageSize, currentPage: query.CurrentPage };
}

