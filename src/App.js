import React, { useState, useEffect}  from 'react';
import BillboardChart from 'react-billboardjs';
import 'billboard.js/dist/billboard.css';
import axios from "axios";

function App() {
  const [data, setData] = useState([]);

  const onClick = function() {
    console.log('onClick')
    fetchData();
  }

  async function fetchData() {
    const result = await axios('data/cells.json');
    setData(result.data)
  }

  useEffect(() => {
    fetchData();
  },[])

  return (
    <div style={{ flex:1,display:'flex',flexDirection:'column',border:'1px solid blue',textAlign:'center',boxSizing:'border-box' }}>  
      <div style={{marginTop:30}}>Each cell has a line graph that has 5 points with values 0-5</div>
      <div style={{marginTop:0}}>if first point is greater than last, color is red</div>
      <div style={{marginTop:0}}>if first point is less than last, color is green</div>
      <div style={{marginTop:0}}>if first point is equal to last, color is gray</div>
      <div style={{marginTop:0}}>v2022-02-12-a</div>
      <div style={{marginTop:10}}>
        <button style={{width:150}} onClick={onClick}>fetch random data</button>
      </div>
      <div className='root' style={{display:'flex',flexDirection:'column',margin:50,alignItems:'center',justifyContent:'center'}}>
        {data.map((row,i)=> {
          var cols = row.map((col,i2)=>{
            var xwidth = 50
            var xmargin = 3
            var xitems = 5
            var scalewidth = xwidth - xmargin - xmargin
            var itemwidth = scalewidth/(xitems-1)
            var widthArray = [
              xwidth - (itemwidth * 4),
              xwidth - (itemwidth * 3),
              xwidth - (itemwidth * 2),
              xwidth - (itemwidth * 1),
              xwidth - (itemwidth * 0) - xmargin
            ]

            var height = 30
            var ymargin = 3
            var yitems = 6
            var scaleheight = height - ymargin - ymargin
            var itemheight = scaleheight/(yitems-1)
            var heightArray = [
              height - (itemheight * 0) - ymargin,
              height - (itemheight * 1),
              height - (itemheight * 2),
              height - (itemheight * 3),
              height - (itemheight * 4),
              height - (itemheight * 5)     
            ]

            function getRandomInt(min, max) {
              min = Math.ceil(min);
              max = Math.floor(max);
              return Math.floor(Math.random() * (max - min + 1)) + min;
            }
            var max = 5
            var min = 0
            col = [
              getRandomInt(min,max),
              getRandomInt(min,max),
              getRandomInt(min,max),
              getRandomInt(min,max),
              getRandomInt(min,max)
            ]

            var backgroundcolor = 'gray'
            if (col[0] < col[4]) {
              backgroundcolor = 'green'
            }
            if (col[0] > col[4]) {
              backgroundcolor = 'red'
            }
            var points = `
            ${widthArray[0]},${heightArray[col[0]]}
            ${widthArray[1]},${heightArray[col[1]]}
            ${widthArray[2]},${heightArray[col[2]]}
            ${widthArray[3]},${heightArray[col[3]]}
            ${widthArray[4]},${heightArray[col[4]]}
            `
            return <svg key={i2} width="50" height="30">
              <g transform="translate(0,0)">
                <rect stroke={'white'} x={0} y={0} width={50} height={30} style={{fill:backgroundcolor,strokeWidth:'1',fillOpacity:'1.0',strokeOpacity:1.0}}></rect>
                <polyline points={points} fill="none" stroke="white" strokeWidth="2"/>
              </g>
            </svg>
          })
          return <div key={i} style={{display:'flex',flexDirection:'row'}}>{cols}</div>
        })}
      </div>
    </div>
  );
}

export default App;
