import { Zap } from 'lucide-react';
import React from 'react';

export interface MainLogoProps
  extends React.ButtonHTMLAttributes<HTMLDivElement> {
  size?: number;
}

const MainLogo = React.forwardRef<HTMLDivElement, MainLogoProps>(
  ({ className, size = 24 }, ref) => {
    return (
      <div
        className={className}
        style={{
          backgroundColor: 'black',
          borderRadius: '50%',
          padding: '4px',
        }}
      >
        <Zap className='m-auto' size={size} color='hotpink' fill='hotpink' />
      </div>
    );
  }
);

MainLogo.displayName = 'MainLogo';

export default MainLogo;
