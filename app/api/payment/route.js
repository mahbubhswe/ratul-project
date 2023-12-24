import SSLCommerzPayment from "sslcommerz-lts";
import nextConnect from "next-connect";
const store_id = "mahbu6228481a4b946";
const store_passwd = "mahbu6228481a4b946@ssl";
const is_live = false; //true for live, false for sandbox
export async function POST(req) {
  const data = {
    total_amount: req.body.totalPrice,
    currency: "BDT",
    orderInfo: req.body,
    tran_id: Math.floor(Math.random() * 100) + 10000,
    success_url: `${process.env.url}/sslres/order-confirmation`,
    fail_url: `${process.env.url}/sslres/order-fail`,
    cancel_url: `${process.env.url}/sslres/order-cancelation`,
    ipn_url: `${process.env.url}/sslres/ipn`,
    shipping_method: "Courier",
    product_name: "Computer.",
    product_category: "Electronic",
    product_profile: "general",
    cus_name: "Mahbub Hasan",
    cus_email: "customer@example.com",
    cus_add1: "Dhaka",
    cus_add2: "Dhaka",
    cus_city: "Dhaka",
    cus_state: "Dhaka",
    cus_postcode: "1000",
    cus_country: "Bangladesh",
    cus_phone: "01623218618",
    cus_fax: "01623218618",
    ship_name: "Customer Name",
    ship_add1: "Dhaka",
    ship_add2: "Dhaka",
    ship_city: "Dhaka",
    ship_state: "Dhaka",
    ship_postcode: 1000,
    ship_country: "Bangladesh",
  };
  const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);
  sslcz.init(data).then((apiResponse) => {
    let GatewayPageURL = apiResponse.GatewayPageURL;
    res.send(GatewayPageURL);
  });
}
