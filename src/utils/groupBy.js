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
                let value = groupDataWeek[key].sort(function(a,b){
                    return new Date(b.date) - new Date(a.date);
                  });
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

export const groupByMonth = (data) => {
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
            let value = groupDataMonth[key].sort(function(a,b){
                return new Date(b.date) - new Date(a.date);
            });
            let tempData = {
                month: key,
                data: value
            }
            formatData3.push(tempData);
        });
        groups.data = formatData3
    });

    return formatDataTwice;
}

export const groupByYear = (data) => {
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

    return formatDataTwice;
}


export function mergeValueOfTheSameObject(array) {
    var output = [];
    array.forEach(function(item) {
        var existing = output.filter(function(v, i) {
            return v.employeeName == item.employeeName;
        });
        if (existing.length) {
            var existingIndex = output.indexOf(existing[0]);
            output[existingIndex].totalMoney = output[existingIndex].totalMoney.concat(item.totalMoney);
            output[existingIndex].holiday = output[existingIndex].holiday.concat(item.holiday);
            output[existingIndex].normalDay = output[existingIndex].normalDay.concat(item.normalDay);
            output[existingIndex].otherDay = output[existingIndex].otherDay.concat(item.otherDay);
            output[existingIndex].over8HoursDay = output[existingIndex].over8HoursDay.concat(item.over8HoursDay);
            output[existingIndex].weekendDay = output[existingIndex].weekendDay.concat(item.weekendDay);
            output[existingIndex].toDate = output[existingIndex].toDate.concat(item.toDate);
        } else {
            if (typeof item.totalMoney == 'string')
            item.totalMoney = [item.totalMoney];
            item.holiday = [item.holiday];
            item.normalDay = [item.normalDay];
            item.otherDay = [item.otherDay];
            item.over8HoursDay = [item.over8HoursDay];
            item.weekendDay = [item.weekendDay];
            item.toDate = [item.toDate];
            output.push(item);
        }
    });

    return output;
};

export const getWeekOfMonth = (date) => {

    var d = new Date(date);
    var date = d.getDate();
    var day = d.getDay();
    
    return Math.ceil((date + 6 - day)/7);
}