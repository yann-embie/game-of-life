import React from "react"
import "../styles/global.css"
import "tailwindcss/tailwind.css"
import { ChakraProvider } from "@chakra-ui/react"
import { ThemeProvider } from "next-themes"

const MyApp = ({ Component, pageProps }) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="system">
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </ThemeProvider>
  )
}

export default MyApp
