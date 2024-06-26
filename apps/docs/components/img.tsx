import Image from "next/image";

interface Props {
  src: string;
  alt: string;
}

export const Img = ({ src, alt }: Props) => {
  return <Image src={src} alt={alt} className="rounded-md my-5" />;
};
