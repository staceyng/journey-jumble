import { ChakraProvider } from '@chakra-ui/react';
import Home from "./pages/home"

function App() {
  return (
    <ChakraProvider>
      <div>
        Journey Jumble
        <Home/>
      </div>
    </ChakraProvider>
  );
}

export default App;
