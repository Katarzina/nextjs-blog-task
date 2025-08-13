import { Hero } from '@/components/Hero/Hero';
import { Spinner } from '@/components/ui/Spinner';

export default function Loading() {
  return (
    <>
      <div className="relative">
        <Hero 
          title=" " // Empty space to maintain height
          backgroundImage="/image.png"
        />
        <div className="absolute inset-0 flex items-center pointer-events-none">
          <div className="max-w-7xl mx-auto w-full">
            <div className="ml-[70px] space-y-3">
              <div className="h-10 bg-gray-300 bg-opacity-10 backdrop-blur-[2px] rounded w-[450px] max-w-full animate-pulse" />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
          <div className="lg:col-span-1">
            <div className="lg:sticky lg:top-8">
              <div className="h-3 bg-gradient-to-r from-gray-300 to-gray-200 rounded w-24 animate-pulse" />
            </div>
          </div>
          
          <div className="lg:col-span-11">
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded w-full animate-pulse" style={{ animationDelay: '100ms' }} />
                <div className="h-4 bg-gray-200 rounded w-full animate-pulse" style={{ animationDelay: '200ms' }} />
                <div className="h-4 bg-gray-200 rounded w-11/12 animate-pulse" style={{ animationDelay: '300ms' }} />
                <div className="h-4 bg-gray-200 rounded w-full animate-pulse" style={{ animationDelay: '400ms' }} />
                <div className="h-4 bg-gray-200 rounded w-10/12 animate-pulse" style={{ animationDelay: '500ms' }} />
                <div className="h-4 bg-gray-200 rounded w-9/12 animate-pulse" style={{ animationDelay: '600ms' }} />
              </div>
              
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded w-full animate-pulse" style={{ animationDelay: '700ms' }} />
                <div className="h-4 bg-gray-200 rounded w-10/12 animate-pulse" style={{ animationDelay: '800ms' }} />
                <div className="h-4 bg-gray-200 rounded w-full animate-pulse" style={{ animationDelay: '900ms' }} />
                <div className="h-4 bg-gray-200 rounded w-11/12 animate-pulse" style={{ animationDelay: '1000ms' }} />
                <div className="h-4 bg-gray-200 rounded w-8/12 animate-pulse" style={{ animationDelay: '1100ms' }} />
              </div>
              <div className="flex justify-center pt-8">
                <Spinner size="lg" className="text-gray-400" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}