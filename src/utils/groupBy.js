import moment from 'moment';

export const groups = (() => {
    const byMonth = (item) => moment(item.date).format('MMM YYYY');
    return {
        byMonth,
    };
})();

export const groupBy = (data) => {
    data.map(item => {
        var newDate = new Date(item.date);
        item.month = newDate.getMonth();
        item.year = newDate.getFullYear();
    }) //Add month & year for structure

    var groupYear = data.reduce((newData, item) => {
        newData[item.year] = [...newData[item.year] || [], item];
        return newData;
    }, {}); // Group year

    var formatData = [];
    Object.keys(groupYear).forEach(key => {
        let value = groupYear[key];
        let tempData = {
            year: key,
            data: value
        }
        formatData.push(tempData)
    }) // format structure data

    formatData.map(groups => {
        var groupDataMonth = groups.data.reduce((newData, item) => {
            newData[item.month] = [...newData[item.month] || [], item];
            return newData;
        }, {});
        groups.data = groupDataMonth // convert key - value
    });

    return formatData;
}