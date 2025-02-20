import { useEffect, useRef } from 'react';

// Define the function using TypeScript syntax
export function useDoubleEffectHack_DO_NOT_USE_THIS_IS_TRACKED(effect, cleanup) {
  // Create refs to store values across renders
  const timeoutRef = useRef(null);
  const cleanupRef = useRef(cleanup);

  // Use useEffect to handle the logic
  useEffect(() => {
    // Store the current timeout reference
    const currentTimeout = timeoutRef.current;

    // If a timeout is active, clear it
    if (currentTimeout !== null) {
      clearTimeout(currentTimeout);
      timeoutRef.current = null;
    } else {
      // If no timeout is active, execute the provided effect and store the cleanup function
      cleanupRef.current = effect();
    }

    // Return a cleanup function to clear the timeout and execute the stored cleanup
    return () => {
      function clearAndExecuteCleanup() {
        timeoutRef.current = null;
        const storedCleanup = cleanupRef.current;
        if (storedCleanup) {
          storedCleanup();
        }
      }

      // Set a timeout to ensure the cleanup is executed after the component updates
      timeoutRef.current = setTimeout(clearAndExecuteCleanup, 0);
    };
  }, []);

  // Return the useEffect function
  // eslint-disable-next-line react-compiler/react-compiler
  return useEffect;
}
