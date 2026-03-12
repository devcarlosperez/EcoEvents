

interface TitleProps {
  text: string
}

export function Title({ text }: TitleProps) {
  return (
    <h3
      className="
        font-poppins
        text-[20px]
        font-medium
        text-center
        leading-normal
        text-[#1F1F1F]
        md:text-[28px]
        pt-8
        pb-6
      " >
      {text}
    </h3>
  )
}
