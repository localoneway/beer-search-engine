"use client"

import Image, { ImageProps } from "next/image"
import { useEffect, useState } from "react"
import Loader from "./Loader"

interface ImageWithFallbackProps extends ImageProps {
  fallbackSrc: string
}

export default function ImageWithFallback(props: ImageWithFallbackProps) {
  const [error, setError] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(true)
  const [imgSrc, setImgSrc] = useState(props.src)

  useEffect(() => {
    setImgSrc(props.src)
    setError(false)
    setLoading(true)
  }, [props.src])

  // Splitting fallbackSrc from the rest of the props
  const { fallbackSrc, ...rest } = props

  useEffect(() => {
    setError(false)
    setLoading(true)
  }, [props.src])

  // Render image with fallback if error
  return (
    <>
      <Image
        {...rest}
        alt={props.alt || "Image"}
        src={imgSrc}
        onError={(e) => {
          setError(true)
          setLoading(false)
          setImgSrc(fallbackSrc)
          props.onError?.(e)
        }}
        onLoad={(e) => {
          setLoading(false)
          props.onLoad?.(e)
        }}
        quality={error ? 25 : props.quality ?? 75}
        style={{
          opacity: loading ? 0 : 1,
          transition: "opacity 0.3s ease-in-out",
        }}
      />

      {loading && <Loader text="" />}
    </>
  )
}
