import './style.css'
import ArrowUpwardRoundedIcon from '@mui/icons-material/ArrowUpwardRounded';
import React from 'react'

const BacktoTop = () => {
    let mybutton = document.getElementById("myBtn");

    window.onscroll = function () { scrollFunction() };

    function scrollFunction() {
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            mybutton.style.display = "flex";
        } else {
            mybutton.style.display = "none";
        }
    }

    function topFunction() {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }
    return (
        <div className='back-top' id='myBtn' onClick={() => topFunction()}><ArrowUpwardRoundedIcon
            style={{ color: "var(--blue)" }

            }
        /></div>
    )
}

export default BacktoTop