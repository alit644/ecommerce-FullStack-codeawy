import {
  Stack,
  HStack,
  SkeletonText,
  Skeleton,
  Grid,
  Box,
} from "@chakra-ui/react";
interface SkeletonCardProps {
  count?: number;
  noOfLines?: number;
  isAction?: boolean;
  height?: string;
  width?: string;
  textSkeleton?: boolean;
}
const SkeletonCard = ({ count =6 ,noOfLines=2 ,isAction=false ,height="140px",width="200px",textSkeleton=true }: SkeletonCardProps) => {
  return (
    <Box p={3} w={"full"}>
      <Grid templateColumns="repeat(auto-fill, minmax(200px, 1fr))" gap={6}>
       {Array.from({ length: count }).map((_, idx) => (
        <Stack  gap="2" maxW="xs" w={width} key={idx}>
          <Skeleton w="100%" h={height} />
          <HStack width="full">
            {textSkeleton && <SkeletonText noOfLines={noOfLines}/>}
          </HStack>
          {/* Buton */}
          {isAction && <Skeleton w="100%" h="38px"/>}
        </Stack>
       ))}
      </Grid>
    </Box>
    
  );
};

export default SkeletonCard;
