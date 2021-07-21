import { SearchOutlined } from '@ant-design/icons';
import { Button, Input, message, Space, Table } from 'antd'
import axios from 'axios'
import React from 'react'
import Highlighter from 'react-highlight-words';

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

    async componentDidMount() {

        await axios.get('https://city-mobil.ru/api/cars').then(v => {
            this.setState({
                dataSource: v.data.cars.map((v, i) => {
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
                    data.key = i;
                    return data;
                })
            })
        })
    }

    getColumnSearchProps = dataIndex => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div style={{ padding: 8 }}>
                <Input
                    ref={node => {
                        this.searchInput = node;
                    }}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{ marginBottom: 8, display: 'block' }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Search
                    </Button>
                    <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
                        Reset
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({ closeDropdown: false });
                            this.setState({
                                searchText: selectedKeys[0],
                                searchedColumn: dataIndex,
                            });
                        }}
                    >
                        Filter
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
        onFilter: (value, record) =>
            record[dataIndex]
                ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
                : '',
        onFilterDropdownVisibleChange: visible => {
            if (visible) {
                setTimeout(() => this.searchInput.select(), 100);
            }
        },
        render: text =>
            this.state.searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                    searchWords={[this.state.searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });

    handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        this.setState({
            searchText: selectedKeys[0],
            searchedColumn: dataIndex,
        });
    };

    handleReset = clearFilters => {
        clearFilters();
        this.setState({ searchText: '' });
    };

    render() {
        let { sortedInfo, filteredInfo } = this.state;
        sortedInfo = sortedInfo || {};
        filteredInfo = filteredInfo || {};

        const columns = [
            {
                title: 'Марка и модель',
                dataIndex: 'mark',
                key: 'mark',
                filteredValue: filteredInfo.name || null,
                onFilter: (value, record) => record.mark.includes(value),
                sorter: (a, b) => {
                    let nameA = a.mark.toUpperCase();
                    let nameB = b.mark.toUpperCase();
                    if (nameA < nameB) {
                        return -1;
                    }
                    if (nameA > nameB) {
                        return 1;
                    }

                    return 0;
                },
                sortOrder: sortedInfo.columnKey === 'mark' && sortedInfo.order,
                ellipsis: true,
                ...this.getColumnSearchProps('mark')
            },
            {
                title: 'Эконом',
                dataIndex: 'eco',
                key: 'eco',
                filteredValue: filteredInfo.name || null,
                onFilter: (value, record) => record.eco.includes(value),
                sorter: (a, b) => {
                    if (a.eco === '-') return -1
                    if (b.eco === '-') return 1
                    return a.eco - b.eco
                },
                sortOrder: sortedInfo.columnKey === 'eco' && sortedInfo.order,
                ellipsis: true,
                ...this.getColumnSearchProps('eco'),
                render: (text, record) => (
                    <Space size="middle" onClick={() => { if (record.eco !== '-') message.info('Выбран автомобиль ' + record.mark + ' ' + record.eco + " года ввыпуска") }}>
                        {record.eco}
                    </Space>
                )
            },
            {
                title: 'Комфорт',
                dataIndex: 'com',
                key: 'com',
                filteredValue: filteredInfo.name || null,
                onFilter: (value, record) => record.com.includes(value),
                sorter: (a, b) => {
                    if (a.com === '-') return -1
                    if (b.com === '-') return 1
                    return a.com - b.com
                },
                sortOrder: sortedInfo.columnKey === 'com' && sortedInfo.order,
                ellipsis: true,
                ...this.getColumnSearchProps('com'),
                render: (text, record) => (
                    <Space size="middle" onClick={() => { if (record.com !== '-') message.info('Выбран автомобиль ' + record.mark + ' ' + record.com + " года ввыпуска") }}>
                        {record.com}
                    </Space>
                ),
            },
            {
                title: 'Комфорт+',
                dataIndex: 'com1',
                key: 'com1',
                filteredValue: filteredInfo.com1 || null,
                onFilter: (value, record) => record.com1.includes(value),
                sorter: (a, b) => {
                    if (a.com1 === '-') return -1
                    if (b.com1 === '-') return 1
                    return a.com1 - b.com1
                },
                sortOrder: sortedInfo.columnKey === 'com1' && sortedInfo.order,
                ellipsis: true,
                ...this.getColumnSearchProps('com1'),
                render: (text, record) => (
                    <Space size="middle" onClick={() => { if (record.com1 !== '-') message.info('Выбран автомобиль ' + record.mark + ' ' + record.com1 + " года ввыпуска") }}>
                        {record.com1}
                    </Space>
                ),
            },
            {
                title: 'Минивен',
                dataIndex: 'min',
                key: 'min',
                filteredValue: filteredInfo.min || null,
                onFilter: (value, record) => record.min.includes(value),
                sorter: (a, b) => {
                    if (a.min === '-') return -1
                    if (b.min === '-') return 1
                    return a.min - b.min
                },
                sortOrder: sortedInfo.columnKey === 'min' && sortedInfo.order,
                ellipsis: true,
                ...this.getColumnSearchProps('min'),
                render: (text, record) => (
                    <Space size="middle" onClick={() => { if (record.min !== '-') message.info('Выбран автомобиль ' + record.mark + ' ' + record.min + " года ввыпуска") }}>
                        {record.min}
                    </Space>
                ),
            },
            {
                title: 'Бизнес',
                dataIndex: 'bis',
                key: 'bis',
                filteredValue: filteredInfo.bis || null,
                onFilter: (value, record) => record.bis.includes(value),
                sorter: (a, b) => {
                    if (a.bis === '-') return -1
                    if (b.bis === '-') return 1
                    return a.bis - b.bis
                },
                sortOrder: sortedInfo.columnKey === 'bis' && sortedInfo.order,
                ellipsis: true,
                ...this.getColumnSearchProps('bis'),
                render: (text, record) => (
                    <Space size="middle" onClick={() => { if (record.bis !== '-') message.info('Выбран автомобиль ' + record.mark + ' ' + record.bis + " года ввыпуска") }}>
                        {record.bis}
                    </Space>
                ),
            }
        ];
        return (

            <Table columns={columns} dataSource={this.state.dataSource} onChange={this.handleChange}
                onRow={(record, rowIndex) => {
                    return {
                        onClick: event => { }, // click row
                        onDoubleClick: event => { }, // double click row
                        onContextMenu: event => { }, // right button click row
                        onMouseEnter: event => { }, // mouse enter row
                        onMouseLeave: event => { }, // mouse leave row
                    };
                }}
            />

        );
    }
}

export default CarsTable;