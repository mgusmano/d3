import React, { useState, useEffect}  from 'react';
import axios from "axios";
import { SketchPicker, CompactPicker } from 'react-color'
import { SketchPresetColors } from 'react-color/lib/components/sketch/SketchPresetColors';

function App() {
  const [data, setData] = useState([]);
  const [xwidth, setXwidth] = useState(50);
  const [xmarginleft, setXmarginLeft] = useState(3);
  const [xmarginright, setXmarginRight] = useState(3);
  const [xitems, setXitems] = useState(4);
  const [yheight, setYheight] = useState(25);
  const [ymargintop, setYmarginTop] = useState(5);
  const [ymarginbottom, setYmarginBottom] = useState(3);
  const [yitems, setYitems] = useState(5);
  const [redcolor, setRedColor] = useState("#AD4040");
  const [greencolor, setGreenColor] = useState("#5E8040");
  const [nochangecolor, setNoChangeColor] = useState("gray");

  async function fetchData() {
    const result = await axios('data/cells.json');
    setData(result.data)
  }



  const onClick = function() {


    fetchData();
  }

  const onBigger = function() {
    setXwidth(100);
    setXmarginLeft(5);
    setXmarginRight(5);
    setXitems(4);
    setYheight(50);
    setYmarginTop(15);
    setYmarginBottom(2);
    setYitems(6);

    fetchData();
  }

  const onSmaller = function() {
    setXwidth(50);
    setXmarginLeft(3);
    setXmarginRight(3);
    setXitems(4);
    setYheight(25);
    setYmarginTop(0);
    setYmarginBottom(0);
    setYitems(5);

    fetchData();
  }

  useEffect(() => {
    setXwidth(70);
    setXmarginLeft(5);
    setXmarginRight(5);
    setXitems(4);
    setYheight(40);
    setYmarginTop(15);
    setYmarginBottom(2);
    setYitems(6);

    fetchData();
  },[])

  const onRedColorChange = function(color, event) {
    if (color !== null) {
      setRedColor(color.hex)
    }
  }

  const onGreenColorChange = function(color, event) {
    if (color !== null) {
      setGreenColor(color.hex)
    }
  }

  const onNoChangeColorChange = function(color, event) {
    if (color !== null) {
      setNoChangeColor(color.hex)
    }
  }

  return (
    <div style={{ flex:1,display:'flex',flexDirection:'column',border:'1px solid blue',textAlign:'center',boxSizing:'border-box' }}>  
      <div style={{marginTop:30}}>Each cell has a line graph that has 5 points with values 0-5</div>
      <div style={{marginTop:0}}>if first point is greater than last, color is red</div>
      <div style={{marginTop:0}}>if first point is less than last, color is green</div>
      <div style={{marginTop:0}}>if first point is equal to last, color is gray</div>
      <div style={{marginTop:0}}>v2022-02-13-b</div>
      <div style={{marginTop:10}}>
        <button style={{width:150}} onClick={onClick}>fetch random data</button>
        <button style={{width:150}} onClick={onBigger}>bigger</button>
        <button style={{width:150}} onClick={onSmaller}>smaller</button>
      </div>
      <div style={{margin:'20px 0 0 0',display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
        <div style={{display:'flex',flexDirection:'column',margin:'0 0 0 30px'}}><div>Red:</div><CompactPicker color={redcolor} onChange={onRedColorChange}/></div>
        <div style={{display:'flex',flexDirection:'column',margin:'0 0 0 30px'}}><div>Green:</div><CompactPicker color={greencolor} onChange={onGreenColorChange}/></div>
        <div style={{display:'flex',flexDirection:'column',margin:'0 0 0 30px'}}><div>No Change:</div><CompactPicker color={nochangecolor} onChange={onNoChangeColorChange}/></div>
      </div>
      <div className='root' style={{display:'flex',flexDirection:'column',margin:50,alignItems:'center',justifyContent:'center'}}>
        {data.map((row,i)=> {
          var cols = row.map((col,i2)=>{

            var scalewidth = xwidth - xmarginleft - xmarginright
            var itemwidth = scalewidth/(xitems-1)
            var widthArray = []
            // console.log(xwidth)
            // console.log(itemwidth)
            // console.log(xitems)
            // console.log(xmarginleft)
            // console.log(xmarginright)
            //widthArray.push(xwidth - (itemwidth * xitems-1) - xmargin)

            widthArray.push(xmarginleft)
            
            for (var x=xitems-2;x>0;x--) {
              widthArray.push(xwidth - (itemwidth * x))
            }
            widthArray.push(xwidth - (itemwidth * 0) - xmarginright)
            //console.log(widthArray)

            // setXwidth(70);
            // setXmarginLeft(3);
            // setXmarginRight(3);
            // setXitems(4);
            // setYheight(50);
            // setYmarginTop(10);
            // setYmarginBottom(0);
            // setYitems(6);

            var scaleheight = yheight - ymargintop - ymarginbottom
            var itemheight = scaleheight/(yitems-1)
            var heightArray = []
            //console.log(yheight)
            //console.log(ymargintop)
            heightArray.push(yheight-ymarginbottom)
            for (var y=1;y<yitems-1;y++) {
              heightArray.push(yheight - (itemheight * y))
            }
            heightArray.push(ymargintop)
            console.log('***')
            console.log(heightArray)

            function getRandomInt(min, max) {
              min = Math.ceil(min);
              max = Math.floor(max);
              return Math.floor(Math.random() * (max - min + 1)) + min;
            }
            var max = yitems - 1
            var min = 0

            col = []
            for (var x3=0;x3<xitems;x3++) { 
              col.push(getRandomInt(min,max))
            }

            var points = ''
            var t = []
            var t2 = []
            for (var x2=0;x2<xitems;x2++) {
             points = points + ` ${widthArray[x2]},${heightArray[col[x2]]}` 
             console.log(col[x2],heightArray[col[x2]])
             t.push(<text key={x2} x={(widthArray[x2])-3} y={(heightArray[col[x2]])-5} style={{fill:'white',fontSize:'10px'}}>{col[x2]}</text>)
             t2.push(<rect key={x2} stroke={'white'} x={widthArray[x2]-3} y={heightArray[col[x2]]-3} width="5" height="5" style={{fill:'black',strokeWidth:'1',fillOpacity:'1.0',strokeOpacity:1.0}}></rect>)
            }
            //t = t + </div>
            console.log(col)
            console.log(points)
            //console.log(t)

            var backgroundcolor = nochangecolor //'gray'
            if (col[0] < col[xitems-1]) {
              backgroundcolor = greencolor //'#097969' //'green'
            }
            if (col[0] > col[xitems-1]) {
              backgroundcolor = redcolor //'red'
            }

            return <svg key={i2} width={xwidth} height={yheight}>
              <g transform="translate(0,0)">
                <rect stroke={'white'} x={0} y={0} width={xwidth} height={yheight} style={{fill:backgroundcolor,strokeWidth:'1',fillOpacity:'1.0',strokeOpacity:1.0}}></rect>
                <polyline points={points} fill="none" stroke="white" strokeWidth="2"/>
                {xwidth > 50 && t}
                {xwidth > 50 && t2}
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
