import react,{useState, useRef, useEffect, useImperativeHandle, forwardRef } from 'react';
import {tableDataSource} from '@mock/';
import {Table} from 'antd';

function BaseTablePage(props){
    const [dataSource, setDataSource] = useState([])

    useEffect(() => {
        setDataSource(tableDataSource);
    },[props])


    return (
        <Table
            dataSource={dataSource}
        />
    )

}

export default BaseTablePage