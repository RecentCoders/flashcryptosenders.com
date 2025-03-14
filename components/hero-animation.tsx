"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import { motion, useAnimation, useInView } from "framer-motion"

export function HeroAnimation() {
  const controls = useAnimation()
  const ref = useRef(null)
  const inView = useInView(ref, { once: false })

  useEffect(() => {
    if (inView) {
      controls.start("visible")
    }
  }, [controls, inView])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  }

  const floatVariants = {
    initial: { y: 0 },
    animate: {
      y: [0, -10, 0],
      transition: {
        duration: 4,
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "reverse",
        ease: "easeInOut",
      },
    },
  }

  const rotateVariants = {
    initial: { rotate: 0 },
    animate: {
      rotate: 360,
      transition: {
        duration: 20,
        repeat: Number.POSITIVE_INFINITY,
        ease: "linear",
      },
    },
  }

  return (
    <div ref={ref} className="relative h-[400px] md:h-[500px] w-full">
      {/* Background elements */}
      <motion.div variants={rotateVariants} initial="initial" animate="animate" className="absolute w-full h-full">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[400px] md:h-[400px] rounded-full border-2 border-dashed border-blue-200 dark:border-blue-800 opacity-60"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] md:w-[300px] md:h-[300px] rounded-full border-2 border-dashed border-blue-300 dark:border-blue-700 opacity-60"></div>
      </motion.div>

      {/* Main animation container */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={controls}
        className="absolute inset-0 flex items-center justify-center"
      >
        {/* Center crypto logo */}
        <motion.div variants={itemVariants} className="absolute z-10">
          <div className="relative w-[120px] h-[120px] md:w-[150px] md:h-[150px] bg-white dark:bg-gray-800 rounded-full shadow-xl flex items-center justify-center">
            <Image
              src="https://cryptologos.cc/logos/bitcoin-btc-logo.png"
              alt="Bitcoin"
              width={80}
              height={80}
              className="w-16 h-16 md:w-20 md:h-20"
            />
          </div>
        </motion.div>

        {/* Floating crypto icons */}
        <motion.div variants={floatVariants} initial="initial" animate="animate" className="absolute top-0 right-[30%]">
          <div className="bg-white dark:bg-gray-800 rounded-full shadow-lg p-3">
            <Image src="https://cryptologos.cc/logos/ethereum-eth-logo.png" alt="Ethereum" width={40} height={40} />
          </div>
        </motion.div>

        <motion.div
          variants={floatVariants}
          initial="initial"
          animate="animate"
          className="absolute bottom-[20%] right-[20%]"
          style={{ animationDelay: "1s" }}
        >
          <div className="bg-white dark:bg-gray-800 rounded-full shadow-lg p-3">
            <Image src="https://cryptologos.cc/logos/tether-usdt-logo.png" alt="USDT" width={40} height={40} />
          </div>
        </motion.div>

        <motion.div
          variants={floatVariants}
          initial="initial"
          animate="animate"
          className="absolute top-[30%] left-[20%]"
          style={{ animationDelay: "1.5s" }}
        >
          <div className="bg-white dark:bg-gray-800 rounded-full shadow-lg p-3">
            <Image src="https://cryptologos.cc/logos/binance-coin-bnb-logo.png" alt="BNB" width={40} height={40} />
          </div>
        </motion.div>

        <motion.div
          variants={floatVariants}
          initial="initial"
          animate="animate"
          className="absolute bottom-[10%] left-[30%]"
          style={{ animationDelay: "0.5s" }}
        >
          <div className="bg-white dark:bg-gray-800 rounded-full shadow-lg p-3">
            <Image src="https://cryptologos.cc/logos/solana-sol-logo.png" alt="Solana" width={40} height={40} />
          </div>
        </motion.div>

        {/* Connection lines */}
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 400 400"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <motion.path
            d="M200 200 L100 100"
            stroke="url(#blue-gradient)"
            strokeWidth="2"
            strokeDasharray="5 5"
            initial={{ pathLength: 0, opacity: 0 }}
            strokeDasharray="5 5"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.5 }}
          />
          <motion.path
            d="M200 200 L300 100"
            stroke="url(#blue-gradient)"
            strokeWidth="2"
            strokeDasharray="5 5"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.7 }}
          />
          <motion.path
            d="M200 200 L300 300"
            stroke="url(#blue-gradient)"
            strokeWidth="2"
            strokeDasharray="5 5"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.9 }}
          />
          <motion.path
            d="M200 200 L100 300"
            stroke="url(#blue-gradient)"
            strokeWidth="2"
            strokeDasharray="5 5"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.5, delay: 1.1 }}
          />
          <defs>
            <linearGradient id="blue-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3B82F6" />
              <stop offset="100%" stopColor="#60A5FA" />
            </linearGradient>
          </defs>
        </svg>

        {/* Animated particles */}
        <div className="absolute inset-0">
          <div className="particle-1"></div>
          <div className="particle-2"></div>
          <div className="particle-3"></div>
          <div className="particle-4"></div>
        </div>
      </motion.div>
    </div>
  )
}

