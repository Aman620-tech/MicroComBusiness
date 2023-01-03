/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */

import { button, Table } from 'antd';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';



const ViewProduct = () => {

// const [categories, setCategories] = useState([])

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: 'Age',
    dataIndex: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
  },
];
const data = [];
for (let i = 0; i < 46; i++) {
  data.push({
    key: i,
    name: `Edward King ${i}`,
    age: 32,
    address: `London, Park Lane no. ${i}`,
  });
}

  const BaseUrl = process.env.REACT_APP_BASEURL;
  const { businessId } = useParams()

  const [product, setProduct] = useState([])
  const [category, setCategory] = useState([])
  const [subCategory, setSubCategory] = useState([])
  const getBusinessData = async () => {
    const config =
      { headers: { "token": localStorage.getItem("token") } }

    const response = await axios.get(`${BaseUrl}/business/product/${businessId}`, config)
    // console.log(response.data)
    setProduct(response.data.shop)
  }
  useEffect(() => {
    getBusinessData()
  }, [])

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [loading, setLoading] = useState(false);
  const start = () => {
    setLoading(true);
    // ajax request after empty completing
    setTimeout(() => {
      setSelectedRowKeys([]);
      setLoading(false);
    }, 1000);
  };
  const onSelectChange = (newSelectedRowKeys) => {
    // console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const hasSelected = selectedRowKeys.length > 0;
  // =================Add Product =====================

  // const allCategory
  return (
    <div>
      <div
        style={{
          marginBottom: 16,
        }}
      >
        <button type="primary" onClick={start} disabled={!hasSelected} loading={loading}>
          Reload
        </button>
        <span
          style={{
            marginLeft: 8,
          }}
        >
          {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
        </span>
      </div>
      <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
    </div>
    // <>
    // </>
  );
};
export default ViewProduct;