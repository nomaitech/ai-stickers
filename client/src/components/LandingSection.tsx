import { Box } from "@chakra-ui/react";

const LandingSection = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box p={4}>
      {children}
    </Box>
  );
};

export default LandingSection;