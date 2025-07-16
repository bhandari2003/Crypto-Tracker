import React from 'react'
import "./style.css"
import Button from '../../common/Button';
import gradientimg from "../../../assets/gradientimg.png"
import phoneimg from "../../../assets/phoneimg.png"
import { motion } from "framer-motion"

function MainComponent() {
  return (
    <div className='flex-info'>
      <div className='left-comp'>
        <motion.h1 className='track-crypto-heading'
          animate={{ opacity: 1,y:-50}}
          initial={{ opacity: 0,y:0}}
          transition={{ duration: 0.5 }}
        >Track Crypto</motion.h1>
        <motion.h1 className='real-time-heading'
          animate={{ opacity: 1,y:-50}}
          initial={{ opacity: 0,y:0}}
          transition={{ duration: 0.5,delay:0.5 }}
          >Real Time.</motion.h1>
        <motion.p className='info-text'
          animate={{ opacity: 1,y:-50}}
          initial={{ opacity: 0,y:0}}
          transition={{ duration: 0.5,delay:1 }}
          >Track crypto through a public API in real time.Visit the dashboard to do so!</motion.p>

        <motion.div className='btn-flex'
          animate={{ opacity: 1,x:0}}
          initial={{ opacity: 0,x:-50}}
          transition={{ duration: 0.5,delay:1.5 }}
        >
          <Button text={"Dashboard"}></Button>
          <Button text={"share"} outlined={true}></Button>
        </motion.div>
      </div>
      <div className='phone-container'>
        <motion.img src={phoneimg} className='iphone'
        initial ={{y:-8}}
        animate = {{y:8}}
        transition={{
          type:"smooth",
          repeatType:"mirror",
          duration:1,
          repeat:Infinity,
        }}
        ></motion.img>
        <img src={gradientimg} className='gradient'></img>
      </div>
    </div>
  )
}

export default MainComponent