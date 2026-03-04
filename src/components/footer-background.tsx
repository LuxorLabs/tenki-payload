import Image from 'next/image'

export const FooterBackground = () => {
  return (
    <>
      <div className="fade-overlay-top absolute top-0 left-0 h-30 w-full md:h-10" />
      <div className="fade-overlay-left pointer-events-none absolute top-0 left-0 -z-10 h-full w-6 md:w-32" />
      <div className="fade-overlay-right pointer-events-none absolute top-0 right-0 -z-10 h-full w-6 md:w-32" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-full bg-gradient-to-t from-[#000A15]/90 to-[#000A15]/70" />

      <Image
        src="/images/cube-with-shade.png"
        alt=""
        height={300}
        width={600}
        aria-hidden="true"
        role="presentation"
        loading="lazy"
        className="absolute -right-[60%] -bottom-10 -z-20 opacity-60 lg:-right-10"
      />

      <Image
        src="/images/cube-with-shade.png"
        alt=""
        height={300}
        width={600}
        aria-hidden="true"
        role="presentation"
        loading="lazy"
        className="absolute right-10 -z-20 opacity-60 md:bottom-60 md:-left-50 lg:bottom-30"
      />
    </>
  )
}
