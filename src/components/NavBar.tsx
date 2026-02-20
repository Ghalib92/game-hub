import { memo } from 'react';
import { HStack, Image } from '@chakra-ui/react';
import logo from '../assets/logo.webp';

const NavBar = () => {
  return (
    <HStack
      as="nav"
      padding="1.5rem"
      backgroundColor="gray.800"
      color="white"
      justifyContent="space-between"
    >
      <Image src={logo} alt="Game Hub Logo" boxSize="40px" />
      <div>Game Hub</div>
      <div>
        <a href="#home">Home</a>
        <a href="#games" style={{ marginLeft: '1rem' }}>Games</a>
        <a href="#about" style={{ marginLeft: '1rem' }}>About</a>
      </div>
    </HStack>
  );
};

export default memo(NavBar);