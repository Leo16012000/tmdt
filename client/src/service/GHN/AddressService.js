import axios from "axios";
const config = {
  headers: {
    token: "69ace0ab-ac82-11eb-8be2-c21e19fc6803",
  },
};
export const AddressService = {
  nameLink: 'https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/',
 
  //get province
    getProvince: async () => {
    const { data } = await axios.get(`${AddressService.nameLink}province`,config);
    return data;
    }, 
    getDistrict: async (province_id) => {
    const { data } = await axios.post(`${AddressService.nameLink}district`,{province_id},config);
    return data;
    },
    getWard: async (district_id) => {
      console.log(district_id);
    const { data } = await axios.post(`${AddressService.nameLink}ward?`,{district_id},config);
    return data;
    } 
  };
