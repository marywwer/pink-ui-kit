import styles from "./Styles.module.scss";

type AvatarProps = {
  name: string;
  src?: string;
  size?: "sm" | "md" | "lg";
  status?: "online" | "offline";
};

export function Avatar({ name, src, size = "md", status }: AvatarProps) {
  const initials = name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");

  const sizeClass = styles[`avatar--${size}`];
  const statusClass = status ? styles[`avatar__status--${status}`] : undefined;

  return (
    <div 
      className={`${styles.avatar} ${sizeClass}`} 
      aria-label={name} 
      title={name}
    >
      {src ? <img src={src} alt={name} /> : <span>{initials}</span>}
      {status && (
        <i
          className={`${styles.avatar__status} ${statusClass}`}
          aria-hidden="true"
        />
      )}
    </div>
  );
}
