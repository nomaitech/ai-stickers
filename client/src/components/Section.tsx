import { Box } from "@chakra-ui/react";

const Section = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box p={6}>
      {children}
    </Box>
  );
};

export default Section;