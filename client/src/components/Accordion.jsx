import React from 'react';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import '../styles/Accordion.css'
import { useDispatch } from "react-redux";
import { priceFilter , categoryFilter } from "../redux/action";


export default function SimpleAccordion() {

  const dispatch = useDispatch();
	
	function handleFilter(filter){
		dispatch(filter);
	}

  return (
    <div className="Accordion">
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          
        >
          <Typography id="Heading">Khoảng giá</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <ul className="List">
              <li>
                <input type="radio" onChange={() => handleFilter(priceFilter(0,0))} className="Option" name="price"/> Tất cả
              </li>
              <li>
                <input type="radio" onChange={() => handleFilter(priceFilter(0,2000000))} className="Option" name="price"/> Nhỏ hơn 2,000,000đ
              </li>
              <li>
                <input type="radio" onChange={() => handleFilter(priceFilter(2000000,5000000))} className="Option" name="price"/> Từ 2,000,000đ - 5,000,000đ
              </li>
              <li>
                <input type="radio" onChange={() => handleFilter(priceFilter(5000000,10000000))} className="Option" name="price"/> Từ 5,000,000đ - 10,000,000đ
              </li>
              <li>
                <input type="radio" onChange={() => handleFilter(priceFilter(10000000,20000000))} className="Option" name="price"/> Từ 10,000,000đ - 20,000,000đ
              </li>
              <li>
                <input type="radio" onChange={() => handleFilter(priceFilter(20000000,30000000))} className="Option" name="price"/> Từ 20,000,000đ - 30,000,000đ
              </li>
              <li>
                <input type="radio" onChange={() => handleFilter(priceFilter(30000000,100000000))} className="Option" name="price"/> Lớn hơn 30,000,000đ
              </li>
          </ul>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          
        >
          <Typography id="Heading">Loại sản phẩm</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <ul className="List">
              <li>
                <input type="radio" onChange={() => handleFilter(categoryFilter('all'))} className="Option" name="type"/> Tất cả
              </li>
              <li>
                <input type="radio" onChange={() => handleFilter(categoryFilter('bàn'))} className="Option" name="type"/> Bàn
              </li>
              <li>
                <input type="radio" onChange={() => handleFilter(categoryFilter('giá'))} className="Option" name="type"/> Giá
              </li>
              <li>
                <input type="radio" onChange={() => handleFilter(categoryFilter('giường'))} className="Option" name="type"/> Giường
              </li>
              <li>
                <input type="radio" onChange={() => handleFilter(categoryFilter('gối'))} className="Option" name="type"/> Gối
              </li>
              <li>
                <input type="radio" onChange={() => handleFilter(categoryFilter('kệ'))} className="Option" name="type"/> Kệ
              </li>
              <li>
                <input type="radio" onChange={() => handleFilter(categoryFilter('tủ'))} className="Option" name="type"/> Tủ
              </li>
          </ul>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}