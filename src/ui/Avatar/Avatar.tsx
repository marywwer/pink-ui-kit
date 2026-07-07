import "./Styles.module.scss";

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

  return (
    <div className={`avatar avatar--${size}`} aria-label={name} title={name}>
      {src ? <img src={src} alt={name} /> : <span>{initials}</span>}
      {status && (
        <i
          className={`avatar__status avatar__status--${status}`}
          aria-hidden="true"
        />
      )}
    </div>
  );
}
