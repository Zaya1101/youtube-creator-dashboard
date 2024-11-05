import "./card.css";

type CardProps = {
  title: string;
  children: React.ReactNode;
  className?: string;
  titleAlignment?: "left" | "center" | "right";
}

export default function Card({
  title,
  children,
  className = "",
  titleAlignment = "left",
}: CardProps) {
  return (
    <div className={`card ${className}`}>
      <h2 className={titleAlignment}>{title}</h2>
      {children}
    </div>
  )
}