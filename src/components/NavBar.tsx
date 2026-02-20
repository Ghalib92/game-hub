import { memo } from 'react';
import { HStack } from '@chakra-ui/react';
import ThemeToggle from './ThemeToggle';

const NavBar = () => {
  return (
    <HStack
      as="nav"
      padding="1.5rem"
      backgroundColor="var(--sidebar-bg)"
      color="white"
      justifyContent="space-between"
    >
      <div>Game Hub</div>
      <div>
        <a href="#home">Home</a>
        <a href="#games" style={{ marginLeft: '1rem' }}>Games</a>
        <a href="#about" style={{ marginLeft: '1rem' }}>About</a>
      </div>
      <ThemeToggle />
    </HStack>
  );
};

export default memo(NavBar);