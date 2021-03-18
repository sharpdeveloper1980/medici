import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import {
    Card,
    CardBody
   } from 'reactstrap';
const List = (props) => {
    const customTotal = (from, to, size) => (
        <span className="react-bootstrap-table-pagination-total ml-2">
            Showing {from} to {to} of {size} Results
        </span>
    );
    const defaultSorted = [
        {
            dataField: 'category',
            order: 'asc',
        },
    ];
    const paginationOptions = {
        paginationSize: 5,
        pageStartIndex: 1,
        firstPageText: 'First',
        prePageText: 'Back',
        nextPageText: 'Next',
        lastPageText: 'Last',
        nextPageTitle: 'First page',
        prePageTitle: 'Pre page',
        firstPageTitle: 'Next page',
        lastPageTitle: 'Last page',
        showTotal: true,
        paginationTotalRenderer: customTotal,
        sizePerPageList: [
            {
                text: '5',
                value: 5,
            },
            {
                text: '10',
                value: 10,
            },
            {
                text: '25',
                value: 25,
            },
            {
                text: 'All',
                value: props.records.length,
            },
        ], // A numeric array is also available. the purpose of above example is custom the text
    };

    return (
        <Card>
        <CardBody>
            
                

                <BootstrapTable
                    bootstrap4
                    keyField="id"
                    data={props.records}
                    columns={props.columns}
                    defaultSorted={defaultSorted}
                    pagination={paginationFactory(paginationOptions)}
                    wrapperClasses="table-responsive"
                />
           
           
        </CardBody>
        </Card>
    );
};

export default List;