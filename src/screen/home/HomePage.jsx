import React from 'react';
import NavBar from './nav-bar/NavBar';
import Menu from '../../components/menu/Menu';
import Carousel from './carousel/Carousel';
import Footer from '../../components/footer/Footer';
import Grid from '@material-ui/core/Grid';
import {
  Home,
  People,
  DirectionsBike,
  LocationOn,
  Build,
  LocalShipping
} from '@material-ui/icons';
import Products from '../../components/products/Products';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';

function HomePage () {
  return (
    <div>
      <NavBar />
      <Menu
            menuItems={[
              {
                name: "Trang chủ",
                icon: <Home />
              },
              {
                name: "Về VHBike",
                icon: <People />
              },
              {
                name: "Sản phẩm",
                icon: <DirectionsBike />
              },
              {
                name: "Hệ thống đại lý",
                icon: <LocationOn />
              },
              {
                name: "Bảo hành",
                icon: <Build />
              },
              {
                name: "Vận chuyển",
                icon: <LocalShipping />
              },
            ]}
          />
      <Grid container spacing={0}>
        <Grid item md={2}></Grid>
        <Grid item md={8} style={{ display: "flex", flexDirection:"column" }}>
          
          <Carousel />
          <Menu
            menuItems={[
              {
                name: "Tư vấn nhiệt tình",
                icon: <Home />
              },
              {
                name: "Bảo hành tận tâm",
                icon: <People />
              },
              {
                name: "Giao hàng theo lịch hẹn",
                icon: <DirectionsBike />
              },
              {
                name: "Trả góp lãi suất 0%",
                icon: <LocationOn />
              },
            ]}
          />
          <Products
            tagName="Sản phẩm bán chạy"
            menuItems={[
              {
                name: "XE ĐẠP",
                icon: "",
              },
              {
                name: "XE ĐIỆN",
                icon: "",
              },
              {
                name: "PHỤ KIỆN",
                icon: "",
              }
            ]}
            products={[1, 2, 3, 4, 5, 6]}
          />
          <Products
            tagName="Sản phẩm bán chạy"
            menuItems={[
              {
                name: "XE ĐẠP",
                icon: "",
              },
              {
                name: "XE ĐIỆN",
                icon: "",
              },
              {
                name: "PHỤ KIỆN",
                icon: "",
              }
            ]}
            products={[1, 2, 3, 4, 5, 6]}
          />
          <Products
            tagName="Sản phẩm bán chạy"
            menuItems={[
              {
                name: "XE ĐẠP",
                icon: "",
              },
              {
                name: "XE ĐIỆN",
                icon: "",
              },
              {
                name: "PHỤ KIỆN",
                icon: "",
              }
            ]}
            products={[1, 2, 3, 4, 5, 6]}
          />
          <Products
            tagName="Sản phẩm bán chạy"
            menuItems={[
              {
                name: "XE ĐẠP",
                icon: "",
              },
              {
                name: "XE ĐIỆN",
                icon: "",
              },
              {
                name: "PHỤ KIỆN",
                icon: "",
              }
            ]}
            products={[1, 2, 3, 4, 5, 6]}
          />
          <Products
            tagName="Sản phẩm bán chạy"
            menuItems={[
              {
                name: "XE ĐẠP",
                icon: "",
              },
              {
                name: "XE ĐIỆN",
                icon: "",
              },
              {
                name: "PHỤ KIỆN",
                icon: "",
              }
            ]}
            products={[1, 2, 3, 4, 5, 6]}
          />
          <Products
            tagName="Sản phẩm bán chạy"
            menuItems={[
              {
                name: "XE ĐẠP",
                icon: "",
              },
              {
                name: "XE ĐIỆN",
                icon: "",
              },
              {
                name: "PHỤ KIỆN",
                icon: "",
              }
            ]}
            products={[1, 2, 3, 4, 5, 6]}
          />
        </Grid>
        <Grid item md={2}></Grid>
        <Footer />
      </Grid>
    </div>
  );
}

export default HomePage;