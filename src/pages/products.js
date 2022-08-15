import Head from 'next/head';
import { Box, Container, Grid, Pagination } from '@mui/material';
import { products } from '../__mocks__/products';
import { ProductListToolbar } from '../components/product/product-list-toolbar';
import { ProductCard } from '../components/product/product-card';
import { DashboardLayout } from '../components/dashboard-layout';

const Products = () => (
  <>import Head from "next/head";
import { Box, Container, Grid, Pagination } from "@mui/material";
import { products } from "../__mocks__/products";
import { ProductListToolbar } from "../components/product/product-list-toolbar";
import { ProductCard } from "../components/product/product-card";
import { DashboardLayout } from "../components/dashboard-layout";
import { useState, useEffect } from "react";
import MUIDataTable from "mui-datatables";



import queryString from "query-string";

import axios from "axios";
import { useRouter } from "next/router";

const Products = () => {
  const [groups, setGroups] = useState([]);
  const [columns, setColumns] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  // const [test, setTest] = useState(false);

  const editRow = {
    name: "Edit",
    options: {
      filter: true,
      sort: false,
      empty: true,
      customBodyRender: (value, tableMeta, updateValue) => {
        return (
          <button varient="primary"
            onClick={() =>
              window.alert(`Clicked "Edit" for row ${tableMeta.tableData[tableMeta.rowIndex]}`)
            }
          >
            Edit
          </button>
        );
      },
    },
  };
  const deleteRow={ 
    name: "Delete",
  options: {
    filter: true,
    sort: false,
    empty: true,
    customBodyRender: (value, tableMeta, updateValue) => {
      return (
        <button onClick={() => {

          // onRowsDelete(selectedRows)
          
          const { data } = selectedRows;
          data.shift();
          setSelectedRows({ data });
        }}>
          Delete
        </button>
      );
    }
  }
}

  const router = useRouter();
  console.log(router.query); //get the query parameters

  // console.log("Window Location:", window.location.search);
  const myKeysValues = router.query;
  // // console.log('keys & values:',myKeysValues);
  const urlParams = new URLSearchParams(myKeysValues);
  const param1 = urlParams.get("type");
  // console.log("type:",param1);

  const url = "http://194.233.92.71/mFinance/GetGeneralDetails";

  const { query } = useRouter();
  console.log(query.search);

  const getData = () => {
    axios
      .post(url, { conditionstring: param1, parameterlist: [] })

      .then((response) => {
        const data = response.data;
        // console.log(data.resultsets)
        let obj = JSON.parse(data.resultsets);
        setGroups(obj);
        const newArray = Object.keys(obj[0]).slice(); // Create a copy
        console.log(newArray);
        newArray.push(editRow,deleteRow);
        console.log(newArray);
        // const customCol=[editRow,Object.keys(obj[0])];
        // setColumns(Object.keys(obj[0]));
        setColumns(newArray);
        // setTitle( data.menuName)
      });
  };

  useEffect(() => {
    getData();
  }, [param1]);

  return (
    <div>
      {/* <ProductListToolbar /> */}

      <MUIDataTable
        className="data-table"
        title={param1}
        data={groups}
        columns={columns}
        options={{
          selectableRows: false, // <===== will turn off checkboxes in rows
        }}
      />
    </div>
  );
};

Products.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Products;

    <Head>
      <title>
        Products | Material Kit
      </title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8
      }}
    >
      <Container maxWidth={false}>
        <ProductListToolbar />
        <Box sx={{ pt: 3 }}>
          <Grid
            container
            spacing={3}
          >
            {products.map((product) => (
              <Grid
                item
                key={product.id}
                lg={4}
                md={6}
                xs={12}
              >
                <ProductCard product={product} />
              </Grid>
            ))}
          </Grid>
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            pt: 3
          }}
        >
          <Pagination
            color="primary"
            count={3}
            size="small"
          />
        </Box>
      </Container>
    </Box>
  </>
);

Products.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Products;
