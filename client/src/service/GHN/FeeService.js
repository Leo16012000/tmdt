import axios from "axios";

const config = {
  headers: {
    token: "69ace0ab-ac82-11eb-8be2-c21e19fc6803",
    ShopId:79749
  },
};
export const FeeService = {
  nameLink: 'https://online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/',
  //calculate fee
    calculateFee: async (values) => {
    const { data } = await axios.post(`${FeeService.nameLink}fee`,values,config);
    return data;
  } 
  ,};
