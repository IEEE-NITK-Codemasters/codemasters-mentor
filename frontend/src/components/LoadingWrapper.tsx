import { ReactNode } from 'react';
import { Loader2, LucideIcon } from 'lucide-react';

interface LoadingWrapperProps {
  children: ReactNode;
  isLoading: boolean;
  Spinner?: LucideIcon;
  className?: string;
}

const LoadingWrapper = ({ 
  children, 
  isLoading, 
  Spinner = Loader2,
  className = "" 
}: LoadingWrapperProps) => {
  return (
    <div className={`relative ${className}`}>
      {children}
      {isLoading && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <Spinner className="animate-spin text-white" />
        </div>
      )}
    </div>
  );
};

export default LoadingWrapper;