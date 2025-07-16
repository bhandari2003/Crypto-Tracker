import React, { useState } from 'react'
import DOMPurify from 'dompurify'; 
import "./style.css"
function Coininfo({ heading, description }) {

    const shortdesc = description.slice(0,415) + "<span style='color:var(--grey)'> Read More...</span>";
    const longdesc = description + "<span style='color:var(--grey)'> Read Less</span>";
    const [flag,setFlag] = useState(false);

    return (
         <div className='grey-wrapper'>
            <h2 className='coin-info-heading'>{heading}</h2>
            {description.length > 430 ? <p
            onClick={() => setFlag(!flag)}
                className='coin-info-desc'
                dangerouslySetInnerHTML={{ __html: !flag ? DOMPurify.sanitize(shortdesc) :  DOMPurify.sanitize(longdesc)  }}
            /> : <p dangerouslySetInnerHTML={{ __html:DOMPurify.sanitize(description) }}/>}
        </div>
    )
}

export default Coininfo