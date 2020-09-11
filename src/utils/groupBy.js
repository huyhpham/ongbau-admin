import moment from 'moment';

export const groups = (() => {
    const byMonth = (item) => moment(item.date).format('MMM YYYY');
    const forWeek = (item) => byMonth(item) + ' ' + moment(item.date).format('ww');
    return {
        byMonth,
        forWeek
    };
})();

export const groupBy = (data) => {
    data.map(item => {
        item.month = moment(item.date).format('M');
        item.year = moment(item.date).format('YYYY');
    }) //Add month & year for structure

    var groupYear = data.reduce((newData, item) => {
        newData[item.year] = [...newData[item.year] || [], item];
        return newData;
    }, {}); // Group year

    var formatDataTwice = [];
    Object.keys(groupYear).forEach(key => {
        let value = groupYear[key];
        let tempData = {
            year: key,
            data: value
        }
        formatDataTwice.push(tempData);
    });

    formatDataTwice.map(groups => {
        var groupDataMonth = groups.data.reduce((newData, item) => {
            newData[item.month] = [...newData[item.month] || [], item];
            return newData;
        }, {});

        var formatData3 = [];
        Object.keys(groupDataMonth).forEach(key => {
            let value = groupDataMonth[key];
            let tempData = {
                month: key,
                data: value
            }
            formatData3.push(tempData);
        });
        groups.data = formatData3
    });

    formatDataTwice.map(groups => {
        for(let i = 0; i < groups.data.length; i++) {
            var groupDataWeek = groups.data[i].data.reduce((newData, item) => {
                newData[item.week] = [...newData[item.week] || [], item];
                return newData;
            }, {});

            var formatData4 = [];
            Object.keys(groupDataWeek).forEach(key => {
                let value = groupDataWeek[key];
                let tempData = {
                    week: key,
                    data: value
                }
                formatData4.push(tempData);
            });
            groups.data[i].data = formatData4;
        }
    });

    return formatDataTwice;
}

export const getWeekOfMonth = (date) => {

    var d = new Date(date);
    var date = d.getDate();
    var day = d.getDay();
    
    return Math.ceil((date + 6 - day)/7);
}