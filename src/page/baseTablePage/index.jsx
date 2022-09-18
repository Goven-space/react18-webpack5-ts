import React, {useState, useEffect, useRef, } from 'react'
import {Table} from 'antd'
import {tableSourceData} from '@mock/';

function BaseTablePage(props){
    const [dataSource, setDataSource] = useState([])

    useEffect(() => {
        setDataSource(tableSourceData)   
    },[])

    return (
        <Table 
            dataSource={dataSource}
        />
    )
}

export default BaseTablePage;