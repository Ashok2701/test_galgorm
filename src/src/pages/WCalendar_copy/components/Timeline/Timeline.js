import React from 'react';
import TimelineItem from './TimelineItem';
//import timelineData from './data';
import './Timeline.css';

export default function Timeline  (props){
    return(
        props.timelineData && props.timelineData.length > 0 ?
            <div className="timeline-container">
            {props.timelineData.map((data, idx) => (
                <TimelineItem data={data} key={idx} />
            ))}
        </div> : <div></div>
        
    )
} 

