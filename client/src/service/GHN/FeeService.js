import axios from "axios";

const config = {
  headers: {
    token: "69ace0ab-ac82-11eb-8be2-c21e19fc6803",
  },
};
export const FeeService = {
  nameLink: 'https://dev-online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/',
  //calculate fee
  calculateFee: async (values) => {
    console.log(values);
    const { data } = await axios.post(`${FeeService.nameLink}fee`,values,config);
    return data;
  } 
  ,};
