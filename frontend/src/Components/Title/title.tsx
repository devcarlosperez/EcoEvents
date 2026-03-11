

interface TitleProps {
  text: string
}

export function Title({ text }: TitleProps) {
  return (
    <h3
      className="
        font-poppins
        text-[24px]          /* mobile */
        font-medium
        text-center
        leading-normal
        text-[#1F1F1F)]
        md:text-[40px]       /* desktop */
        mt-19
        mb-12
      " >
      {text}
    </h3>
  )
}