

interface TitleProps {
  text: string
}

export function Title({ text }: TitleProps) {
  return (
    <h3
      className="
        font-poppins
        sm:text-[20px]          /* mobile */
        font-medium
        text-center
        leading-normal
        text-[#1F1F1F]
        md:text-[28px]       /* desktop */
        pt-19
        pb-12
      " >
      {text}
    </h3>
  )
}
