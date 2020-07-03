import React, { Component } from 'react';
import context from '../context';
import Filter from '../Filter/Filter';
import { Table, Thead, Tr, Td, Th } from 'reactable';
import { useTable } from 'react-table';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faAngleDoubleDown } from '@fortawesome/free-solid-svg-icons';
// import { faAngleDoubleUp } from '@fortawesome/free-solid-svg-icons';

export default class OrderHistory extends Component {
    static contextType = context;
    constructor(props) {
        super(props);
        this.state = {
            past_orders: [],
        }
    }

    componentDidMount() {
        this.setState({
            past_orders: this.context.past_orders
        })
    }

    createOrderTables() {
        return this.state.past_orders.map((lineItem, i) => {
            const { company, sku, quantity, inv_description, cust_order, sup_order, date_entered } = lineItem;

            let dateArr = date_entered.split('-');
            let date = [];
            date.push(dateArr[0])
            if (dateArr[1].length === 1) {
                date.push('0' + dateArr[1]);
            } else {
                date.push(dateArr[1])
            }
            if (dateArr[2].length === 1) {
                date.push('0' + dateArr[2]);
            } else {
                date.push(dateArr[2])
            }
            let fullDate = date.join('-');

            return (
                <Tr key={i}>
                    <Td column="Company" value={company}>{company}</Td>
                    <Td column="SKU" value={sku}>{sku}</Td>
                    <Td column="Quantity" value={quantity} >{quantity}</Td>
                    <Td column="Description" value={inv_description}>{inv_description}</Td>
                    <Td column="Customer PO" value={cust_order}>{cust_order}</Td>
                    <Td column="Supplier PO" value={sup_order}>{sup_order}</Td>
                    <Td column="Date Entered" value={fullDate}>{fullDate}</Td>
                </Tr>
            )
        })
    }

    createSmallOrderTable = () => {
        return this.state.past_orders.map((lineItem, i) => {
            const { company, sku, quantity, inv_description, cust_order, sup_order, date_entered } = lineItem;

            let dateArr = date_entered.split('-');
            let date = [];
            date.push(dateArr[0])
            if (dateArr[1].length === 1) {
                date.push('0' + dateArr[1]);
            } else {
                date.push(dateArr[1])
            }
            if (dateArr[2].length === 1) {
                date.push('0' + dateArr[2]);
            } else {
                date.push(dateArr[2])
            }
            let fullDate = date.join('-');

            return (
                <tr key={i}>
                    <td column="Data">
                        <p value={company}>Company: {company}</p>
                        <p value={sku}>SKU: {sku}</p>
                        <p value={quantity} >{quantity}</p>
                        <p value={inv_description}>Description: {inv_description}</p>
                        <p value={quantity}>Quantity: {quantity}</p>
                        <p value={cust_order}> Customer PO: {cust_order}</p>
                        <p value={sup_order}>Supplier PO:                  {sup_order}</p>
                        <p value={fullDate}>Date Entered: {fullDate}</p>
                    </td>
                </tr>
            )
        })
    }

    updateOrders = (orders) => {
        this.setState({
            past_orders: orders
        })
    }

    clearFilter = () => {
        this.setState({
            filter_choice: 'Choose one',
            filter_options: 'Choose one',
            filter: '',
            past_orders: this.context.past_orders,
        })
    }

    createReactTable=()=>{
        const data = React.useMemo(()=>this.context.past_orders);
        const columns = React.useMemo(()=>[
            {
                Header: 'Company',
                accessor: 'company'
            },
            {
                Header: 'SKU',
                accessor: 'sku'
            },
            {
                Header: 'Quantity',
                accessor: 'quantity'
            },
            {
                Header: 'Customer PO',
                accessor: 'cust_order'
            },
            {
                Header: 'Supplier PO',
                accessor: 'sup_order'
            },
            {
                Header: 'Date',
                accessor: 'date_entered'
            },
        ]);

        const {
            getTableProps,
            getTableBodyProps,
            headerGroups,
            rows,
            prepareRow,
        } = useTable({columns, data})

        this.setState({
            data: data,
            columns: columns,
            getTableProps,
            getTableBodyProps,
            headerGroups,
            rows,
            prepareRow,
        })

    }

    render() {
        this.createReactTable();


        return (
            <div className="component-div">
                <h2>Order History</h2>
                <p> Table of past orders: </p>
                <div className="options">
                    <Filter options={['company', 'sku', 'description', 'date_entered']} data={'orders'} handleUpdateOrders={this.updateOrders} handleClearFilter={this.clearFilter} />
                </div>
                <div className="table">
                    <p className="sort-text">*Sort by clicking column headers</p>
                    <p className="sort-text-small">*No sort capabilities with condensed table</p>
                    <div className="table-div">
                        <Table className="big-table" itemsPerPage={10} sortable={true} defaultSort={{ column: 'Date Entered', direction: 'desc' }} paginationtype={'simple'}>
                            <Thead className=".rt-head">
                                <Th column="Company" className=".rt-th">Company</Th>
                                <Th column="SKU" className=".rt-th">SKU</Th>
                                <Th column="Quantity" className=".rt-th">Quantity</Th>
                                <Th column="Description" className=".rt-th">Description</Th>
                                <Th column="Customer PO" className=".rt-th">Customer PO</Th>
                                <Th column="Supplier PO" className=".rt-th">Supplier PO</Th>
                                <Th column="Date Entered" className=".rt-th">Date Entered</Th>
                            </Thead>
                            {this.createOrderTables()}
                        </Table>

                        
                        <table {...this.state.getTableProps()}>
                            <thead>
                            {this.state.headerGroups.map(headerGroup => (
                                <tr {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map(column => (
                                    <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                                ))}
                                </tr>
                            ))}
                            </thead>
                            <tbody {...this.state.getTableBodyProps()}>
                            {this.state.rows.map(row => {
                                this.state.prepareRow(row)
                                return (
                                <tr {...row.getRowProps()}>
                                    {row.cells.map(cell => {
                                    return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                    })}
                                </tr>
                                )
                            })}
                            </tbody>
                        </table>



                        <table className="small-tables">
                            <tbody>
                                <tr>
                                    <th>Order History</th>
                                </tr>
                                {this.createSmallOrderTable()}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}

