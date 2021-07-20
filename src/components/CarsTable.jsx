import { Button, Space, Table } from 'antd'
import axios from 'axios'
import React from 'react'
// import {carsData} from '../App'






class CarsTable extends React.Component {
    state = {
        filteredInfo: null,
        sortedInfo: null,
        dataSource: null,
    };

    handleChange = (pagination, filters, sorter) => {
        console.log('Various parameters', pagination, filters, sorter);
        this.setState({
            filteredInfo: filters,
            sortedInfo: sorter,
        });
    };

    async componentWillMount() {

        await axios.get('https://city-mobil.ru/api/cars').then(v => {
            // carsData = v.data;
            this.setState({
                dataSource: v.data.cars.map(v => {
                    let data = {
                        mark: v.mark + " " + v.model
                    }
                    if (typeof v.tariffs.Эконом !== 'undefined')
                        data.eco = v.tariffs.Эконом.year
                    else data.eco = '-'

                    if (typeof v.tariffs.Комфорт !== 'undefined')
                        data.com = v.tariffs.Комфорт.year
                    else data.com = '-'

                    if (typeof v.tariffs.Минивен !== 'undefined')
                        data.min = v.tariffs.Минивен.year
                    else data.min = '-'

                    if (typeof v.tariffs.Бизнес !== 'undefined')
                        data.bis = v.tariffs.Бизнес.year
                    else data.bis = '-'
                    data.com1 = '-'
                    return data;
                })
            })
        })
        // console.log('carsData--' + carsData)
    }

    render() {
        let { sortedInfo, filteredInfo } = this.state;
        sortedInfo = sortedInfo || {};
        filteredInfo = filteredInfo || {};

        // let dataSource;

        // let carsData;

        const columns = [
            {
                title: 'Марка и модель',
                dataIndex: 'mark',
                key: 'mark',
                filteredValue: filteredInfo.name || null,
                onFilter: (value, record) => record.mark.includes(value),
                sorter: (a, b) => a.mark > b.mark,
                sortOrder: sortedInfo.columnKey === 'mark' && sortedInfo.order,
                ellipsis: true,
            },
            {
                title: 'Эконом',
                dataIndex: 'eco',
                key: 'eco',
                filteredValue: filteredInfo.name || null,
                onFilter: (value, record) => record.eco.includes(value),
                sorter: (a, b) => a.eco - b.eco,
                sortOrder: sortedInfo.columnKey === 'eco' && sortedInfo.order,
                ellipsis: true,
            },
            {
                title: 'Комфорт',
                dataIndex: 'com',
                key: 'com',
                filteredValue: filteredInfo.name || null,
                onFilter: (value, record) => record.com.includes(value),
                sorter: (a, b) => a.com - b.com,
                sortOrder: sortedInfo.columnKey === 'com' && sortedInfo.order,
                ellipsis: true,
            },
            {
                title: 'Комфорт+',
                dataIndex: 'com1',
                key: 'com1',
                filteredValue: filteredInfo.com1 || null,
                onFilter: (value, record) => record.com1.includes(value),
                sorter: (a, b) => a.com1 - b.com1,
                sortOrder: sortedInfo.columnKey === 'com1' && sortedInfo.order,
                ellipsis: true,
            },
            {
                title: 'Минивен',
                dataIndex: 'min',
                key: 'min',
                filteredValue: filteredInfo.min || null,
                onFilter: (value, record) => record.min.includes(value),
                sorter: (a, b) => a.min - b.min,
                sortOrder: sortedInfo.columnKey === 'min' && sortedInfo.order,
                ellipsis: true,
            },
            {
                title: 'Бизнес',
                dataIndex: 'bis',
                key: 'bis',
                filteredValue: filteredInfo.bis || null,
                onFilter: (value, record) => record.bis.includes(value),
                sorter: (a, b) => a.bis - b.bis,
                sortOrder: sortedInfo.columnKey === 'bis' && sortedInfo.order,
                ellipsis: true,
            }
        ];
        return (

            <Table columns={columns} dataSource={this.state.dataSource} onChange={this.handleChange} />

        );
    }
}

export default CarsTable;