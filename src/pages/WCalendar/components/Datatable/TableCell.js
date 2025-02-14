import React from 'react';
import * as d3Timelines from "d3-timelines";
import * as d3 from "d3";
import * as moment from 'moment-timezone';
import { useEffect, useRef, useState } from "react";
import start from "../../Images/Start_icon.svg";
import truck from "../../Images/Running_icon.svg";
import lunch from "../../Images/Meal_icon.svg";
import parking from "../../Images/Pickup_icon.svg";
import home from "../../Images/End_icon.svg";
import preceipt from "../../Images/Pickup_icon.svg";
import dlv from "../../Images/driving.PNG";
import Traffic from "../../Images/Traffic.png";
import { Tooltip } from "./Tooltip/Tooltip";

const TimeLines = (props) => {
  // moment.tz.setDefault("UTC");
  // eslint-disable-next-line no-undef
  const ref = useRef(null);
  const [toolTipData, setToolTipData] = useState();
  const [mouseMoveData, setMouseMoveData] = useState({ pageX: 0, pageY: 0 });


  useEffect(() => {
    if (ref.current) {
      var beginingTime = new Date(props.date);
      if (props.data && props.data[0] && props.data[0].action === "start" && props.data[0].starting_time) {
        var l = parseInt(props.data[0].starting_time);
        let hrs = new Date(l).getHours();
        let mins = new Date(l).getMinutes();
        beginingTime.setHours(hrs);
        beginingTime.setMinutes(mins);
      }
      var endTime = new Date(props.date);
      endTime = endTime;// + 86340000;
      if (props.data && props.data.length > 0) {
        props.data.map((time) => {
          if (time.action === "home") {

            var xl = parseInt(time.starting_time);

            let hrs = new Date(xl).getHours();
            let mins = new Date(xl).getMinutes();
            endTime.setHours(hrs);
            endTime.setMinutes(mins);
          }
        })
      }
      beginingTime = beginingTime.getTime();
      var endingTime = beginingTime + 86340000
      let itemHeigth = 20;
      var colorScale = d3
        .scaleOrdinal()
        .range([
          "#d3d3d37a",
          "#d3d3d37a",
          "#d3d3d37a",
          "#d3d3d37a",
          "#d3d3d37a",
        ])
        .domain(["start", "driving", "parking", "lunch", "home", "DLV", "PRECEIPT", "PICK"]);

      var icons = d3
        .scaleOrdinal()
        .domain([
        "start",
        "driving",
        "parking",
        "lunch",
        "home",
        "DLV",
        "PRECEIPT",
        "PICK",
        ])
        .range([start, truck, parking, lunch, home, dlv, preceipt, dlv]);
      var colorScale = d3
        .scaleOrdinal()
        .range(["#3179b1", "#000000", "#ffee00", "#b1c8e6", "#f8d7da", "#99ff66", "skyblue", "#99ff66"])
        .domain(["start", "driving", "parking", "lunch", "home", "DLV", "PRECEIPT", "PICK",]);
      const cursorPoint = (evt) => {
              if (ref.current) {
                const svgPoint = ref.current?.createSVGPoint();
                svgPoint.x = evt.clientX;
                svgPoint.y = evt.clientY;
                return svgPoint.matrixTransform(
                  ref.current?.getScreenCTM()?.inverse()
                );
              }
              return { x: 0, y: 0 };
            };
      d3.select(ref.current).selectAll("*").remove();
      d3.select(ref.current)
        .attr("width", props.width)
        .attr("height", 80)
        .datum([{ times: props.data }])
        .call(
          d3Timelines
            .timelines()
            .colors(colorScale)
            .colorProperty("action")
            .beginning(beginingTime)
            .ending(endingTime)
            .width(props.width)
            .itemHeight(itemHeigth)
            .tickFormat({
              format: d3.timeFormat("%H.%M"),
              tickTime: d3.timeMinute,
              tickInterval: 15,
              tickSize: 6,
              tickValues: null,
            })
        );
      let scaleFactor =
        (1 / (endingTime - beginingTime)) * (props.width - 30 - 30);
      const svg = d3.select(ref.current);
      const node = svg.selectAll("g.view");
      node
        .append("svg:image")
        .data(props.data)
        .join("svg:image")
        .attr("xlink:href", function (d) {
          return icons(d.action);
        })
        .attr("fill", (d) => {
          colorScale(d.action);
        })
        .attr("x", (d) => {
          if (d.display === "circle") {
            let value = (d.starting_time - beginingTime) * scaleFactor;
            return value;
          } else {
            let value = (d.ending_time - beginingTime) * scaleFactor;

            return value;
          }
        })
        .attr("y", (d) => {
          return 30;
        })
        .attr("height", itemHeigth)
        .attr("width", (d) => {
          if (d.display === "circle") {
            return 60;
          } else {
            return 35;
          }
          })
                  .on("mouseover", (event, i) => {
                    setMouseMoveData({ pageX: event.pageX, pageY: event.pageY });
                    setToolTipData(i);
                    console.log("at mouse over",i)
                  })
                  .on("mouseout", () => {
                    setToolTipData(null);
                  });
                node
                  .append("svg:image")
                  .data(
                    props.data.filter((x) => {
                      return x.action === "driving";
                    })
                  )
                  .join("svg:image")
                  .attr("xlink:href", function (d) {
                    return Traffic;
                  })
                  .attr("x", (d) => {
                    let value = (d.starting_time - beginingTime) * scaleFactor;
                    return value + 45;
                  })
                  .attr("y", (d) => {
                    return 30;
                  })
                  .attr("height", itemHeigth)
                  .attr("width", (d) => {
                    const width = ((d.ending_time - d.starting_time) / 2) * scaleFactor;
                    return width * 2 - 45;
        });
    }
  }, [props.data, props.date, props.id, props.width]);

  const styles = {
    margin: 0,
    position: "relative",
    height: 10,
    bottom: 45,
  };

    const ConvtMill2Hm = (i) => {

       console.log("inside convt",i);
        var d = new Date(parseFloat(i));
         console.log("inside convt",d);
        var timess = d.toTimeString();
        var hm = timess.substr(0,5);
          console.log("inside convt",hm);
        return hm;
    }



    const  getdlvStatus = (code) =>   {


 switch (code) {

            case '1': return ("  Scheduled   ");
            case '2': return ("  On the Way  ");
            case '3': return ("  In Progress  ");
            case '4': return ("  Completed  ");
            case '5': return ("  Skipped  ");
            case '6': return ("  Re-Scheduled  ");
            case '7': return ("  Cancelled  ");
            case '8': return ("  To Plan  ");
            case '0': return ("  To-Plan  ");
            default: return ("  To-Plan  ");
        }
    }

   const  getdocinfo = (toolTipData) => {

     return (
                     <span>  <b> {toolTipData.docno} </b> <br/>
                        {toolTipData.code} , {toolTipData.customer}  <br />
                        {toolTipData.city}  - {toolTipData.postal}   <br />
                       <b> {getdlvStatus(toolTipData.status)}</b> <br />  </span>

                         )
    }



  return (
    <>
      <div style={styles}>
        <svg ref={ref} />
      </div>
      {toolTipData && mouseMoveData && (
              <Tooltip pageX={mouseMoveData.pageX} pageY={mouseMoveData.pageY + 30}>
                <div>
                  {toolTipData.action}
                  <br />
                  {toolTipData.action === 'DLV' || toolTipData.action === 'PRECEIPT' || toolTipData.action === 'PICK'  ?
                    getdocinfo(toolTipData) : '' }
                  Timings :{ConvtMill2Hm(toolTipData.starting_time)}   {toolTipData.ending_time === null  ? '' :   " - "+ ConvtMill2Hm(toolTipData.ending_time)}
                </div>
              </Tooltip>
              )}
    </>
  );
};

export default TimeLines;