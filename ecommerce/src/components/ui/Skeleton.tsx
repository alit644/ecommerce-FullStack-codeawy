import { Box, Grid, Spinner } from "@chakra-ui/react";
import MainTitle from "../MainTitle";
interface ISkeleton {
  height: string;
  width?: string;
}
const Skeleton = ({ height = "180px", width }: ISkeleton) => {
  return (
    <Box my={6}>
      <MainTitle title="Browse By Category" />
      <Grid
        templateColumns={{
          base: "repeat(2, 1fr)",
          md: "repeat(auto-fill, minmax(200px, 1fr))",
        }}
        gap={6}
        mt={4}
      >
        {[...Array(6)].map((_, idx) => (
          <Box
            key={idx}
            height={height}
            width={width}
            borderRadius="lg"
            bg="gray.100"
            display="flex"
            alignItems="center"
            justifyContent="center"
            boxShadow="sm"
          >
            <Spinner size="lg" color="teal.400" />
          </Box>
        ))}
      </Grid>
    </Box>
  );
};

export default Skeleton;
