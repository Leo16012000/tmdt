import React from 'react';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import '../styles/Accordion.css'



export default function SimpleAccordion() {

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
                <input type="radio" onChange="" className="Option" name="price"/> Tất cả
              </li>
              <li>
                <input type="radio" onChange="" className="Option" name="price"/> Nhỏ hơn 30,000,000đ
              </li>
              <li>
                <input type="radio" onChange="" className="Option" name="price"/> Từ 2,000,000đ - 5,000,000đ
              </li>
              <li>
                <input type="radio" onChange="" className="Option" name="price"/> Từ 5,000,000đ - 10,000,000đ
              </li>
              <li>
                <input type="radio" onChange="" className="Option" name="price"/> Từ 10,000,000đ - 20,000,000đ
              </li>
              <li>
                <input type="radio" onChange="" className="Option" name="price"/> Từ 20,000,000đ - 30,000,000đ
              </li>
              <li>
                <input type="radio" onChange="" className="Option" name="price"/> Lớn hơn 30,000,000đ
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
          <Typography id="Heading">Thương hiệu</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <ul className="List">
              <li>
                <input type="radio" onChange="" className="Option" name="brand"/> Dongsuh Furniture
              </li>
              <li>
                <input type="radio" onChange="" className="Option" name="brand"/> Khác
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
                <input type="radio" onChange="" className="Option" name="type"/> Sofa
              </li>
              <li>
                <input type="radio" onChange="" className="Option" name="type"/> Kệ {"&"} tủ TV
              </li>
              <li>
                <input type="radio" onChange="" className="Option" name="type"/> Tủ trang trí
              </li>
              <li>
                <input type="radio" onChange="" className="Option" name="type"/> Kệ trang trí 
              </li>
              <li>
                <input type="radio" onChange="" className="Option" name="type"/> Bàn trà
              </li>
              <li>
                <input type="radio" onChange="" className="Option" name="type"/> Khác
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
          <Typography id="Heading">Vật liệu</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <ul className="List">
              <li>
                <input type="radio" onChange="" className="Option" name="material"/> Gỗ
              </li>
              <li>
              <input type="radio" onChange="" className="Option" name="material"/> MDF
              </li>
              <li>
              <input type="radio" onChange="" className="Option" name="material"/> MFC
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
          <Typography id="Heading">Kích cỡ</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <ul className="List">
              <li>
                <input type="radio" onChange="" className="Option" name="size"/> 1 người
              </li>
              <li>
                <input type="radio" onChange="" className="Option" name="size"/> 2 người
              </li>
              <li>
                <input type="radio" onChange="" className="Option" name="size"/> 3 người
              </li>
              <li>
                <input type="radio" onChange="" className="Option" name="size"/> 4 người
              </li>
          </ul>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}