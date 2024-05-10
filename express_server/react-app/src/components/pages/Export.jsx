import React, { Component, PropTypes } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jsPDF";
import family from "../assets/family.jpg";
import goodImage from "../assets/certificate_good.jpeg";  

// download html2canvas and jsPDF and save the files in app/ext, or somewhere else
// the built versions are directly consumable
// import {html2canvas, jsPDF} from 'app/ext';

export default class Export extends Component {
  constructor(props) {
    super(props);
  }

  // printDocument() {
  //   const input = document.getElementById("divToPrint");
  //   html2canvas(input).then((canvas) => {
  //     const imgData = canvas.toDataURL("image/png");
  //     const pdf = new jsPDF();
  //     pdf.addImage(imgData, "JPEG", 0, 0);
  //     // pdf.output('dataurlnewwindow');
  //     pdf.save("download.pdf");
  //   });
  // }
  printDocument() {
    const pdf = new jsPDF({
      orientation: "landscape",  // 可以根据图片的宽高比选择适当的方向
    });
  
    // 获取图片的尺寸，根据需要调整下面的addImage参数
    var img = new Image();
    img.onload = () => {
      const imgWidth = img.naturalWidth;
      const imgHeight = img.naturalHeight;
      const width = pdf.internal.pageSize.getWidth();
      const height = pdf.internal.pageSize.getHeight();
      const ratio = Math.min(width / imgWidth, height / imgHeight);
      const newWidth = imgWidth * ratio;
      const newHeight = imgHeight * ratio;
  
      pdf.addImage(goodImage, 'JPEG', 0, 0, newWidth, newHeight);
      pdf.save("download.pdf");
    };
    img.src = goodImage;
  }
  
  render() {
    return (
      <div className="pt-24">
      <button className="text-black" onClick={this.printDocument}>
        Print PDF
      </button>
    </div>
   
      // {/* <div className="p-36">
      //   <div className="mb5">
      //     <button className="text-black" onClick={this.printDocument}>
      //       Print
      //     </button>
      //   </div>
      //   <div
      //     id="divToPrint"
      //     className="mt4"
      //     style={{
      //       backgroundColor: "#f5f5f5",
      //       width: "210mm",
      //       minHeight: "297mm",
      //       marginLeft: "auto",
      //       marginRight: "auto",
      //     }}
      //   >
      //     <div>Note: Here the dimensions of div are same as A4</div>
      //     <div>You Can add any component here</div>
      //   </div>
      // </div> */}
    );
  }
}
