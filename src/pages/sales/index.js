import Head from "next/head";
import { Box, Container } from "@mui/material";
import { DashboardLayout } from "../../components/dashboard-layout";
import { AddSales } from "src/components/sales/add-sales";
import dynamic from "next/dynamic";
import { useContext, useEffect } from "react";
import { Store } from "src/statesManagement/store/store";
import { getProduct } from "src/statesManagement/store/actions/product-action";
import { getStores } from "src/statesManagement/store/actions/store-outlet-action";
import { useRouter } from "next/router";
import { getTotalSales } from "src/statesManagement/store/actions/sales-action";

const DynamicComponentWithNoSSR = dynamic(() => import("src/components/navbar-branch-indicator"), {
  ssr: false,
});

const Sales = () => {
  const { dispatch, state } = useContext(Store);
  const router = useRouter();
  const { userInfo } = state;
  useEffect(() => {
    !userInfo && router.push("/auth");
    getTotalSales(dispatch);
  }, []);
  return (
    <>
      <Head>
        <title>Sales| Material Kit</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 2,
        }}
      >
        <DynamicComponentWithNoSSR />
        <Container maxWidth={true}>
          <AddSales />
        </Container>
      </Box>
    </>
  );
};

Sales.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Sales;
