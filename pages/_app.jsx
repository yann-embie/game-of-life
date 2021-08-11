import React from "react"
import "../styles/global.css"
import "tailwindcss/tailwind.css"

const MyApp = ({ Component, pageProps }) => {
  return <Component {...pageProps} />
}

export default MyApp
