'use client';

export interface Props {
  className?: string;
}

export const MacOSControls = ({ className = '' }: Props) => {
  return (
    <div className={`window-controls ${className}`}>
      <div className="control-dot close" role="button" tabIndex={0} aria-label="Close" />
      <div className="control-dot minimize" role="button" tabIndex={0} aria-label="Minimize" />
      <div className="control-dot maximize" role="button" tabIndex={0} aria-label="Maximize" />
    </div>
  );
};
